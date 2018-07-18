/*
 * screen.js
 * Part of Pointless Viewer, a Beamer presentation viewer
 * Copyright 2018 Pacien TRAN-GIRARD
 * License: GNU GPL v3
 */

"use strict";

class Screen {
  constructor(window, secondary=false) {
    this.window = window;
    this.secondary = secondary;
    this.canvas = window.document.getElementById("screen");
    this.context = this.canvas.getContext("2d");
    this.page = null;

    var self = this;
    this.window.addEventListener("resize", function() {
      self._refreshPage();
    });
  }

  setPage(page) {
    this.page = page;
    this._refreshPage();
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

  _paintPage() {
    var renderRatio = this.canvas.height / this.page.getViewport(1).height;
    var renderViewport = this.page.getViewport(renderRatio);
    var renderContext = { canvasContext: this.context, viewport: renderViewport };
    this.page.render(renderContext);
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
