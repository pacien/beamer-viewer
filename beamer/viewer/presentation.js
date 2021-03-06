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
