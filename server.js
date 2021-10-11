// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// dependancies 
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, ()=>{console.log(`Server is running on localhost: ${port}\nPlease click here to open http://localhost:${port}/`)})

// create route 
// GET Route I: Server Side
app.get('/weather', (req,res)=>{res.send(projectData)});


app.post('/collectData', addTemprature)

function addTemprature(req, res) {
    console.log('add temp ',req.body);
    let reqData = req.body;
    projectData.date = reqData.date;
    projectData.temp = reqData.temp;
    projectData.content = reqData.content;
}

