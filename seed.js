const mongoose = require('mongoose');
const Product = require('./model/product');

const products = [
    {
        title:"C++",
        desc:"C++ is a cross-platform language that can be used to create high-performance applications.C++ was developed by Bjarne Stroustrup, as an extension to the C language.C++ gives programmers a high level of control over system resources and memory.The language was updated 3 major times in 2011, 2014, and 2017 to C++11, C++14, and C++17.",
        auther:"Samarth Vohra"
    },
    {
        title:"Java",
        desc:"Java is one of the most popular programming languages out there. Released in 1995 and still widely used today, Java has many applications, including software development, mobile applications, and large systems development. Knowing Java opens a lot of possibilities for you as a developer.",
        auther:"Vibhu Gupta"
    },
    {
        title:"Python",
        desc:"Python is a widely used general-purpose, high level programming language. It was created by Guido van Rossum in 1991 and further developed by the Python Software Foundation. It was designed with an emphasis on code readability, and its syntax allows programmers to express their concepts in fewer lines of code.",
        auther:"Shubham Gupta"
    },
    {
        title:"Web-Development",
        desc:" \'Web development\' usually refers to the main non-design aspects of building Web sites: writing markup and coding. Web development may use content management systems (CMS) to make content changes easier and available with basic technical skills.",
        auther:"Samarth Vohra"
    },  {
        title:"Competitive Coding",
        desc:"Competitive Programming is an art form. It is creative problem solving at its finest, a combination of hard analytical thinking and creativity. Competitive programmers use their knowledge of algorithms and data structures and logical reasoning skills to solve challenging algorithmic problems in a limited time frame. Java and C++ are extremely popular due to their relative run-time efficiency compared to a language like Python. C++ is my preferred competitive programming language as I love its Standard Template Library (STL) which allows for quick write ups of solutions. Without further ado, lets get right into it.",
        auther:"Kartik Bhaiya"
    }
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