// LICENSE_CODE ZON ISC
'use strict'; /*jslint node:true, browser:true*/
(function(){
var define;
var is_node_ff = typeof module=='object' && module.exports;
if (!is_node_ff)
    define = self.define;
else
    define = require('./require_node.js').define(module, '../');
define([], function(){
var E = {};

E.timezone = {
    CI: 'Africa/Abidjan',
    GH: 'Africa/Accra',
    ET: 'Africa/Addis_Ababa',
    DZ: 'Africa/Algiers',
    ER: 'Africa/Asmara',
    ML: 'Africa/Bamako',
    CF: 'Africa/Bangui',
    GM: 'Africa/Banjul',
    GW: 'Africa/Bissau',
    MW: 'Africa/Blantyre',
    CG: 'Africa/Brazzaville',
    BI: 'Africa/Bujumbura',
    EG: 'Africa/Cairo',
    MA: 'Africa/Casablanca',
    GN: 'Africa/Conakry',
    SN: 'Africa/Dakar',
    TZ: 'Africa/Dar_es_Salaam',
    DJ: 'Africa/Djibouti',
    CM: 'Africa/Douala',
    EH: 'Africa/El_Aaiun',
    SL: 'Africa/Freetown',
    BW: 'Africa/Gaborone',
    ZW: 'Africa/Harare',
    ZA: 'Africa/Johannesburg',
    SS: 'Africa/Juba',
    UG: 'Africa/Kampala',
    SD: 'Africa/Khartoum',
    RW: 'Africa/Kigali',
    CD: 'Africa/Kinshasa',
    NG: 'Africa/Lagos',
    GA: 'Africa/Libreville',
    TG: 'Africa/Lome',
    AO: 'Africa/Luanda',
    ZM: 'Africa/Lusaka',
    GQ: 'Africa/Malabo',
    MZ: 'Africa/Maputo',
    LS: 'Africa/Maseru',
    SZ: 'Africa/Mbabane',
    SO: 'Africa/Mogadishu',
    LR: 'Africa/Monrovia',
    KE: 'Africa/Nairobi',
    TD: 'Africa/Ndjamena',
    NE: 'Africa/Niamey',
    MR: 'Africa/Nouakchott',
    BF: 'Africa/Ouagadougou',
    BJ: 'Africa/Porto-Novo',
    ST: 'Africa/Sao_Tome',
    LY: 'Africa/Tripoli',
    TN: 'Africa/Tunis',
    NA: 'Africa/Windhoek',
    AI: 'America/Anguilla',
    AG: 'America/Antigua',
    AR: 'America/Argentina/Buenos_Aires',
    AW: 'America/Aruba',
    PY: 'America/Asuncion',
    BB: 'America/Barbados',
    BZ: 'America/Belize',
    CO: 'America/Bogota',
    VE: 'America/Caracas',
    KY: 'America/Cayman',
    CR: 'America/Costa_Rica',
    CW: 'America/Curacao',
    DM: 'America/Dominica',
    SV: 'America/El_Salvador',
    GL: 'America/Godthab',
    TC: 'America/Grand_Turk',
    GD: 'America/Grenada',
    GT: 'America/Guatemala',
    EC: 'America/Guayaquil',
    GY: 'America/Guyana',
    CU: 'America/Havana',
    JM: 'America/Jamaica',
    BO: 'America/La_Paz',
    PE: 'America/Lima',
    NI: 'America/Managua',
    MF: 'America/Marigot',
    MQ: 'America/Martinique',
    MX: 'America/Mexico_City',
    UY: 'America/Montevideo',
    MS: 'America/Montserrat',
    PM: 'America/Miquelon',
    BS: 'America/Nassau',
    BR: 'America/Sao_Paulo',
    PA: 'America/Panama',
    SR: 'America/Paramaribo',
    HT: 'America/Port-au-Prince',
    TT: 'America/Port_of_Spain',
    PR: 'America/Puerto_Rico',
    CL: 'America/Santiago',
    DO: 'America/Santo_Domingo',
    BL: 'America/St_Barthelemy',
    KN: 'America/St_Kitts',
    LC: 'America/St_Lucia',
    VI: 'America/St_Thomas',
    VC: 'America/St_Vincent',
    HN: 'America/Tegucigalpa',
    VG: 'America/Tortola',
    AQ: 'Pacific/Auckland',
    YE: 'Asia/Aden',
    KZ: 'Asia/Almaty',
    JO: 'Asia/Amman',
    TM: 'Asia/Ashgabat',
    IQ: 'Asia/Baghdad',
    BH: 'Asia/Bahrain',
    AZ: 'Asia/Baku',
    TH: 'Asia/Bangkok',
    LB: 'Asia/Beirut',
    KG: 'Asia/Bishkek',
    BN: 'Asia/Brunei',
    IN: 'Asia/Colombo',
    LK: 'Asia/Colombo',
    SY: 'Asia/Damascus',
    BD: 'Asia/Dhaka',
    TL: 'Asia/Dili',
    AE: 'Asia/Dubai',
    TJ: 'Asia/Dushanbe',
    PS: 'Asia/Gaza',
    VN: 'Asia/Ho_Chi_Minh',
    HK: 'Asia/Hong_Kong',
    ID: 'Asia/Jakarta',
    AF: 'Asia/Kabul',
    PK: 'Asia/Karachi',
    NP: 'Asia/Kathmandu',
    MY: 'Asia/Kuala_Lumpur',
    KW: 'Asia/Kuwait',
    MO: 'Asia/Macau',
    PH: 'Asia/Manila',
    OM: 'Asia/Muscat',
    CY: 'Asia/Nicosia',
    KH: 'Asia/Phnom_Penh',
    KP: 'Asia/Pyongyang',
    QA: 'Asia/Qatar',
    MM: 'Asia/Rangoon',
    SA: 'Asia/Riyadh',
    KR: 'Asia/Seoul',
    CN: 'Asia/Shanghai',
    SG: 'Asia/Singapore',
    TW: 'Asia/Taipei',
    UZ: 'Asia/Tashkent',
    GE: 'Asia/Tbilisi',
    IR: 'Asia/Tehran',
    BT: 'Asia/Thimphu',
    JP: 'Asia/Tokyo',
    MN: 'Asia/Ulaanbaatar',
    LA: 'Asia/Vientiane',
    AM: 'Asia/Yerevan',
    BM: 'Atlantic/Bermuda',
    CV: 'Atlantic/Cape_Verde',
    FO: 'Atlantic/Faroe',
    IS: 'Atlantic/Reykjavik',
    GS: 'Atlantic/South_Georgia',
    SH: 'Atlantic/St_Helena',
    FK: 'Atlantic/Stanley',
    AU: 'Australia/Sydney',
    CA: 'America/Toronto',
    NL: 'Europe/Amsterdam',
    AD: 'Europe/Andorra',
    GR: 'Europe/Athens',
    RS: 'Europe/Belgrade',
    DE: 'Europe/Berlin',
    SK: 'Europe/Bratislava',
    BE: 'Europe/Brussels',
    RO: 'Europe/Bucharest',
    HU: 'Europe/Budapest',
    DK: 'Europe/Copenhagen',
    IE: 'Europe/Dublin',
    GI: 'Europe/Gibraltar',
    GG: 'Europe/Guernsey',
    FI: 'Europe/Helsinki',
    IM: 'Europe/Isle_of_Man',
    MD: 'Europe/Istanbul',
    TR: 'Europe/Istanbul',
    JE: 'Europe/Jersey',
    UA: 'Europe/Kiev',
    PT: 'Europe/Lisbon',
    SI: 'Europe/Ljubljana',
    GB: 'Europe/London',
    UK: 'Europe/London',
    LU: 'Europe/Luxembourg',
    ES: 'Europe/Madrid',
    MT: 'Europe/Malta',
    AX: 'Europe/Mariehamn',
    BY: 'Europe/Minsk',
    MC: 'Europe/Monaco',
    RU: 'Europe/Moscow',
    NO: 'Europe/Oslo',
    FR: 'Europe/Paris',
    ME: 'Europe/Podgorica',
    CZ: 'Europe/Prague',
    LV: 'Europe/Riga',
    IT: 'Europe/Rome',
    SM: 'Europe/San_Marino',
    BA: 'Europe/Sarajevo',
    MK: 'Europe/Skopje',
    BG: 'Europe/Sofia',
    SE: 'Europe/Stockholm',
    EE: 'Europe/Tallinn',
    AL: 'Europe/Tirane',
    LI: 'Europe/Vaduz',
    VA: 'Europe/Vatican',
    AT: 'Europe/Vienna',
    LT: 'Europe/Vilnius',
    HR: 'Europe/Zagreb',
    CH: 'Europe/Zurich',
    MG: 'Indian/Antananarivo',
    CX: 'Indian/Christmas',
    CC: 'Indian/Cocos',
    KM: 'Indian/Comoro',
    TF: 'Indian/Kerguelen',
    SC: 'Indian/Mahe',
    MV: 'Indian/Maldives',
    MU: 'Indian/Mauritius',
    YT: 'Indian/Mayotte',
    IO: 'Indian/Chagos',
    IL: 'Israel',
    WS: 'Pacific/Apia',
    NZ: 'Pacific/Auckland',
    FM: 'Pacific/Chuuk',
    VU: 'Pacific/Efate',
    TK: 'Pacific/Fakaofo',
    FJ: 'Pacific/Fiji',
    TV: 'Pacific/Funafuti',
    SB: 'Pacific/Guadalcanal',
    GU: 'Pacific/Guam',
    MH: 'Pacific/Majuro',
    NR: 'Pacific/Nauru',
    NU: 'Pacific/Niue',
    NF: 'Pacific/Norfolk',
    NC: 'Pacific/Noumea',
    AS: 'Pacific/Pago_Pago',
    PW: 'Pacific/Palau',
    PN: 'Pacific/Pitcairn',
    PG: 'Pacific/Port_Moresby',
    CK: 'Pacific/Rarotonga',
    MP: 'Pacific/Saipan',
    PF: 'Pacific/Tahiti',
    KI: 'Pacific/Tarawa',
    TO: 'Pacific/Tongatapu',
    WF: 'Pacific/Wallis',
    PL: 'Europe/Warsaw',
    US: 'America/New_York',
    GF: 'America/Cayenne',
};

E.us_states_timezone = {
    AK: 'America/Anchorage',
    AL: 'America/Chicago',
    AR: 'America/Chicago',
    AZ: 'America/Phoenix',
    CA: 'America/Los_Angeles',
    CO: 'America/Denver',
    CT: 'America/New_York',
    DC: 'America/New_York',
    DE: 'America/New_York',
    FL: 'America/New_York',
    GA: 'America/New_York',
    HI: 'Pacific/Honolulu',
    IA: 'America/Chicago',
    ID: 'America/Denver',
    IL: 'America/Chicago',
    IN: 'America/New_York',
    KS: 'America/Chicago',
    KY: 'America/Chicago',
    LA: 'America/Chicago',
    MA: 'America/New_York',
    MD: 'America/New_York',
    ME: 'America/New_York',
    MI: 'America/Detroit',
    MN: 'America/Chicago',
    MO: 'America/Chicago',
    MS: 'America/Chicago',
    MT: 'America/Denver',
    NC: 'America/New_York',
    ND: 'America/Chicago',
    NE: 'America/Chicago',
    NH: 'America/New_York',
    NJ: 'America/New_York',
    NM: 'America/Denver',
    NV: 'America/Los_Angeles',
    NY: 'America/New_York',
    OH: 'America/New_York',
    OK: 'America/Chicago',
    OR: 'America/Los_Angeles',
    PA: 'America/New_York',
    RI: 'America/New_York',
    SC: 'America/New_York',
    SD: 'America/Chicago',
    TN: 'America/Chicago',
    TX: 'America/Chicago',
    UT: 'America/Denver',
    VA: 'America/New_York',
    VT: 'America/New_York',
    WA: 'America/Los_Angeles',
    WI: 'America/Chicago',
    WV: 'America/New_York',
    WY: 'America/Denver',
};

E.code2timezone = function(c){
    c = c.toUpperCase();
    return E.timezone[c] || c;
};

E.state_code2timezone = function(ts_country, state){
    if (ts_country!='US')
        return;
    state = state.toUpperCase();
    return E.us_states_timezone[state];
};

return E; }); }());
