const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require('../models/user-model');


router.get("/", function(req, res) {
    res.render("index", {success: req.flash("success"),error: req.flash("error"),loggedin:false});
});


router.get("/shop",isLoggedin,  async function(req, res) {
    try {
        const products = await productModel.find();
        let success= req.flash("success",)
        res.render('shop', { products: products,success }); 
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading shop.");
    }
});

router.get("/addtocart/:productid",isLoggedin, async function(req, res) {
  let user = await userModel.findOne({ email:req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("sucess","Added to cart");
  res.redirect("/cart")
});


router.get("/cart", isLoggedin, async function (req, res) {
  if (!req.user) return res.redirect('/');

  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  if (!user || user.cart.length === 0) {
    return res.render('cart', { user, bill: 0 });
  }

  const shippingFee = 20;
  let bill = 0;

  user.cart.forEach(item => {
    const price = Number(item.price);
    const discount = Number(item.discount || 0);

    item.finalPrice = price - discount + shippingFee;
    bill += item.finalPrice;
  });

  res.render('cart', { user, bill });
});

router.get('/myaccount', async (req, res) => {
    try {
        const user = await userModel.findOne(); // just get one user from DB
        res.render('myaccount', { user });
    } catch (err) {
        console.error(err);
        res.send("Error loading My Account page");
    }
});




router.get("/logout", isLoggedin ,function(req,res){
    res.redirect("/");
});

module.exports = router;