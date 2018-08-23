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

// script put at the root of the app so it can intercept all requests made from the current directory.
class AppCache {
  constructor() {
    this.cacheName = "cache";
    this.filesToCache = [
      ".",
      "popup.html",
      "appcache.js",
      "favicon.ico",

      "pointless/pdfjs/pdf.js",
      "pointless/pdfjs/pdf.worker.js",

      "pointless/viewer/viewer.css",
      "pointless/viewer/init.js",
      "pointless/viewer/viewer.js",
      "pointless/viewer/presentation.js",
      "pointless/viewer/stage/stage.js",
      "pointless/viewer/stage/actions.js",
      "pointless/viewer/screen/screen.js",
      "pointless/viewer/screen/timer.js"
    ];

    const appCache = this;
    self.addEventListener("install", function(event) {
      event.waitUntil(appCache._onInstall());
    });

    self.addEventListener("fetch", function(event) {
      event.respondWith(appCache._onFetch(event.request));
    });
  }

  _onInstall() {
    const self = this;
    return caches.open(this.cacheName).then(function(cache) {
      return cache.addAll(self.filesToCache);
    });
  }

  _onFetch(request) {
    return navigator.onLine ? this._fetchUpdate(request) : caches.match(request);
  }

  _fetchUpdate(request) {
    return caches.open(this.cacheName).then(function(cache) {
      return fetch(request).then(function(response) {
        cache.put(request, response.clone());
        return response;
      });
    });
  }
}

const appCache = new AppCache();
