/*
 * appcache.js
 * Part of Pointless Viewer, a Beamer presentation viewer
 * Copyright 2018 Pacien TRAN-GIRARD
 * License: GNU GPL v3
 */

"use strict";

class AppCache {
  constructor() {
    this.cacheName = "cache";
    this.filesToCache = [
      ".",
      "appcache.js",
      "favicon.ico",

      "pointless/pdfjs/pdf.js",
      "pointless/pdfjs/pdf.worker.js",

      "pointless/viewer/viewer.css",
      "pointless/viewer/init.js",
      "pointless/viewer/viewer.js",
      "pointless/viewer/presentation.js",
      "pointless/viewer/stage.js",
      "pointless/viewer/screen.js",
      "pointless/viewer/timer.js"
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
