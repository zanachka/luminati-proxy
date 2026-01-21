// LICENSE_CODE ZON ISC
'use strict'; /*jslint react:true, es6:true*/
import React from 'react';
import classnames from 'classnames';
import {EditorView, hoverTooltip} from '@codemirror/view';
import {linter, lintGutter} from '@codemirror/lint';
import Pure_component from '/www/util/pub/pure_component.js';
import filesaver from 'file-saver';
import $ from 'jquery';
import etask from '../../util/etask.js';
import {Nav, Link_icon} from './common.js';
import {main as Api} from './api.js';
import {Modal} from './common/modals.js';
import {Json_editor, linters, config_tooltip} from './common/editor/';
import './css/config.less';

class Config extends Pure_component {
    state = {
        editable: false,
        changed: false,
        persisted_config: '',
        editor_config: '',
        warning: undefined,
    };
    title = 'Manual configuration';
    subtitle = 'Edit your port configuration and export as a JSON file.';
    componentDidMount(){
        const _this = this;
        this.etask(function*(){
            const config = yield Api.json.get('config');
            _this.setState({
                persisted_config: config.config,
                editor_config: config.config,
                changed: false,
                warning: undefined,
            });
        });
        this.setdb_on('head.settings', settings=>this.setState({settings}));
    }
    on_editor_change = value=>{
        this.setState(prev=>({
            editor_config: value,
            changed: prev.persisted_config !== value,
        }));
    };
    set_editable = editable=>this.setState({editable});
    check = ()=>{
        if (!this.state.changed)
            return;
        try {
            JSON.parse(this.state.editor_config);
            $('#conf_confirmation_modal').modal('show');
        } catch(e){
            this.setState({warning: e.message});
        }
    };
    check_reload = ()=>{
        const _this = this;
        const retry = ()=>{ setTimeout(_this.check_reload, 500); };
        return etask(function*(){
            this.on('uncaught', retry);
            yield Api.json.get('proxies_running');
            window.location.reload();
        });
    };
    save = ()=>{
        this.set_editable(false);
        const _this = this;
        this.etask(function*(){
            yield Api.json.post('config', {config: _this.state.editor_config});
            $('#restarting').modal({backdrop: 'static', keyboard: false});
            yield etask.sleep(3000);
            yield _this.check_reload();
        });
    };
    download = ()=>{
        const blob = new Blob([this.state.editor_config],
            {type: 'text/plain;charset=utf-8'});
        filesaver.saveAs(blob, `${this.state.settings.customer}_config.json`);
    };
    click_edit = ()=>this.set_editable(true);
    click_cancel = ()=>{
        this.setState(prev=>({
            warning: undefined,
            editor_config: prev.persisted_config,
            changed: false,
        }));
        this.set_editable(false);
    };
    render(){
        const panel_class = classnames('panel code_panel flex_auto vbox', {
            editable: this.state.editable,
        });
        const read_only = this.state.settings && this.state.settings.read_only;
        const {editable, editor_config} = this.state;

        return <div className="config vbox">
          <Nav title={this.title} subtitle={this.subtitle}
            warning={this.state.warning}/>
          <div className={panel_class}>
            <div className="panel_body flex_auto vbox">
              <Nav_buttons editable={editable}
                read_only={read_only}
                changed={this.state.changed}
                click_edit={this.click_edit}
                click_save={this.check}
                click_download={this.download}
                click_cancel={this.click_cancel}/>
              <div className="editor_container">
                <Json_editor
                  value={editor_config}
                  editable={editable}
                  extensions={[
                    EditorView.lineWrapping,
                    hoverTooltip(config_tooltip),
                    lintGutter(),
                    linter(linters.config_linter, {delay: 300}),
                  ]}
                  on_change={this.on_editor_change}
                />
              </div>
            </div>
          </div>
          <Conf_modal click_ok={this.save}/>
        </div>;
    }
}

const Nav_buttons = props=>{
    const save_class = classnames({disabled: !props.changed});
    if (props.editable)
    {
        return <div className="nav_buttons">
          <Link_icon tooltip="Cancel" on_click={props.click_cancel}
            id="times"/>
          <Link_icon tooltip="Save" on_click={props.click_save}
            classes={save_class} id="check"/>
        </div>;
    }
    const tooltip = props.read_only ? 'It is not possible to edit the config '
    +'in read only mode' : 'Edit config';
    return <div className="nav_buttons">
      <Link_icon tooltip={tooltip} on_click={props.click_edit}
        id="pencil" disabled={props.read_only}/>
      <Link_icon tooltip="Download as JSON"
        on_click={props.click_download} id="download"/>
    </div>;
};

const Conf_modal = props=>{
    const content = `Editing the configuration manually may result in your
        proxies working incorrectly. Do you still want to modify the
        configuration file?`;
    return <Modal title="Are you sure?" id="conf_confirmation_modal"
      click_ok={props.click_ok}>
      <p>{content}</p>
    </Modal>;
};

export default Config;
