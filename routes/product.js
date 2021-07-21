const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const Review = require('../model/review');

//requiring isloggedIN FUNCTI0N FOR AUTHEN.
const {isLoggedIn} = require ('../middleware');

// index page intially sab dikhana
router.get('/products',async (req,res)=>{
    try{

        const products = await Product.find({});
        // res.render('products/index',{products  , msg:req.flash('success')});
        res.render('products/index',{products});
    }
    catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Show Blog Page');
        // res.send("error");
        res.redirect('/error');
     } 
});
 

//showing new form to add
router.get('/products/new', isLoggedIn, (req,res)=>{
   
    
    
    
    try{
        res.render('products/new');
        
    }
    catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Cannot Show New Blog Form');
        // res.send("error");
        res.redirect('/error');
     } 
});

//creating new product
router.post('/products',isLoggedIn, async(req,res)=>{
    try{
        if(!req.isAuthenticated()){
            req.flash('error', 'Please Login to Add New Blog')
            return res.redirect('/login');
        }

        const {product} = req.body;
        await Product.create(product);
        //success msg flash using res.locals via middleware function in app.js
        req.flash('success', 'product created successfully'); // this msg will be stored in success thats why we have installed sessions
        res.redirect('/products');
    }
    catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Create New Blog');
        // res.send("error");
        res.redirect('/error');
    } 
});



//showing a particular product
router.get('/products/:id', async(req,res)=>{
    try{

        const {id} = req.params;
        const product = await Product.findById(id).populate('reviews'); //array
        
        res.render('products/show',{product});
    }
    catch(e){
        // console.log(e.message);
        req.flash('error' , 'Something went Wrong!!! Cannot Show this Particular Blog');
        res.redirect('/error');
    }
});


//adding edit form
router.get('/products/:id/edit',isLoggedIn, async(req,res)=>{
    try{

        const {id} = req.params;
        const product = await Product.findById(id);
        
        res.render('products/edit',{product});
    }
    catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Edit this Particular Blog');
        // res.send("error");
        res.redirect('/error');
     } 
});


//updating
router.patch('/products/:id',isLoggedIn, async(req,res)=>{
    try{

        const {id} = req.params;
        const {product} = req.body;
        await Product.findByIdAndUpdate(id,product);
        req.flash('success', 'product updated successfully');
        res.redirect(`/products/${req.params.id}`);
    }
    catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Update this Particular Blog');
        // res.send("error");
        res.redirect('/error');
     } 
});

//deleting
router.delete('/products/:id',isLoggedIn, async(req,res)=>{
    try{

        await Product.findByIdAndDelete(req.params.id);
        req.flash('success', 'product deleted successfully');
        res.redirect(`/products`);
    }
    catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Delete this Particular Blog');
        // res.send("error");
        res.redirect('/error');
     } 
});



// creating a new review 

router.post('/products/:id/review',  async (req,res)=>{
    // res.send("hnji comment krne ka try krrhe ho");
    // console.log(req.body);
    // res.send("go to cosole");
try{

    const {id} = req.params;
    const product = await Product.findById(req.params.id);
    // const review  = new Review(req.body); //request.body mie jo review AAEGA usko mai create krdunga

    //we are creating review using spread operator
    const review  = new Review({
        user: req.user.username,
        ...req.body});

    product.reviews.push(review); // reviews vaali array mei store krdena hai // yahan objct id hi store hogi coz humne schema se id ki form mei milega
    await review.save(); // schema mei chages kre hai islye save 
    await product.save(); // produt mei new review aaya hai isliye save
    req.flash('success', 'review created successfully');
    res.redirect(`/products/${id}`);
}

    catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Create this Particular Review because user is not logged in');
        // res.send("error");
        res.redirect('/error');
     } 
});



//deleteing the partiular review
  router.delete('/products/:id/:idreview',isLoggedIn, async(req,res)=>{
      try{
          const{idreview} = req.params;
          // console.log("sam");
        // await Review.findAndRemove(req.params.id);
        await Review.findByIdAndDelete(idreview);
        req.flash('success', 'review deleted successfully');
        res.redirect(`/products/${req.params.id}`);

      }
      catch(e){
        console.log("something went wrong");
        req.flash('error' , 'Something went Wrong!!! Cannot Delete this Particular Review');
        // res.send("error");
        res.redirect('/error');
     }   
  })


//   /error page
router.get('/error',(req,res)=>{
    res.render('products/error');
})

module.exports = router;