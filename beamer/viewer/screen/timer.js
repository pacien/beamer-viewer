/*
 * Beamer Viewer, a web-based PDF presentation viewer
 * Copyright (C) 2021 Pacien TRAN-GIRARD
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
    this.display = window.document.getElementById("timer-value");
    this.carryoverMs = 0; // saved on pause
    this.runningStartTs = null; // null if paused

    window.document.getElementById("timer-pause").addEventListener("click", event => {
      event.stopPropagation();
      this._startStop();
    });

    window.document.getElementById("timer-reset").addEventListener("click", event => {
      event.stopPropagation();
      this._reset();
    });

    setInterval(() => this._refreshTimer(), 1000);

    this._toggleDisplay(false);
    this._setDisplay(0);
    window.document.getElementById("timer").classList.remove("hidden");
  }

  start() {
    if (this.runningStartTs != null) return;
    this.runningStartTs = Date.now();
    this._toggleDisplay(true);
  }

  _stop() {
    if (this.runningStartTs == null) return;
    this.carryoverMs += Date.now() - this.runningStartTs;
    this.runningStartTs = null;
    this._toggleDisplay(false);
 }

  _startStop() {
    if (this.runningStartTs == null)
      this.start();
    else
      this._stop();

    this._refreshTimer();
  }

  _reset() {
    this.carryoverMs = 0;
    if (this.runningStartTs != null) this.runningStartTs = Date.now();
    this._setDisplay(0);
  }

  _refreshTimer() {
    if (this.runningStartTs == null) return;
    const timeDeltaMs = Date.now() - this.runningStartTs + this.carryoverMs;
    this._setDisplay(Math.floor(timeDeltaMs / 1000));
  }

  _setDisplay(seconds) {
    const dateObj = new Date(null);
    dateObj.setSeconds(seconds);
    this.display.textContent = dateObj.toISOString().substr(11, 8);
  }

  _toggleDisplay(active) {
    if (active)
      this.display.classList.remove("timer-paused");
    else
      this.display.classList.add("timer-paused");
  }
}
