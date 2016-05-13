// ==UserScript==
// @name         Reddit Retracted Sidebar
// @namespace    http://michaelcharl.es
// @version      0.1
// @description  Make Reddit's Sidebar Retractable
// @author       Michael Aubrey
// @match        https://www.reddit.com/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
(function() {
  'use strict';
  var leftIcon = '<i class="material-icons">chevron_left</i>';
  var rightIcon = '<i class="material-icons">chevron_right</i>';
  $("head").append("<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' type='text/css'>");
  var $content = $("div.content");
  var $toggleButton = $("<div></div>");
  $toggleButton.css({
    background: "#CEE3F8",
    color: "#212121",
    display: "flex",
    'justify-content': "center",
    'align-items': "center",
    height: "42px",
    width: "42px",
    "font-size": "32px",
    "border-radius": "100px",
    "box-shadow": "0px 3px 5px 0px rgba(33,33,33,0.3)",
    position: "fixed",
    top: "50%",
    right: "-7px",
    cursor: "pointer"
  });
  var $sidebar = $("div.side");

  function hideSidebar() {
    $sidebar.hide();
    $content.css({
      "margin-right": "15px"
    });
    $toggleButton.html(leftIcon);
    setCookie("isRetracted", "true", 30);
  }

  function showSidebar() {
    $sidebar.show();
    $content.css({
      "margin-right": "335px"
    });
    $toggleButton.html(rightIcon);
    setCookie("isRetracted", "false", 30);
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=.reddit.com;path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  if (getCookie("isRetracted") == "true") {
    hideSidebar();
  } else {
    showSidebar();
  }
  $("body").append($toggleButton);
  $toggleButton.click(function() {
    var currentIcon = $toggleButton.html().trim();
    if (currentIcon === rightIcon) {
      hideSidebar();
    } else {
      showSidebar();
    }
  });

})();