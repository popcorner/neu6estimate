// ==UserScript==
// @name		6V热度估测器
// @name:en		neu6estimate
// @namespace	https://github.com/popcorner/neu6estimate
// @description	estimate
// @version		1.0.0
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

function responseParser(text){
    var tj = JSON.parse(text);
    if(tj.error) {
        var retlist = {"1":"\u60a8\u9700\u8981\u5148\u767b\u5f55forum.neubt.com\u624d\u80fd\u4f7f\u7528\u6b64\u5de5\u5177","2":"\u5e16\u5b50\u4e0d\u5b58\u5728","3":"\u60a8\u6ca1\u6709\u672c\u7248\u5757\u7684\u7ba1\u7406\u6743\u9650","4":"\u65e0\u6cd5\u5bf9\u6b64\u5e16\u8fdb\u884c\u4f30\u8ba1\u64cd\u4f5c"};
        alert(retlist[tj.error]);
        if(tj.error==1) {
            return '<a href="http://forum.neubt.com/login" target="_blank">\u53bb\u767b\u5f55</a>';
        } else {
            return '';
        }
    } else {
        return '<span class="xg1">↑</span> <span class="xi1">'+tj.est1+(tj.est1>9?'+':'')+'</span><span class="pipe">|</span><span class="xg1">↓</span> <span class="xi1">'+tj.est2+(tj.est2>9?'+':'')+'</span><span class="pipe">|</span><span class="xg1">√</span> <span class="xi1">'+tj.est3+(tj.est3>9?'+':'')+'</span>';
    }
}
function estquery(){
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://forum.neubt.com/api/estimate/"+tid,
        onload: function(response) {
            jq('#postlist div.ptn').html(responseParser(response.responseText));
            jq('#postlist div.ptn').unbind();
        }
    });
}
if(jq('#postlist .mtw.mbw').length>0 && jq('#modmenu').length>0) {
    jq('#postlist div.ptn').click(function(){
        estquery();
    });
}
