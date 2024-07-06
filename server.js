const express = require("express");
const errorhandler = require("./middleware/errorhandler");
const connectDb = require("./configs/dbConnection");
const dotenv=require("dotenv").config();

connectDb();
const app=express();

const port=process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRouts"));
//app.use(errorhandler);
app.use((err, req, res, next) => {
    errorhandler(err, req, res, next);
});

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});