/*
 * timer.js
 * Part of Pointless Viewer, a Beamer presentation viewer
 * Copyright 2018 Pacien TRAN-GIRARD
 * License: GNU GPL v3
 */

"use strict";

class Timer {
  constructor(window) {
    this.display = window.document.getElementById("timer");
    this.startTime = null;
    this._setDisplay(0);
  }

  start() {
    if (this.startTime != null) return;
    this.startTime = Date.now();

    const self = this;
    setInterval(function() {
      self._runTimer();
    }, 1000);
  }

  _runTimer() {
    const timeDelta = Math.floor((Date.now() - this.startTime) / 1000);
    this._setDisplay(timeDelta);
  }

  _setDisplay(seconds) {
    const dateObj = new Date(null);
    dateObj.setSeconds(seconds);
    this.display.textContent = dateObj.toISOString().substr(11, 8);
  }
}
