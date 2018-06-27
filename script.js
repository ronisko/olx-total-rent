// ==UserScript==
// @name         OLX - total rent
// @namespace    https://github.com/ronisko/olx-total-rent
// @version      0.1
// @updateURL    https://raw.githubusercontent.com/kmanijak/filmweb-seen-movies-hider/master/script.js
// @description  Show total rent of flat on OLX
// @author       Bartosz Szymański
// @match        https://www.olx.pl/nieruchomosci/mieszkania/wynajem/*
// @grant        GM_addStyle
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

GM_addStyle(
    `.full-rent {
        margin-top: 14px;
        border: 1px solid #eab30b;
        padding: 4px 12px;
    }`
);

(function() {
    'use strict';
    let elements = $('a.marginright5');
    var x = 0;
    elements.each(function() {
        var link = $(this).attr("href");
        var rent = "0 zł";
        if (link.startsWith("https://www.olx.pl")) {
            var site = $.ajax({type: "GET", url: link, async: false}).responseText;
            rent = $(site).find('th:contains("Czynsz (dodatkowo)")').parent().find('strong').text();
        }

        const rentDiv = document.createElement("div");
        rentDiv.className = "space inlblk rel";
        const rentP = document.createElement("p");
        rentP.className = "price";
        const rentStrong = document.createElement("strong");
        var text = document.createTextNode(String(rent));
        rentStrong.appendChild(text);
        rentP.appendChild(rentStrong);
        rentDiv.appendChild(rentP);
        //var text = '<div class="wwnormal tright td-price">' +  + '</div>';
        $('td.wwnormal.tright.td-price')[x].append(rentDiv);
        x++;
    });
})();