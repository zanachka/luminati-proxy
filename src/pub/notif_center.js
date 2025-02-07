// LICENSE_CODE ZON ISC
'use strict'; /*jslint react:true, es6:true*/
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Pure_component from '/www/util/pub/pure_component.js';
import classnames from 'classnames';
import semver from 'semver';
import Tooltip from './common/tooltip.js';
import {Modal} from './common/modals.js';
import {T} from './common/i18n.js';
import './css/notif_center.less';

class Notif_center extends Pure_component {
    state = {loaded: false, notifs: []};
    componentDidMount(){
        const _this = this;
        $('#notif_modal').on('hidden.bs.modal', ()=>{
            _this.mark_read_local(); });
        this.setdb_on('head.version', ver=>this.setState({ver},
            this.set_notifs));
        this.setdb_on('head.consts', consts=>this.setState({consts},
            this.set_notifs));
    }
    set_notifs = ()=>{
        if (!this.state.ver||!this.state.consts||!this.state.consts.notifs)
            return;
        const notifs = this.state.consts.notifs.filter(
            n=>!n.version||semver.lt(n.version, this.state.ver));
        this.setState({notifs, loaded: true});
    };
    mark_read_local(){
        const all_read = this.state.notifs.map(n=>{
            if (n.status=='new')
                n.status = 'read';
            return n;
        });
        this.setState({notifs: all_read});
    }
    open(){
        if (this.state.loaded)
            $('#notif_modal').modal('show');
    }
    message_clicked(message){
        if (message.code)
        {
            $('#notif_modal').modal('hide');
            setTimeout(()=>eval(message.code), 500);
        }
    }
    render(){
        const number = this.state.notifs.filter(n=>n.status=='new').length;
        const tip = 'Notification center: you will receive updates on new '
            +'features in Proxy Manager here';
        return <div className="notif">
              <Modal_portal>
                <div className="notif_modal">
                  <Modal id="notif_modal" title="Messages:"
                    no_cancel_btn>
                    <div className="notifs">
                      {!this.state.notifs.length && <No_messages/>}
                      {!!this.state.notifs.length &&
                        <Messages notifs={this.state.notifs}
                          on_click={this.message_clicked.bind(this)}/>
                      }
                    </div>
                  </Modal>
                </div>
              </Modal_portal>
              <T>{t=><Tooltip title={t(tip)} placement="bottom">
                <div onClick={this.open.bind(this)} className="icon">
                  <Circle_icon number={number}/>
                </div>
              </Tooltip>}</T>
            </div>;
    }
}

const Circle_icon = ({number})=>{
    if (!number)
        return null;
    return <div className="circle_wrapper">
          <div className="circle">{number}</div>
        </div>;
};

const No_new_messages = ()=>
    <h4 className="no_messages">You have no new messages.</h4>;

const No_messages = ()=>
    <h4 className="no_messages">You don't have any messages yet.</h4>;

const Messages = ({notifs, on_click})=>{
    const new_messages = notifs.filter(n=>n.status=='new').length;
    return <div>
          {!new_messages && <No_new_messages/>}
          {notifs.map(m=>
            <Message on_click={()=>on_click(m)} clickable={!!m.code}
              key={m.msg_id} {...m}/>
          )}
        </div>;
};

const Message = ({title, message, status, clickable, on_click})=>{
    const classes = classnames('message', {unread: status=='new', clickable});
    if (status=='new')
        title = 'NEW! '+title;
    return <div onClick={on_click} className={classes}>
          <div className="subject">{title}</div>
          <div className="text">{message}</div>
        </div>;
};

class Modal_portal extends Pure_component {
    render(){
        return ReactDOM.createPortal(this.props.children,
            document.getElementById('notif_react_modal'));
    }
}

export default Notif_center;
