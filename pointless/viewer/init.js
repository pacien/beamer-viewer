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

const params = function() {
  const queryDict = {};
  location.hash.substr(1).split("&").forEach(item => {
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

function load(file) {
  location.hash = "file=" + file;
  location.reload();
}

if (isController())
  init();
