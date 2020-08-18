module.exports = async () => {
  try {
    await require("./userSeeder")();
    await require("./transactionSeeder")();
    await require("./contentSeeder")();
    await require("./qrSeeder")();
    await require("./analyticSeeder")();
  } catch (err) {
    console.log(err);
  }
};
