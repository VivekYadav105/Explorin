const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./router/user.router");
const morgan = require("morgan");
const dotenv = require('dotenv')
const errorHandler = require('./middleware/error.middleware')

dotenv.config()

const app = express();

const PORT = process.env.PORT||5000;

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/user", userRouter);

app.get('/',(req,res)=>{
  return res.send("Plunes task")
})

app.use(errorHandler)


app.listen(PORT, (err) => {
  console.log("connected to server succesfully", PORT);
});
