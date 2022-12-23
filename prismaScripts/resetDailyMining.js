const { resetDailyData } = require(`./dailycheck`);

const reset = async () => {
  await resetDailyData();
};

reset();
