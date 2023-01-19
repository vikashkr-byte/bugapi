const mongoose = require("mongoose")

const bugsSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    elevel: { type: String, required: true }
})

module.exports=mongoose.model("Bug",bugsSchema)