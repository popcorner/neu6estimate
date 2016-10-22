// ==UserScript==
// @name		6V热度估测器
// @name:en		neu6estimate
// @namespace	https://github.com/popcorner/neu6estimate
// @description	estimate
// @version		0.1.1
// @author		popcorner
// @grant		GM_xmlhttpRequest
// @include		http://bt.neu6.edu.cn/thread*
// @include		http://bt.neu6.edu.cn/forum.php?mod=viewthread*
// @require		http://bt.neu6.edu.cn/static/js/mobile/jquery-1.8.3.min.js
// @icon		http://bt.neu6.edu.cn/favicon.ico
// @updateURL	https://github.com/popcorner/neu6estimate/raw/master/neu6estimate.user.js
// @downloadURL	https://github.com/popcorner/neu6estimate/raw/master/neu6estimate.user.js
// ==/UserScript==

var jq = jQuery.noConflict();

function estquery(){
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://forum.neubt.com/api/estimate/"+tid,
        onload: function(response) {
            jq('#postlist div.ptn').html(response.responseText);
            jq('#postlist div.ptn').unbind();
        }
    });
}
if(jq('#postlist .mtw.mbw').length>0) {
    jq('#postlist div.ptn').click(function(){
        estquery();
    });
}
