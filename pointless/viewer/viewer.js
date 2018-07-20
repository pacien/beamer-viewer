/*
 * viewer.js
 * Part of Pointless Viewer, a Beamer presentation viewer
 * Copyright 2018 Pacien TRAN-GIRARD
 * License: GNU GPL v3
 */

"use strict";

class Viewer {
  constructor() {
    this.welcomeScreen = document.getElementById("welcomeScreen");
    this.fileInput = document.getElementById("fileInput");

    this.welcomeScreen.style.display = "block";
    this._listenForInput();
  }

  load(source) {
    this.welcomeScreen.style.display = "none";
    pdfjsLib.getDocument(source).then(function(pdf) {
      const presentation = new Presentation(pdf);
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
