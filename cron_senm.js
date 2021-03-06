'use strict';

const cronJob = require('cron').CronJob;
const getNew = require('./getnewlist.js');

 
// 毎秒実行
let cronTime = "00 00 */2 * * *";
 
// 一度だけ実行したい場合、Dateオブジェクトで指定も可能
// let cronTime = new Date();
 
let job = new cronJob({
  //実行したい日時 or crontab書式
  cronTime: cronTime
 
  //指定時に実行したい関数
  , onTick: function() {
    //実行時間表示オブジェクト
    const date = new Date();
    console.log("--- --- ---\n" + date.toLocaleString());
    // exported from ./export_getnewlist.js
    getNew();
  }
 
  //ジョブの完了または停止時に実行する関数 
  , onComplete: function() {
    console.log('onComplete!')
  }
 
  // コンストラクタを終する前にジョブを開始するかどうか
  , start: false
   
  //タイムゾーン
  , timeZone: "Asia/Tokyo"
})
 
//ジョブ開始
job.start();
//ジョブ停止
//job.stop();
