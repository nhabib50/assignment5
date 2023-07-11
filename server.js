/*********************************************************************************
* WEB700 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Mohammad Muzammil Afsar Student ID: 124058223 Date: 8 Jul 2023
*
* Online (Cyclic) Link: https://curious-gold-macaw.cyclic.app/
*
********************************************************************************/
var express = require("express");
const path = require('path');
const collegeData = require("./modules/collegeData");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;


const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: true }));

// setup a 'route' to listen on the default url path
app.get("/students", (req, res) => {
    const { course} = req.query;
    collegeData.getAllStudents().then(students => {
        if(course) {
            let filtered = students.filter(val => val.course === Number(course));
            if (filtered.length > 0) {
                res.status(200).json(filtered);
            } else {
                res.status(200).send({message:"no results"});
            }
        } else {
            res.status(200).json(students);
        }
    }).catch(err => {
        res.status(500).send({message:"no results"});
    })
});
app.get("/student/:num", (req, res) => {
    const { num} = req.params;
    collegeData.getStudentByNum(Number(num)).then(student => {
        res.status(200).json(student);
    }).catch(err => {
        res.status(500).send({message:"no results"});
    })
});
app.get("/tas", (req, res) => {
    collegeData.getTAs().then(tas => {
        res.status(200).json(tas);
    }).catch(err => {
        res.status(500).send({message:"no results"});
    })
});
app.get("/", (req, res) => {
    const filePath = path.join(__dirname, 'views', 'home.html');
    res.sendFile(filePath)
});
app.get("/about", (req, res) => {
    const filePath = path.join(__dirname, 'views', 'about.html');
    res.sendFile(filePath)
});
app.get("/htmlDemo", (req, res) => {
    const filePath = path.join(__dirname, 'views', 'htmlDemo.html');
    res.sendFile(filePath)
});
app.get("/students/add", (req, res) => {
    const filePath = path.join(__dirname, 'views', 'addStudent.html');
    res.sendFile(filePath)
});

app.post("/students/add", (req, res) => {
    console.log(req.body)
    collegeData.addStudent(req.body).then(() => {
        res.redirect('/students');
    }).catch(err => {
        res.status(500).send({message:"no results"});
    })
});


app.get("/courses", (req, res) => {
    collegeData.getCourses().then(courses => {
        res.status(200).json(courses);
    }).catch(err => {
        res.status(500).send({message:"no results"});
    })
});
// 404 Error Handler
app.use((req, res, next) => {
    const filePath = path.join(__dirname, 'views', '404.html');
    res.status(404).sendFile(filePath);
});
// setup http server to listen on HTTP_PORT
collegeData.initialize().then(() => {
    app.listen(HTTP_PORT, ()=>{console.log("server listening on port: " + HTTP_PORT)});
}).catch(err => {
    console.error(err);
});