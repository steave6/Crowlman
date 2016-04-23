'use strict';

var TARGET_URL = "http://himado.in/?sort=today_view_cnt&cat=%E3%82%A2%E3%83%8B%E3%83%A1&mode=search";

var client = require('cheerio-httpcli');
var fs = require('fs');
const notifier = require('node-notifier');

client.fetch(TARGET_URL, function (err, $, res, body) {
  if (err) { console.log(err); return; }

  var list_hima = [];
  var ite = 0;
  $('#thumb > tr').each(function (idx) {
    ite ++;
    var ite2 = 0;
    $(".thumbblock_3colum", this).each(function (idx) {
      ite2++;
      var push = $("a", this).attr("title"); //目的のテキストを抽出
      list_hima.push(push); //データをリストに格納
    });

    if (ite >= 10) {
      return false;
    }
  });

  var text_e = fs.readFileSync('/home/steav/Documents/P/senm/__himado.txt', "utf-8");
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

  var note = upl2.toString();
  note = note.replace(/,/g, "\n");

  notifier.notify({
    title: 'himado.in update',
    message: note,
  });

  fs.writeFileSync('/home/steav/Documents/P/senm/__himado.txt', list_hima);
});
