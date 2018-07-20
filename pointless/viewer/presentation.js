/*
 * presentation.js
 * Part of Pointless Viewer, a Beamer presentation viewer
 * Copyright 2018 Pacien TRAN-GIRARD
 * License: GNU GPL v3
 */

"use strict";

class Presentation {
  constructor(pdf) {
    this.pdf = pdf;
    this.currentPageIndex = 1;
    this.stage = this._setupStage();
  }

  _setupStage() {
    const self = this;
    const onStageReadyCallback = function() { self._onStageReady(); };
    const onNextCallback = function() { self._onNext(); };
    const onPreviousCallback = function() { self._onPrevious(); };
    return new Stage(onStageReadyCallback, onNextCallback, onPreviousCallback);
  }

  _onStageReady() {
    this._setPage(this.currentPageIndex);
  }

  _onNext() {
    if (this.currentPageIndex === this.pdf.numPages) return;
    this._setPage(this.currentPageIndex + 1);
  }

  _onPrevious() {
    if (this.currentPageIndex === 1) return;
    this._setPage(this.currentPageIndex - 1);
  }

  _setPage(pageIndex) {
    const self = this;
    this.currentPageIndex = pageIndex;
    this.pdf.getPage(this.currentPageIndex).then(function(page) {
      self.stage.setPage(page);
    })
  }
}
