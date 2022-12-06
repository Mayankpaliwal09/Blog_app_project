const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const path = require('path');
const Product = require('./model/product');
const seedDB = require('./seed');
const methodOverride = require('method-override');
//yahan se flash and authentication ka shuru hai
const session = require('express-session');
const flash  = require('connect-flash');
//now authentication waala requied stuf
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./model/user');
// const passport = require('passport'); // pehle s ehi scheema mei use krlia hai to automatically get username and password 


//routes
const productRoutes = require('./routes/product'); 
const authRoutes = require('./routes/auth');



//conecting dbs
mongoose.connect('mongodb://localhost:27017/Blog_app', // shopApp naam ka database hoga to conect hojaega else create hojjega
            {useNewUrlParser: true, 
             useUnifiedTopology: true,
             useFindAndModify:false,
             useCreateIndex:true
            })
            .then(()=>{
                console.log("mongoose DB connected")
            })

            
            .catch(err=>{
                console.log("mongoose DB didnot connect");
                console.log(err);
            })

            //SEEDING DBS
            // seedDB();


app.set('view engine' , 'ejs');
app.set('views',path.join(__dirname,'/views'));


app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//for authentication as well flash    (this is mad ein .env files)
const sessionConfig = {
    secret:'findagoodsecret',
    resave:false,
    saveUninitialized:true,
}
 
app.use(session(sessionConfig));
app.use(flash());



//----------------------------authentication yhan se use start----------------------------
// use session before passport.session
// initialising the passport and session for using the user info
//configuring passport after requiring it i.e initialising passport and sessions for storing user info
app.use(passport.initialize()); 
app.use(passport.session()); 

//configuring the passport to use local strategy
passport.use(new localStrategy(User.authenticate()));  //user schema ke andr static method available hota hai i.e authenticate to authenticate user

//user ko session mei store krna and yaad rkhna login krne pr
passport.serializeUser(User.serializeUser());
//user ko session mei se hatana logout krne pr
passport.deserializeUser(User.deserializeUser());
//----------------------------authentication yhan end hai -------------------------------




//making middleware for flash after makig session and flash route
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    //current user ko available krana hai to
    res.locals.currentUser = req.user;
    next();
}) 





app.use(productRoutes);
app.use(authRoutes);


//landing page
app.get('/',(req,res)=>{
    res.render('products/home');
})

app.get('/home',(req,res)=>{
    res.render('products/home');
})



app.listen(3000,()=>{
    console.log("server running at port 3000");
}) 