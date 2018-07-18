/*
 * screen.js
 * Part of Pointless Viewer, a Beamer presentation viewer
 * Copyright 2018 Pacien TRAN-GIRARD
 * License: GNU GPL v3
 */

"use strict";

class Screen {
  constructor(window, secondary=false, withTimer=false) {
    this.window = window;
    this.secondary = secondary;
    this.canvas = window.document.getElementById("screen");
    this.context = this.canvas.getContext("2d");
    this.page = null;

    var self = this;
    this.window.addEventListener("resize", function() {
      self._refreshPage();
    });

    this.timer = withTimer ? new Timer(window) : null;
    this.pageTurnCount = 0;
  }

  setPage(page) {
    if (this.pageTurnCount === 1 && this.timer != null)
      this.timer.start();

    this.page = page;
    this._refreshPage();
    this.pageTurnCount++;
  }

  _resizeScreen(ratio) {
    var windowRatio = this.window.innerWidth / this.window.innerHeight;
    var scaleFactor = ratio / windowRatio;
    this.canvas.width = this.window.innerWidth * Math.min(scaleFactor, 1);
    this.canvas.height = this.window.innerHeight / Math.max(scaleFactor, 1);
  }

  _setOffset() {
    var xOffset = this.secondary ? -this.canvas.width : 0;
    this.context.transform(1, 0, 0, 1, xOffset, 0);
  }

  _makeWorkCanvas(width, height) {
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    return canvas;
  }

  _transferCanvas(source) {
    this.context.drawImage(source, 0, 0);
  }

  _paintPage() {
    var renderRatio = this.canvas.height / this.page.getViewport(1).height;
    var renderViewport = this.page.getViewport(renderRatio);
    var workCanvas = this._makeWorkCanvas(renderViewport.width, renderViewport.height);
    var workContext = workCanvas.getContext("2d");
    var renderContext = { canvasContext: workContext, viewport: renderViewport };

    var self = this;
    this.page.render(renderContext).then(function() {
      self._transferCanvas(workCanvas);
    });
  }

  _refreshPage() {
    if (this.page == null) return;
    var viewport = this.page.getViewport(1);
    var ratio = (viewport.width / 2) / viewport.height;
    this._resizeScreen(ratio);
    this._setOffset();
    this._paintPage();
  }
}
