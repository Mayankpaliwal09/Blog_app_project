const mongoose = require('mongoose');
const Product = require('./model/product');

const products = [
    {
        title:"C++",
        desc:"C++ is a cross-platform language that can be used to create high-performance applications.C++ was developed by Bjarne Stroustrup, as an extension to the C language.C++ gives programmers a high level of control over system resources and memory.The language was updated 3 major times in 2011, 2014, and 2017 to C++11, C++14, and C++17.",
        auther:"mannawar"
    },
    {
        title:"Java",
        desc:"Java is one of the most popular programming languages out there. Released in 1995 and still widely used today, Java has many applications, including software development, mobile applications, and large systems development. Knowing Java opens a lot of possibilities for you as a developer.",
        auther:"mayank"
    },
];

// async function  seedDB(){
//     await Product.insertMany(products);
//     console.log("DB seeded");
// }

const seedDB = async()=>{
    await Product.insertMany(products);
    console.log("DB seeded");
};

module.exports = seedDB;