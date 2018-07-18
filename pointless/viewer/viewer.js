/*
 * viewer.js
 * Part of Pointless Viewer, a Beamer presentation viewer
 * Copyright 2018 Pacien TRAN-GIRARD
 * License: GNU GPL v3
 */

"use strict";

var params = function() {
  var queryDict = {};
  location.search.substr(1).split("&").forEach(function(item) {
    var pair = item.split("=");
    queryDict[pair[0]] = pair[1];
  });
  return queryDict;
}();

if (window.opener == null) {
  pdfjsLib.getDocument(params["file"]).then(function(pdf) {
    var presentation = new Presentation(pdf);
  });
}
