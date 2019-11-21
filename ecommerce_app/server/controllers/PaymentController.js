const sk_test = require("../config.js");
const stripe = require("stripe")(sk_test);

const charge = async (req, res) => {
  console.log(sk_test,req.body);
  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount * 100,
      currency: "eur",
      description: "An example charge",
      source: req.body.token_id
    });
    res.json({ status });
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error' })
      .end();
  }
};

module.exports = {
  charge
};
