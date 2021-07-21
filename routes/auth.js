const express =  require('express');
const router = express.Router();
const User = require('../model/user');
const passport = require('passport');


// router.get('/fakeuser',async (req,res)=>{
//     const user = new User({email:'sam@gmail.com',username:'sam'}); //email and username
//     const newUser = await User.register(user,'sam12'); //password
//     res.send(newUser);
// })


//--------------id:samarthvohra.india@gmail.com pass:12345 name:sam --- incase bhoo jaao to

//register krne ke liye form
router.get('/register',async (req,res)=>{
    await res.render('auth/signup');
    // res.send("namaste");
})

router.post('/register',async (req,res)=>{
    try{
        const user = new User({username:req.body.username , email: req.body.email});
        const newUser = await User.register(user,req.body.password);// register hone ke baad hum store kr rhe hai 
        console.log(newUser);
        req.flash('success' , 'New user Registered successfully');
        res.redirect('/products');
    }
    catch(e){
        req.flash('error',e.message);
        // res.flash('error','cannot register this user');
        res.redirect('/register');
        console.log("something went wrong");

    }
})


//login krne ke liye
router.get('/login',async(req,res)=>{
    res.render('auth/login');

})

//router to help in login and authentication
router.post('/login',
    passport.authenticate('local',{ //local = kaunsi strategy ke through krvana hai authenticate
                                            // successRedirect:'/',   
                                    failureRedirect:'/login',
                                            failureFlash:true }),
                                            (req,res)=>{
                                                req.flash('success',`Welcome back ${req.user.username} to our Blog Page`)
                                                console.log(req.user);
                                    res.redirect('/products');
    });


 //logout krne ke liye

router.get('/logout',(req,res)=>{
    req.logout(); //method hai ye
    req.flash('success','logged out successfully');
    res.redirect('/login');
})






                                    
module.exports = router;