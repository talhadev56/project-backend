const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require('path');
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

const db = require('./config/mongoose-connection');
const pageRouter = require("./routers/index");
const usersRouter = require('./routers/userRouter');
const productsRouter = require('./routers/productRouter');
const ownersRouter = require('./routers/ownerRouter');

app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

app.use(expressSession({
        resave: false,
        saveUninitialized : false,
        secret : process.env.EXPRESS_SESSION_SECRET, }));
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});
 
app.use("/", pageRouter);
app.use('/owners',ownersRouter);
app.use('/products',productsRouter);
app.use('/users',usersRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
