'use strict';

var TARGET_URL = "http://himado.in/";

var client = require('cheerio-httpcli');
var fs = require('fs');
const notifier = require('node-notifier');

client.fetch(TARGET_URL, function (err, $, res, body) {
  if (err) { console.log(err); return; }

  var list_hima = [];
  var ite = 0;
  $('.thumb_col > div:not(.clearfix2)').each(function (idx) {
    ite ++;
    let push = $('a',this).text(); //目的のテキストを抽出
    push = push.replace(/\s+/g, ""); //文頭の空白を削除
    list_hima.push(push); //データをリストに格納
    if (ite >= 9) {
      return false;
    }
  });

  var text_e = fs.readFileSync('__himado.txt', "utf-8");
  text_e = text_e.split(',');

  var count_h = 0;
  var upl2 = [];
  for (var i = 0; i < list_hima.length; i++) {
    if (text_e[0] === list_hima[0]) {
      upl2 = "No update";
      console.log(upl2);
      console.log("latest = " + list_hima[0]);
      break;
    } else if (text_e[0] === list_hima[i]) {
      console.log("update item = " + count_h);
      console.log(upl2);
      break;
    } else {
      upl2.push(list_hima[count_h]);
      count_h++;
    }
  }

  let note = upl2.toString();
  note = note.replace(/,/g, "\n");

  notifier.notify({
    title: 'himado.in update',
    message: note,
  });

  fs.writeFileSync('__himado.txt', list_hima);
});
