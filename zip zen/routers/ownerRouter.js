const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');
const isLoggedIn = require('../middlewares/isLoggedIn');


router.post('/create',async (req,res)=>{
    let owners = ownerModel.find();
    if(owners.length > 0){
        return res
        .status(500)
        .send("you dont have permission to creates owner")
    }
    let {fullname,email,password}=req.body;
    let createdOwner = ownerModel.create({
        fullname,
        email,
        password
    });
    res.send(createdOwner);

})

router.get("/admin",isLoggedIn, function(req,res){
    let success = req.flash("success");
    res.render("createproducts",{success});
});

module.exports = router;