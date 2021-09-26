// ==UserScript==
// @name         Ichigo-script
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  script to download all PDFs of the site. run the script on links in https://ichigos.com/list
// @author       NOED
// @match        https://ichigos.com/sheets/*
// @require      https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.js
// @require      https://raw.githubusercontent.com/Stuk/jszip-utils/master/dist/jszip-utils.js
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/dist/FileSaver.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant        none
// ==/UserScript==

window.onload=function(){
    'use strict';

    var count=0;
    var links=Array.from(document.getElementsByTagName('a'));
    for(let item of links) {
        if(item.href.toString().includes("type=pdf")){
            count++;
        }
    }

    var musiclist = document.getElementsByClassName("musiclist")[0];
    var divdownload = document.createElement("div");
    var download = document.createElement("button");
    var progresstext = document.createElement("div");

    progresstext.id = "progresstext";


    divdownload.id = "download";
    divdownload.className = "musiclist";
    divdownload.insertAdjacentElement('beforeend',download);

    divdownload.insertAdjacentElement('beforeend',progresstext);

    download.innerText = "download all PDFs";
    download.id = "downloadbutton";

    download.onclick = function(){
        var confirm=window.confirm("Attempting to download PDFs.\nDownload " + count + " file(s)?");

        if(confirm==true){
            var zip = new JSZip();
            var filename = "file";
            var filecount = 0;

            links.forEach(function(item){
                if(item.href.toString().includes("type=pdf")){

                    JSZipUtils.getBinaryContent(item.href, function(err, data){
                        if(err){
                            throw err;
                        }
                        zip.file(filename+filecount+".pdf",data, {binary:true});
                        filecount++;
                        progresstext.innerText = ""+parseInt(filecount/count*100)+"%";
                        if(filecount==count){
                                zip.generateAsync({type:"blob"})
                                    .then(function(blob) {
                                    saveAs(blob, "ichigo.zip");
                                });
                         }
                    });
                }
            });
        }
    }
    musiclist.insertAdjacentElement('afterend', divdownload);
}();
