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
    this._listenForInput();
  }

  load(source) {
    pdfjsLib.getDocument(source).then(function(pdf) {
      const presentation = new Presentation(pdf);
    }).catch(function(error) {
      console.error(error);
      window.alert("Error while loading presentation:\n\n" + error.message);
      window.location.href = window.location.pathname; // reload without "?file=..."
    });
  }

  _readFile(file) {
    const fileReader = new FileReader();
    const self = this;
    fileReader.onload = function() {
      const byteArray = new Uint8Array(this.result);
      self.load(byteArray);
    }
  
    fileReader.readAsArrayBuffer(file);
  }

  _listenForInput() {
    const self = this;
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
