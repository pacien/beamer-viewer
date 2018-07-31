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

class Screen {
  constructor(window, secondary=false, withTimer=false) {
    this.window = window;
    this.secondary = secondary;

    this.canvasId = "screen";
    this.page = null;

    this.timer = withTimer ? new Timer(window) : null;
    this.pageTurnCount = 0;

    this._registerListeners();
    this._hideWelcomeScreen();
  }

  setPage(page) {
    if (this.pageTurnCount++ === 1 && this.timer != null)
      this.timer.start();

    this.page = page;
    this._repaint();
  }

  _registerListeners() {
    const self = this;
    this.window.addEventListener("resize", function() {
      self._repaint();
    });
  }

  _hideWelcomeScreen() {
    const welcomeScreen = this.window.document.getElementById("welcomeScreen");
    welcomeScreen.style.display = "none";
  }

  _getScreenSize(ratio) {
    const windowRatio = this.window.innerWidth / this.window.innerHeight;
    const horizontalScaleFactor = ratio / windowRatio;
    return {
      width: this.window.innerWidth * Math.min(horizontalScaleFactor, 1),
      height: this.window.innerHeight / Math.max(horizontalScaleFactor, 1)
    };
  }

  _getSlideSizeRatio() {
    const viewport = this.page.getViewport(1);
    return (viewport.width / 2) / viewport.height;
  }

  _newCanvas(width, height, xOffset, yOffset) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    context.transform(1, 0, 0, 1, xOffset, yOffset);

    return { canvas: canvas, context: context };
  }

  _showCanvas(canvas) {
    const oldCanvas = this.window.document.getElementById(this.canvasId);
    canvas.id = oldCanvas.id;
    canvas.classList = oldCanvas.classList;
    oldCanvas.replaceWith(canvas);
  }

  _render(canvas, context, scaleFactor) {
    const renderContext = {
      canvasContext: context,
      viewport: this.page.getViewport(scaleFactor)
    };

    const self = this;
    this.page.render(renderContext).then(function() {
      self._showCanvas(canvas);
    });
  }

  _repaint() {
    if (this.page == null) return;

    const screenRatio = this._getSlideSizeRatio();
    const { width, height } = this._getScreenSize(screenRatio);
    const scaleFactor = height / this.page.getViewport(1).height;
    const xOffset = this.secondary ? -width : 0;
    const { canvas, context } = this._newCanvas(width, height, xOffset, 0);
    this._render(canvas, context, scaleFactor);
  }
}
