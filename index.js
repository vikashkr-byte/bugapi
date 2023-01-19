const express = require("express")
const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
const dotenv = require("dotenv")
const authRoute = require("./routes/user.routes")
const PORT = process.env.PORT || 8080
dotenv.config()
const app = express()
// mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log("Mongo DB Connection established."))
    .catch((err) => {
        console.log('err:', err)
    })

// all api's
app.use(express.json())
  app.use("/api/auth",authRoute)


app.listen(PORT, () => {
    console.log('PORT:', `http://localhost:${PORT}`)
})

