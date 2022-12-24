const { resetDailyData } = require(`../prismaScripts/dailycheck`);

const checkIsNewDay = async () => {
  const now = new Date();
  const time_diff = 9 * 60 * 60 * 1000;
  const kst = new Date(now.getTime() + time_diff);
  const hour = kst.getHours();
  const minute = kst.getMinutes();
  const time = '' + hour + minute;

  const year = kst.getFullYear();
  const month = kst.getMonth() + 1;
  const date = kst.getDate();

  if (time === '00') {
    await resetDailyData();
    console.log(
      `[KST: ${
        '' + year + month + date + time
      }] Daily Mining data has been reset`
    );
  }
};

module.exports = { checkIsNewDay };
