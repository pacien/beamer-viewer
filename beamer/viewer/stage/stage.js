/*
 * Beamer Viewer, a web-based PDF presentation viewer
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

class Stage {
  constructor(onReady, onNext, onPrevious) {
    this.audienceScreen = null;
    this.presenterScreen = null;

    this.projector = window.open(window.location.href, "_blank", "toolbar=0,location=0,menubar=0");
    if (this.projector == null)
      alert("Please allow pop-ups, then refresh this page.");

    const self = this;
    this.projector.addEventListener("load", function() {
      self.audienceScreen = new Screen(self.projector, false, false);
      self.presenterScreen = new Screen(window, true, true);
      self._watchDetach();
      onReady();
    });

    this.eventHandlers = [
      new KeyboardEventHandler(onNext, onPrevious),
      new MouseClickEventHandler(onNext, onPrevious),
      new TouchSwipeEventHandler(onNext, onPrevious)
    ];

    this._registerEventHandler(window);
    this._registerEventHandler(this.projector);
  }

  setPage(page) {
    this.audienceScreen.setPage(page);
    this.presenterScreen.setPage(page);
  }

  _registerEventHandler(window) {
    if (window == null) return;

    this.eventHandlers.forEach(function(eventHandler) {
      eventHandler.register(window);
    });
  }

  _watchDetach() {
    const self = this;
    window.addEventListener("beforeunload", function() {
      self._setMessage(self.projector, "Controller detached");
    });

    this.projector.addEventListener("beforeunload", function() {
      self._setMessage(window, "Viewer detached");
    });
  }

  _setMessage(window, message) {
    const messageBar = window.document.getElementById("message");
    messageBar.textContent = message;
  }
}
