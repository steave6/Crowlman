'use strict';

const TARGET_URLH = "http://himado.in/?sort=movie_id&cat=%E3%82%A2%E3%83%8B%E3%83%A1&mode=search",
  TARGET_URLS = "http://raw.senmanga.com/",
  TARGET_URLE = "http://eatmanga.com/popular/";

const client = require('cheerio-httpcli');
const fs = require('fs');
const notifier = require('node-notifier');


// Notification func If there is any update.
function Notif (YN, title, message) {
  if (YN) {
      notifier.notify({
      title: title,
      message: message
    });
  } else {
    return;
  }
}


client.fetch(TARGET_URLS,function (err, $, res, body) {
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

  let text = fs.readFileSync('/home/steav/Documents/P/NodeProject/senm/__senm_update.txt', "utf-8");
  text = text.split(',');

  let  count = 0;
  let  upl = [];
  let  YN;
  console.log("senmanga");
  for (let i = 0; i < list_s.length; i++) {
    if (text[0] ===  list_s[0]) {
      upl = "No update";
      console.log("latest = " + list_s[0]);
      YN = false;
      break;
    } else if (text[0] === list_s[count]) {
      console.log("update item = " + count);
      YN = true;
      break;
    } else {
      upl.push(list_s[count]);
      count++;
    }
  }

  console.log(upl);

  let note = upl.toString();
  note = note.replace(/,/g, "\n");
  
  Notif(YN, "senmanga update", note);

  fs.writeFileSync('/home/steav/Documents/P/NodeProject/senm/__senm_update.txt', list_s);
});


client.fetch(TARGET_URLE, function (err, $, res, body) {
  let list_e = [];
  $('th > a').each(function (idx) {
    let push = $(this).text();
    list_e.push(push);
  });

  let text_e = fs.readFileSync('/home/steav/Documents/P/NodeProject/senm/__eatm_update.txt', "utf-8");
  text_e = text_e.split(',');

  let count = 0;
  let upl = [];
  let  YN;
  console.log("eatmanga");
  for (let i = 0; i < list_e.length; i++) {
    if (text_e[0] ===  list_e[0]) {
      upl = "No update";
      console.log("latest = " + list_e[0]);
      YN = false;
      break;
    } else if (text_e[0] === list_e[i]) {
      console.log("update item = " + count);
      YN = true;
      break;
    } else {
      upl.push(list_e[count]);
      count++;
    }
  }

  console.log(upl);

  let note = upl.toString();
  note = note.replace(/,/g, "\n");

  Notif(YN, 'eatmanga update', note);

  fs.writeFileSync('/home/steav/Documents/P/NodeProject/senm/__eatm_update.txt', list_e);
});



client.fetch(TARGET_URLH, function (err, $, res, body) {
  if (err) { console.log(err); return; }

  let list_hima = [];
  let ite = 0;
  $('#thumb > tr').each(function (idx) {
    ite ++;
    $(".thumbblock_3colum", this).each(function (idx) {
      let push = $("a", this).attr("title"); //目的のテキストを抽出
      list_hima.push(push); //データをリストに格納
    });

    if (ite >= 10) {
      return false;
    }
  });

  let text_e = fs.readFileSync('/home/steav/Documents/P/NodeProject/senm/__himado.txt', "utf-8");
  text_e = text_e.split(',');

  let count = 0;
  let upl = [];
  let  YN;
  console.log("himado.in")
  for (let i = 0; i < list_hima.length; i++) {
    if (text_e[0] === list_hima[0]) {
      upl = "No update";
      console.log("latest = " + list_hima[0]);
      YN = false;
      break;
    } else if (text_e[0] === list_hima[i]) {
      console.log("update item = " + count);
      YN = true;
      break;
    } else {
      upl.push(list_hima[count]);
      count++;
    }
  }

  console.log(upl);

  let note = upl.toString();
  note = note.replace(/,/g, "\n");

  Notif(YN, 'himado.in update', note);

  fs.writeFileSync('/home/steav/Documents/P/NodeProject/senm/__himado.txt', list_hima);
});
