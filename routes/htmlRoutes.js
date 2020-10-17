const express = require('express');
const path = require("path");
const router = express.Router();

router.get("/", (req,res)=>{
    res.render("home");
})

router.get("/tables", (req,res)=>{
    res.render("tables");
})

router.get("/reserve", (req,res)=>{
    res.render("reserve");
})


module.exports = router;