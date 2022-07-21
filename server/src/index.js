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

// logout a user
server.post('/logout', (_req, res)=>{
    res.clearCookie('refreshtoken', {path: '/refresh_token'});
    return res.send({
        message: 'logged out'
    })
});

// protected route
server.post('/protected', async(req, res)=>{
    try{
        const userId = isAuth(req);
        const isAuth = false;
        if (userId !==null){
            isAuth = true;
        }
        res.send({
            data: isAuth,
        })
    } catch(err){
        res.send({
            error: `${err.message}`,
        })
    }
});

//Get a new access token with a refresh token 
server.post('/refresh_token', (req, res)=>{
    const token = req.cookies.refreshtoken;
    if(!token){ res.send({accesstoken:''});};
    let payload = null;
    try{
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET)
    }catch(err){
        return res.send({accesstoken:''});
    }

    // token is valid
    const user = fakeDB.find(user => user.id === payload.userId);
    if(!user) return res.send({ accesstoken:''})

    //user exist, check if user is exist
    if(user.refreshtoken !==token) {
        return res.send({accesstoken:''})
    }

    // token exist, create new refresh and accesstoken
    const accesstoken = createAccessToken(user.id);
    const refreshtoken = createRefreshToken(user.id);
    user.refreshtoken = refreshtoken;
    

    // all good to go, refreshtoken
    sendRefreshToken(res, refreshtoken);
    return res.send({accesstoken});
})

server.listen(process.env.PORT, ()=>
console.log(`Server listening on port ${process.env.PORT}`));



