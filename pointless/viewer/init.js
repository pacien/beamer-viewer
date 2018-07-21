/*
 * init.js
 * Part of Pointless Viewer, a Beamer presentation viewer
 * Copyright 2018 Pacien TRAN-GIRARD
 * License: GNU GPL v3
 */

"use strict";

const params = function() {
  const queryDict = {};
  location.search.substr(1).split("&").forEach(function(item) {
    const pair = item.split("=");
    queryDict[pair[0]] = pair[1];
  });
  return queryDict;
}();

function isController() {
  return window.opener == null || window.opener.location.href != window.location.href;
}

function initCache() {
  if (!navigator.serviceWorker) return;
  navigator.serviceWorker.register("appcache.js");
  
  const offlineCapableIndicator = document.getElementById("offlineCapable");
  offlineCapableIndicator.style.visibility = "visible";
}

function checkPopupPermission() {
  const popup = window.open("popup.html");

  if (popup == null) {
    const warningMessage = document.getElementById("warning");
    warningMessage.textContent = "A pop-up blocker is active. Make sure to allow pop-ups on this website.";
  }
}

function init() {
  initCache();
  checkPopupPermission();

  const viewer = new Viewer();

  if ("file" in params)
    viewer.load(params["file"]);
}

if (isController())
  init();
