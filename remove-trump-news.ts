// ==UserScript==
// @name         Nachrichten über Trump entfernen
// @namespace    http://tampermonkey.net/
// @version      2025-12-28
// @description
// @author       Andreas Preikschat
// @match        https://www.tagesschau.de/*
// @grant        none
// ==/UserScript==


const regex = /\btrump?s\b/i; // "Trump", "Trumps", "trump" or "trumps"


function removeTrump(childClass, parentClass) {
    let headlines = document.querySelectorAll(childClass);

    headlines.forEach(headline => {
        const text = headline.textContent;

        if (regex.test(text)) {
            const teaserElement = headline.closest(parentClass);

            if (teaserElement) {
                teaserElement.style.display = 'none';
            }
        }
    });
}

(function() {
    'use strict';

    removeTrump('.teaser-slider__headline', '.swiper-slide');
    removeTrump('.teaser-xs__headline', '.teaser-xs');
    removeTrump('.teaser__headline', '.teaser');
})();

