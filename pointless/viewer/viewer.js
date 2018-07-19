/*
 * viewer.js
 * Part of Pointless Viewer, a Beamer presentation viewer
 * Copyright 2018 Pacien TRAN-GIRARD
 * License: GNU GPL v3
 */

"use strict";

var params = function() {
  var queryDict = {};
  location.search.substr(1).split("&").forEach(function(item) {
    var pair = item.split("=");
    queryDict[pair[0]] = pair[1];
  });
  return queryDict;
}();

function isController() {
  return window.opener == null || window.opener.location.href != window.location.href;
}

class Viewer {
  constructor() {
    this.fileInput = document.getElementById("fileInput");
    this.fileInput.style.display = "block";

    var self = this;
    fileInput.addEventListener("change", function(event) {
      var callback = function(file) { self._load(file) };
      self._readFile(event.target.files[0], callback);
    });

    if ("file" in params)
      this._load(params["file"]);
  }

  _load(source) {
    this.fileInput.style.display = "none";
    pdfjsLib.getDocument(source).then(function(pdf) {
      var presentation = new Presentation(pdf);
    });
  }

  _readFile(file, callback) {
    var fileReader = new FileReader();
    fileReader.onload = function() {
      var byteArray = new Uint8Array(this.result);
      callback(byteArray);
    }
  
    fileReader.readAsArrayBuffer(file);
  }
}

if (isController()) new Viewer();
