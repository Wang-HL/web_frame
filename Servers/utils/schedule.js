/**
 * 定时任务 node-schedule
 *  *  *  *  *  *  *
    ┬  ┬  ┬  ┬  ┬  ┬
    │  │  │  │  │  |
    │  │  │  │  │  └ day of week (0 - 7) (0 or 7 is Sun)
    │  │  │  │  └───── month (1 - 12)
    │  │  │  └────────── day of month (1 - 31)
    │  │  └─────────────── hour (0 - 23)
    │  └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, OPTIONAL)
 * 示例如下：
 * 每分钟的第30秒触发： '30 * * * * *'
 * 每小时的1分30秒触发 ：'30 1 * * * *'
 * 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
 * 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
 * 2016年的1月1日1点1分30秒触发 ：'30 1 1 1 2016 *'
 * 每周1的1点1分30秒触发 ：'30 1 1 * * 1'
 */
const schedule = require('node-schedule');


// Cron风格定时器
const scheduleCronstyle = () => {
  //每分钟的第5-10秒定时执行:
  schedule.scheduleJob('5-10 * * * * *', () => {
    console.log('scheduleCronstyle:' + new Date());
  });
}

/**
 * 对象文本语法定时器
 * 时间参数：dayOfWeek、month、dayOfMonth、hour、minute、second
 */
function scheduleObjectLiteralSyntax() {
  //每周一的下午16：11分触发，其它组合可以根据我代码中的注释参数名自由组合
  schedule.scheduleJob({ hour: 16, minute: 11, dayOfWeek: 1 }, function () {
    console.log('scheduleObjectLiteralSyntax:' + new Date());
  });
}


/**
 * 取消定时器
 * 调用 定时器对象的cancl()方法
 */
function scheduleCancel() {
  var counter = 1;
  const j = schedule.scheduleJob('* * * * * *', function () {
    console.log('定时器触发次数：' + counter);
    counter++;
  });

  setTimeout(function () {
    console.log('定时器取消')
    // 定时器取消
    j.cancel();
  }, 5000);

}

export default scheduleCronstyle;