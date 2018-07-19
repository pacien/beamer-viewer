/*
 * viewer.js
 * Part of Pointless Viewer, a Beamer presentation viewer
 * Copyright 2018 Pacien TRAN-GIRARD
 * License: GNU GPL v3
 */

"use strict";

class Viewer {
  constructor() {
    this.fileInput = document.getElementById("fileInput");
    this.fileInput.style.display = "block";
    this._listenForInput();
  }

  load(source) {
    this.fileInput.style.display = "none";
    pdfjsLib.getDocument(source).then(function(pdf) {
      var presentation = new Presentation(pdf);
    });
  }

  _readFile(file) {
    var fileReader = new FileReader();
    var self = this;
    fileReader.onload = function() {
      var byteArray = new Uint8Array(this.result);
      self.load(byteArray);
    }
  
    fileReader.readAsArrayBuffer(file);
  }

  _listenForInput() {
    var self = this;
    fileInput.addEventListener("change", function(event) {
      self._readFile(event.target.files[0]);
    });

    document.body.addEventListener("drop", function(event) {
      event.preventDefault();
      event.stopPropagation();
      self._readFile(event.dataTransfer.files[0]);
    });

    document.body.addEventListener("dragover", function(event) {
      event.preventDefault();
      event.stopPropagation();
    });
  }
}
