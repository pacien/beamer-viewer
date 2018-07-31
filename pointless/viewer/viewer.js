/*
 * Pointless Viewer, a web-based Beamer presentation viewer
 * Copyright (C) 2018 Pacien TRAN-GIRARD
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
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
