const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfghqjwiieuyt5617829ıauysgdfgvabsn'

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());

mongoose.connect('mongodb+srv://262909:yl51XN3ZsmAPnVC7@cluster0.l7kbjpu.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req,res) => {
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch(e) {
        console.log(e);
        res.status(400).json(e);
    }
    
});

app.post('/login', (req,res) => {
    const {username, password} = req.body;
    const userDoc = User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        //logged in
        jwt.sign({username, id:userDoc._id}, secret, {}, (err,token) => {
            if(err) throw err;
            res.cookie('token', token).json('ok');
        });
    } else {
        res.status(400).json('wrong credentials');
    }
});

app.listen(4000);

//