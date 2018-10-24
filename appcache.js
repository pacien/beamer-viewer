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
      "sample/demo.pdf",

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

    self.addEventListener("install", event => event.waitUntil(this.onInstall()));
    self.addEventListener("fetch", event => event.respondWith(this.onFetch(event.request)));
  }

  onInstall() {
    return caches.open(this.cacheName)
                 .then(cache => cache.addAll(this.filesToCache));
  }

  onFetch(request) {
    return caches.open(this.cacheName)
                 .then(cache => this._serve(cache, request));
  }

  _serve(cache, request) {
    return cache.match(request).then(cachedResponse => {
      const update = this._fetchUpdate(cache, request);
      return cachedResponse || update;
    });
  }

  _fetchUpdate(cache, request) {
    return fetch(request).then(networkResponse => {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    });
  }
}

const appCache = new AppCache();
