// ==UserScript==
// @name         Ichigo-script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  script to download all PDFs of the site. run the script on links in https://ichigos.com/list
// @author       NOED
// @match        https://ichigos.com/sheets/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var count=0;
    var links=document.getElementsByTagName('a');
    for(let item of links) {
        if(item.href.toString().includes("type=pdf")){
            count++;
        }
    }


    var confirm=window.confirm("Attempting to download PDFs.\nDownload " + count + " file(s)?");
    if(confirm==true){
        for(let item of links) {
            if(item.href.toString().includes("type=pdf")){
                    console.log(item.href);
                    var link = document.createElement('a');
                    link.href = item.href;
                    link.download = 'file.pdf';
                    link.dispatchEvent(new MouseEvent('click'));
                }
            }
        }

 
})();
