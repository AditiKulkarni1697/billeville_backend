const express = require("express")

const errorHandling = (err, req,res,next)=>{
    console.log(err,"errorhandleing")
    res.status(400).send(err.message)
}

module.exports = { errorHandling };