/*
 * stage.js
 * Part of Pointless Viewer, a Beamer presentation viewer
 * Copyright 2018 Pacien TRAN-GIRARD
 * License: GNU GPL v3
 */

"use strict";

class Stage {
  constructor(onReady, onNext, onPrevious) {
    this.onNext = onNext;
    this.onPrevious = onPrevious;
    this.projector = window.open(window.location.href);
    this.audienceScreen = null;
    this.presenterScreen = null;

    var self = this;
    this.projector.addEventListener("load", function() {
      self.audienceScreen = new Screen(self.projector, false, false);
      self.presenterScreen = new Screen(window, true, true);
      onReady();
    });

    this._registerEventHandler(window);
    this._registerEventHandler(this.projector);
  }

  setPage(page) {
    this.audienceScreen.setPage(page);
    this.presenterScreen.setPage(page);
  }

  _registerEventHandler(window) {
    var self = this;
    window.addEventListener("keydown", function(event) {
      self._onCommand(event);
    })
  }

  _onCommand(keyboardEvent) {
    switch (keyboardEvent.key) {
      case "Enter":
      case " ":
      case "ArrowRight":
      case "n":
        return this.onNext();

      case "ArrowLeft":
      case "p":
        return this.onPrevious();
    }
  }
}
