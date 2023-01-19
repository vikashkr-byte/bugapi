const express = require('express')

const bugRouter = express.Router()
const Bug = require("../models/bugs")


// report bug api

bugRouter.post("/reportbugs", async (req, res) => {
    try {
        const newBug = new Bug({
            name: req.body.name,
            elevel: req.body.elevel
        })
        const bug = await newBug.save()
        res.status(200).json(bug)
    } catch (error) {
        console.log('error:', error)
        res.status(500).json(error)
    }
})
bugRouter.get("/bugs",async(req,res)=>{
    try {
        let bugsData=await Bug.find()
        console.log('bugsData:', bugsData)
        res.status(200).json(bugsData)
    } catch (error) {
        console.log('error:', error)
    }
})



module.exports = bugRouter;