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

class ActionEventHandler {
  constructor(onNext, onPrevious) {
    this.onNext = onNext;
    this.onPrevious = onPrevious;
  }
}

class KeyboardEventHandler extends ActionEventHandler {
  register(window) {
    const self = this;
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

class MouseClickEventHandler extends ActionEventHandler {
  register(window) {
    const self = this;
    window.addEventListener("click", function(event) {
      self._onCommand(event);
    })
  }

  _onCommand(mouseEvent) {
    this.onNext();
  }
}

class TouchSwipeEventHandler extends ActionEventHandler {
  constructor(onNext, onPrevious) {
    super(onNext, onPrevious);
    this.touchStartEvent = null;
    this.touchMoveEvent = null;
  }

  register(window) {
    const self = this;

    window.addEventListener("touchstart", function(event) {
      event.preventDefault();
      self._onTouchStart(event);
    });

    window.addEventListener("touchmove", function(event) {
      event.preventDefault();
      self._onTouchMove(event);
    });

    window.addEventListener("touchend", function(event) {
      event.preventDefault();
      self._onTouchEnd();
    });

    window.addEventListener("touchcancel", function(event) {
      event.preventDefault();
    });
  }

  _onTouchStart(touchEvent) {
    this.touchStartEvent = touchEvent;
  }

  _onTouchMove(touchEvent) {
    this.touchMoveEvent = touchEvent;
  }

  _onTouchEnd() {
    if (this.touchStartEvent == null || this.touchMoveEvent == null) return;

    const touchDown = this._xCoordinate(this.touchStartEvent);
    const touchUp = this._xCoordinate(this.touchMoveEvent);
    const xDelta = touchDown - touchUp;

    if (xDelta > 0)
      this.onNext();
    else if (xDelta < 0)
      this.onPrevious();
    
    this.touchStartEvent = null;
    this.touchMoveEvent = null;
  }

  _xCoordinate(touchEvent) {
    return touchEvent.touches[0].clientX; // first finger
  }
}
