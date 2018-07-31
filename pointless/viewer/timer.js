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
