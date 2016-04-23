'use strict';

const TARGET_URL = "http://himado.in/?sort=today_view_cnt&cat=%E3%82%A2%E3%83%8B%E3%83%A1&mode=search",
  TARGET_URL1 = "http://raw.senmanga.com/",
  TARGET_URL2 = "http://eatmanga.com/popular/";

const client = require('cheerio-httpcli');
const fs = require('fs');
const notifier = require('node-notifier');

client.fetch(TARGET_URL1,function (err, $, res, body) {
  // リンク一覧を表示
  let list_s = [];
  let ite = 0;
  $('tr a').each(function (idx) {
    let push = $(this).attr("title");
    list_s.push(push);
    ite ++;
    if (ite >= 20) {
      return false;
    }
  });

  let text = fs.readFileSync('/home/steav/Documents/P/senm/__senm_update.txt', "utf-8");
  text = text.split(',');

  let  count = 0;
  let  upl = [];
  console.log("senmanga");
  for (let i = 0; i < list_s.length; i++) {
    if (text[0] ===  list_s[0]) {
      upl = "No update";
      console.log(upl);
      console.log("latest = " + list_s[0]);
      break;
    } else if (text[0] === list_s[count]) {
      console.log("update item = " + count);
      console.log(upl);
      break;
    } else {
      upl.push(list_s[count]);
      count++;
    }
  }

  let note = upl.toString();
  note = note.replace(/,/g, "\n");

  notifier.notify({
    title: 'senmanga update',
    message: note
  });

  fs.writeFileSync('/home/steav/Documents/P/senm/__senm_update.txt', list_s);
});


client.fetch(TARGET_URL2, function (err, $, res, body) {
  let list_e = [];
  let ite2 = 0;
  $('th > a').each(function (idx) {
    let push = $(this).text();
    list_e.push(push);
    ite2 ++;
    // if (ite2 >= 20) {
    //   return false;
    // }
  });

  let text_e = fs.readFileSync('/home/steav/Documents/P/senm/__eatm_update.txt', "utf-8");
  text_e = text_e.split(',');

  let count = 0;
  let upl2 = [];
  console.log("eatmanga");
  for (let i = 0; i < list_e.length; i++) {
    if (text_e[0] ===  list_e[0]) {
      upl2 = "No update";
      console.log(upl2);
      console.log("latest = " + list_e[0]);
      break;
    } else if (text_e[0] === list_e[i]) {
      console.log("update item = " + count);
      console.log(upl2);
      break;
    } else {
      upl2.push(list_e[count]);
      count++;
    }
  }

  let note = upl2.toString();
  note = note.replace(/,/g, "\n");

  notifier.notify({
    title: 'eatmanga update',
    message: note 
  });

  fs.writeFileSync('/home/steav/Documents/P/senm/__eatm_update.txt', list_e);
});



client.fetch(TARGET_URL, function (err, $, res, body) {
  if (err) { console.log(err); return; }

  let list_hima = [];
  let ite = 0;
  $('#thumb > tr').each(function (idx) {
    ite ++;
    let ite2 = 0;
    $(".thumbblock_3colum", this).each(function (idx) {
      ite2++;
      let push = $("a", this).attr("title"); //目的のテキストを抽出
      list_hima.push(push); //データをリストに格納
    });

    if (ite >= 10) {
      return false;
    }
  });

  let text_e = fs.readFileSync('/home/steav/Documents/P/senm/__himado.txt', "utf-8");
  text_e = text_e.split(',');

  let count_h = 0;
  let upl2 = [];
  console.log("himado.in")
  for (let i = 0; i < list_hima.length; i++) {
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

  fs.writeFileSync('/home/steav/Documents/P/senm/__himado.txt', list_hima);
});
