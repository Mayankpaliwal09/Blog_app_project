// login 1

const isLoggedIn = (req,res,next)=>{

    if(!req.isAuthenticated()){
        req.flash('error', 'Please Login to Add New Blog')
        return res.redirect('/login');
    }
    next();
}

module.exports = {isLoggedIn};


