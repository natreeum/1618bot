const { resetDailyData } = require(`../prismaScripts/dailycheck`);

const checkIsNewDay = async () => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const time = '' + hour + minute;

  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  if (time === '00') {
    await resetDailyData();
    console.log(
      `[UTC : ${
        '' + year + month + date + time
      }] Daily Mining data has been reset`
    );
  }
};

module.exports = { checkIsNewDay };
