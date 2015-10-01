// Copyright (c) 2015, the Name It Later brproxy authors (see the AUTHORS file).
// All rights reserved. Use of this source code is governed by a BSD-style license
// that can be found in the LICENSE file.

var brproxy = (function () {

    var regex = new RegExp('http[s]{0,1}://[a-zA-Z0-9.]+(:[0-9]+){0,1}');

    // XMLHttpRequest replacement
    function _XMLHttpRequest(){
        this.nativeXHR = new nativeXMLHttpRequest();
    }

    _XMLHttpRequest.prototype.abort    = function() {
        this.nativeXHR.abort();
    };

    _XMLHttpRequest.prototype.getAllResponseHeaders  = function () {
        return this.nativeXHR.getAllResponseHeaders();
    };

    _XMLHttpRequest.prototype.getResponseHeader  = function (header) {
        return this.nativeXHR.getResponseHeader(header);
    };

    _XMLHttpRequest.prototype.open = function(method, url) {
        var target = url;
        if(my.remote.length > 0){
            target = url.replace(regex,my.remote);
        }
        this.nativeXHR.open(method,  target);
    };

    _XMLHttpRequest.prototype.overrideMimeType = function(mime) {
        this.nativeXHR.overrideMimeType(mime);
    };

    _XMLHttpRequest.prototype.send = function(vData) {
        this.nativeXHR.send(vData);
    };

    _XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
        this.nativeXHR.setRequestHeader(header, value);
    };

    Object.defineProperty(_XMLHttpRequest.prototype,"onreadystatechange", {
        get: function() {return this.nativeXHR.onreadystatechange}     ,
        set: function(value) {this.nativeXHR.onreadystatechange = value}
    });

    _XMLHttpRequest.prototype.readyState   = function() {
        return this.nativeXHR.readyState;
    };

    _XMLHttpRequest.prototype.response = function() {
        return this.nativeXHR.response;
    };


    _XMLHttpRequest.prototype.responseText = function() {
        return this.nativeXHR.responseText;
    };

    _XMLHttpRequest.prototype.responseType = function() {
        return this.nativeXHR.responseType;
    };

    _XMLHttpRequest.prototype.responseXML  = function() {
        return this.nativeXHR.responseXML;
    };

    _XMLHttpRequest.prototype.status   = function() {
        return this.nativeXHR.status;
    };

    _XMLHttpRequest.prototype.statusText   = function() {
        return this.nativeXHR.statusText;
    };

    _XMLHttpRequest.prototype.timeout  = function() {
        return this.nativeXHR.timeout;
    };

    Object.defineProperty(_XMLHttpRequest.prototype,"ontimeout", {
        get: function() {return this.nativeXHR.ontimeout}     ,
        set: function(value) {this.nativeXHR.ontimeout= value}
    });

    _XMLHttpRequest.prototype.upload   = function() {
        return this.nativeXHR.upload;
    };

    Object.defineProperty(_XMLHttpRequest.prototype,"withCredentials", {
        get: function() {return this.nativeXHR.withCredentials}     ,
        set: function(value) {this.nativeXHR.withCredentials = value}
    });

    Object.defineProperty(_XMLHttpRequest.prototype,"onabort", {
        get: function() {return this.nativeXHR.onabort}     ,
        set: function(value) {this.nativeXHR.onabort = value}
    });

    Object.defineProperty(_XMLHttpRequest.prototype,"onerror", {
        get: function() {return this.nativeXHR.onerror}     ,
        set: function(value) {this.nativeXHR.onerror = value}
    });

    Object.defineProperty(_XMLHttpRequest.prototype,"onloadstart", {
        get: function() {return this.nativeXHR.onloadstart}     ,
        set: function(value) {this.nativeXHR.onloadstart = value}
    });

    Object.defineProperty(_XMLHttpRequest.prototype,"onprogress", {
        get: function() {return this.nativeXHR.onprogress}     ,
        set: function(value) {this.nativeXHR.onprogress = value}
    });

    Object.defineProperty(_XMLHttpRequest.prototype,"onloadend", {
        get: function() {return this.nativeXHR.onloadend}     ,
        set: function(value) {this.nativeXHR.onloadend = value}
    });

    _XMLHttpRequest.prototype.addEventListener = function(e,h,c) {
        return this.nativeXHR.addEventListener(e,h,c);
    };

    _XMLHttpRequest.prototype.removeEventListener  = function(e,h) {
        return this.nativeXHR.removeEventListener(e,h);
    };

    _XMLHttpRequest.prototype.dispatchEvent = function(e) {
        return this.nativeXHR.dispatchEvent();
    };

    var nativeXMLHttpRequest = window.XMLHttpRequest;

    var my = {};
    my.remote = "";
    my.start = function (){
        window.XMLHttpRequest = function() {
            return new _XMLHttpRequest();
        };
    };
    my.stop = function() {
        window.XMLHttpRequest = nativeXMLHttpRequest;
    };

    return my;

}());
