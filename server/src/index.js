require('dotenv/config');
const express = require('express');
const cookieparser = require ('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const { 
    createAccessToken, 
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
} = require('./tokens.js');
const { fakeDB } = require('./fakeDB.js');
const { isAuth } = require('./isAuth');
// const { use } = require('express/lib/application');


const server = express();
server.use(cookieparser());

server.use(
    cors({
        origin: 'http://localhost:3000',
        Credentials: true,
    })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true}));


// Register a user
server.post('/signup', async(req, res)=>{
    const { accountName, mobile, email, password } = req.body;
    try{
        const userEmail = fakeDB.find(user => user.email === email);
        if(userEmail) throw new Error ('this Email already exist');
        const userAccount = fakeDB.find(user => user.accountName === accountName);
        if(userAccount) throw new Error ('this account name already exist');

        const hashePassword = await hash(password, 5);

        fakeDB.push({
        id: fakeDB.length,
        accountName,
        mobile,
        email,
        password: hashePassword
    });
    res.send({ message: 'User Created'});
    console.log(fakeDB);

    } catch (err){
        res.send({
            error: `${err.message}`
        })
    } 
});

// Login a user 
server.post('/signin', async(req, res)=>{
    const { email, password } = req.body;
    const errorMessage = 'User or password dose not exist'
    try{
        const user = fakeDB.find(user => user.email === email);
        if (!user) throw new Error (errorMessage);
        const valid = await compare(password, user.password);
        if(!valid) throw new Error (errorMessage);
        const accesstoken = createAccessToken(user.id);
        const refreshtoken = createRefreshToken(user.id);
        user.refreshtoken = refreshtoken;
        console.log(fakeDB);
        sendRefreshToken(res, refreshtoken);
        sendAccessToken(res, req, accesstoken);
    }catch(err){
        res.send({
            error: `${err.message}`
        })
    }
});


server.listen(process.env.PORT, ()=>
console.log(`Server listening on port ${process.env.PORT}`));



