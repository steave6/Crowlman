var TARGET_URL1 = "http://raw.senmanga.com/",
  TARGET_URL2 = "http://eatmanga.com/popular/";

var client = require('cheerio-httpcli');
var fs = require('fs');
const notifier = require('node-notifier');

client.fetch(TARGET_URL2, function (err, $, res, body) {
  var list_e = "";
  var ite2 = 0;
  $('th > a').each(function (idx) {
    list_e += $(this).text() + ","
    ite2 ++;
    if (ite2 >= 20) {
      return false;
    }
  });

  var text_e = fs.readFileSync('./eatm_update.txt', "utf-8");
  text_e = text_e.split(',');
  list_e = list_e.split(',');

  var j = 0;
  var upl2 = [];
  for (var i = 0; i < text_e.length; i++) {
    if (text_e[0] == list_e[0]) {
      upl2 = "No update";
      console.log(upl2);
      console.log("latest=" + list_e[0]);
      break;
    } else if (text_e[i] === list_e[i+j]) {
      console.log("update item=" + j);
      console.log(upl2);
      break;
    } else {
      upl2 += list_e[j];
      j++;
    }
  }

  notifier.notify({
    title: 'eatmanga update',
    message: upl2
  });

  fs.writeFileSync('eatm_update.txt', list_e);
});
