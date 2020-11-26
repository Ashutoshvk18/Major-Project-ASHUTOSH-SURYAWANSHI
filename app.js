const express = require("express");
const path = require("path");
const app = express();
// getting-started.js
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contact', {useNewUrlParser: true});
const port = 8000;

// DEFINE MONGOOSE SCHEMA 

const contactschema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    gender: String,
  });

const contact = mongoose.model('contact', contactschema);





// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('index.html', params);
})

app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.html', params);
})

app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been recorded")
    }).catch(()=>{
        res.status(400).send("Item is not saved")



    });

  

  
})






// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});