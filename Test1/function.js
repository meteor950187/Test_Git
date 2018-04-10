//==================================================================================
//Copyright 2011 airitiBooks for Web (function.js)
// airiti All Rights Reserved.

// VERSION    AUTHOR         DATE         COMMENT
//   1.0      Henry.Kao      2011/07/08   共用函式庫
//==================================================================================

//*****************************************************************************
//*Comment    : 防止使用右鍵，連 Firefox 都不行
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
function clickIE4(){
    if (event.button==2){
        return false;
    }
}

function clickNS4(e){
    if (document.layers||document.getElementById&&!document.all){
        if (e.which==2||e.which==3){
            return false;
        }
    }
}

function OnDeny(){
    if(event.ctrlKey || event.keyCode==78 && event.ctrlKey || event.altKey || event.altKey && event.keyCode==115){
        return false;
    }
}

if (document.layers){
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown=clickNS4;
    document.onkeydown=OnDeny();
}else if (document.all&&!document.getElementById){
    document.onmousedown=clickIE4;
    document.onkeydown=OnDeny();
}

document.oncontextmenu=new Function("return false");

//*****************************************************************************
//*Comment    : 防止使用者選取
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
//IE、Google Chrome、Safari
document.onselectstart = new Function("return false");

//平板電腦
$(window).ready(new Function("document.body.style.WebkitUserSelect='none';"));

//*****************************************************************************
//*Comment    : 防止使用者使用ctrl+c複製
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
function onKeyDown(e) {
    //current pressed key
    var key = window.event ? e.keyCode : e.which;
    var pressedKey = String.fromCharCode(key).toLowerCase();

    if (e.ctrlKey && (pressedKey == "c" || pressedKey == "v")) {
        //disable key press porcessing
        if (window.event) {
            //IE、Google Chrome、Safari
            e.returnValue = false;
        }else {
            //Firefox
            e.preventDefault();
        }
    }
}

//*****************************************************************************
//*Comment    : 依物件ID取得物件函式
//*Parameter  : 物件的client端ID
//*Return     : 該物件object
//*Author     : Henry
//*****************************************************************************
function id(obj) {
    return document.getElementById(obj);
}

//*****************************************************************************
//*Comment    : IE中的indexOf函式
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
if (!Array.indexOf) {
    Array.prototype.indexOf = function(obj){
        for(var i=0; i<this.length; i++){
            if(this[i]==obj){
                return i;
            }
        }
        return -1;
    }
}

//*****************************************************************************
//*Comment    : 讓Firefox兼容innerText
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
if (window.HTMLElement && HTMLElement.prototype.__defineSetter__) {
    HTMLElement.prototype.__defineSetter__("innerText", function(sText) {
        this.textContent = sText;
    });

    HTMLElement.prototype.__defineGetter__("innerText", function () {
        var anyString = "";
        var childS = this.childNodes;
        for (var i=0; i<childS.length; i++) {
            if (childS[i].nodeType == 1) {
                anyString += childS[i].tagName == "BR" ? "\n" : childS[i].innerText;
            }else if (childS[i].nodeType == 3) {
                anyString += childS[i].nodeValue;
            }
        }
        return anyString;
    });
}

//*****************************************************************************
//*Comment    : 讓Firefox兼容outerHTML
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
if (window.HTMLElement && HTMLElement.prototype.__defineSetter__) {
    HTMLElement.prototype.__defineSetter__("outerHTML", function(sHTML) {
        var r = this.ownerDocument.createRange();
        r.setStartBefore(this);
        var df = r.createContextualFragment(sHTML);
        this.parentNode.replaceChild(df, this);
        return sHTML;
    });

    HTMLElement.prototype.__defineGetter__("outerHTML", function() {
        var attr;
        var attrs = this.attributes;
        var str = "<" + this.tagName.toLowerCase();
        for (var i=0; i<attrs.length; i++) {
            attr = attrs[i];
            if (attr.specified) {
                str += " " + attr.name + '="' + attr.value + '"';
            }
        }
        if (!this.canHaveChildren) {
            return str + ">";
        }
        return str + ">" + this.innerHTML + "</" + this.tagName.toLowerCase() + ">";
    });

    HTMLElement.prototype.__defineGetter__("canHaveChildren", function() {
        switch (this.tagName.toLowerCase()) {
            case "area":
            case "base":
            case "basefont":
            case "col":
            case "frame":
            case "hr":
            case "img":
            case "br":
            case "input":
            case "isindex":
            case "link":
            case "meta":
            case "param":
                return false;
        }
        return true;
    });
}

//*****************************************************************************
//*Comment    : 字串的replace函式 (replace字串內所有的符合字)
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
String.prototype.replaceStr = function (pBeenReplacedStr, pReplaceStr) {
    return replaceAllStr(this, pBeenReplacedStr, pReplaceStr);
}

//此function遞迴呼叫自己，直到將所有符合字replace完畢
function replaceAllStr(pStr, pBeenReplacedStr, pReplaceStr) {
    pStr = pStr.replace(pBeenReplacedStr, pReplaceStr);
    if (pStr.indexOf(pBeenReplacedStr) != -1) {
        pStr = replaceAllStr(pStr, pBeenReplacedStr, pReplaceStr);
    }
    return pStr;
}

//*****************************************************************************
//*Comment    : 字串Trim函式
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

//*****************************************************************************
//*Comment    : 字串LTrim函式
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
String.prototype.LTrim = function() {
    return this.replace(/(^\s*)/g, "");
}

//*****************************************************************************
//*Comment    : 字串RTrim函式
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
String.prototype.RTrim = function() {
    return this.replace(/(\s*$)/g, "");
}

//*****************************************************************************
//*Comment    : JavaScript 剖析網址參數 (Request Parameter)
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
var queryString = window.top.location.search.substring(1);

function getParameter ( queryString, parameterName ) {
    // Add "=" to the parameter name (i.e. parameterName=value)
    var parameterName = parameterName + "=";

    if ( queryString.length > 0 ) {
        // Find the beginning of the string
        begin = queryString.indexOf ( parameterName );
        // If the parameter name is not found, skip it, otherwise return the value
        if ( begin != -1 ) {
            // Add the length (integer) to the beginning
            begin += parameterName.length;
            // Multiple parameters are separated by the "&" sign
            end = queryString.indexOf ( "&" , begin );
            if ( end == -1 ) {
                end = queryString.length
            }
            // Return the string
            return unescape ( queryString.substring ( begin, end ) );
        }
        // Return "null" if no parameter has been found
        return "null";
    }
}

//*****************************************************************************
//*Comment    : 取得Cookie值
//*Parameter  : Cookie的名稱
//*Return     : Cookie的值
//*Author     : Henry
//*****************************************************************************
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    var c_list = document.cookie.split("\;");

    for (var i = 0; i < c_list.length; i++) {
      var cook = c_list[i].split("=");
      //這邊一定要加上Trim，否則會有多出空白的現象
      if (cook[0].Trim() == c_name.Trim()) {
        return unescape(cook[1]);
      }
    }
  }

  return null;
}

//*****************************************************************************
//*Comment    : 設定Cookie值
//*Parameter  : Cookie的名稱、Cookie的值、有效天數
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString);
}

//*****************************************************************************
//*Comment    : 超連結轉址
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
function MM_goToURL() {
    var i, args=MM_goToURL.arguments;
    document.MM_returnValue = false;
    for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
}

//*****************************************************************************
//*Comment    : 顯示該物件
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
function Pops(name){
	document.getElementById(name).style.display="block";
}

//*****************************************************************************
//*Comment    : 隱藏該物件
//*Parameter  : 無
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
function Wops(name){
	document.getElementById(name).style.display="none";
}

//*****************************************************************************
//*Comment    : 暫停
//*Parameter  : 暫停時間 (毫秒)
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
function pause(millisecondi) {
    var now = new Date();
    var exitTime = now.getTime() + millisecondi;
    while(true) {
        now = new Date();
        if(now.getTime() > exitTime) return;
    }
}

//*****************************************************************************
//*Comment    : 動態加入js檔案、css檔案
//*Parameter  : 檔案名稱、檔案類型 (js、css)
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
function LoadJsCssFile(filename, filetype) {
    if (filetype == "js") {
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    }else if (filetype == "css") {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }

    if (typeof fileref != "undefined") {
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
}

//*****************************************************************************
//*Comment    : 動態移除js檔案、css檔案
//*Parameter  : 檔案名稱、檔案類型 (js、css)
//*Return     : 無
//*Author     : Henry
//*****************************************************************************
function RemoveJsCssFile(filename, filetype) {
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none";
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none";
    var allsuspects = document.getElementsByTagName(targetelement);

    for (var i = allsuspects.length; i >= 0; i--) {
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1) {
            allsuspects[i].parentNode.removeChild(allsuspects[i]);
        }
    }
}