import React from 'react';
import { Container, Card, Divider, Button, TextField, Link, Grid, Box, Typography, Avatar, InputAdornment } from '@mui/material';
import { UserContext } from "../user-context";
import { blueGrey } from '@mui/material/colors';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import googleLogo from '../images/Google-logo.png'
import facebookLogo from '../images/facebook-logo.png';




function Signin(){

    const [screen, setScreen] = React.useState({});
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signin } = React.useContext(UserContext);
    
    const handleSubmit = async e => {
        e.preventDefault();
        signin(email, password);
    }

    const responsive = ()=>{
        window.innerWidth < 550
        ? setScreen({
            wS: window.innerWidth,
            hS: window.innerHeight,
        })
        : setScreen({
            wS: 550,
            hS: window.innerHeight, 
        })
    }
    
    React.useEffect(()=>{
        responsive();
    },[]);

    const handleSubmitheadButton =(e) =>{
         e.preventDefault();
         window.location.href = '/signup' 
    }
    



    return(
        <Container component="main" sx={{width: screen.wS, height: screen.hS}}>     
        <Card variant='outlined' sx={{pl:4,pr:4,pt:10,pb:2,borderRadius:10,border:'1px solid grey'}}>
        <Box>
            <svg viewBox="0 0 800 400" style={{position:'static', top:0, right:0, left:0, marginTop:-90, marginRight:-50, marginLeft:-30, marginBottom:-150}}>
                <path id="curve" fill="#068282" d="M 800 300 Q 400 350 0 50 L 0 0 L 800 0 L 800 300 Z"/>
            </svg>
            
        </Box>
            <Box>
                <Grid container sx={{mb:5}}>
                    <Grid item xs={12} sm={12}>
                        <Avatar sx={{p:1, bgcolor:'#068282'}}>
                            <Button
                            type='submit' 
                            onClick={handleSubmitheadButton}>
                                <ArrowBackIcon sx={{color:'white'}}/>
                            </Button>
                        </Avatar>
                    </Grid>
                </Grid>
            </Box>
                
            <Box>
                <Typography component="h1" variant="h4" sx={{pb:3}}>
                    Sign In
                </Typography>
                <Typography component='h2' variant='subtitle1' sx={{color:'GrayText'}}>
                    Welcome back
                </Typography>
            </Box>
                  
            <Box dir='ltr' component="form" sx={{ mt:2, pl:2, pr:2 }} >  

                <TextField
                fullWidth
                size='medium'
                id="email"
                type='email'
                placeholder="Email address"
                variant="standard"
                sx={{mb:3, mt:3}}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Box sx={{height:30, pb:1}} display='flex' alignItems='center'>
                            <EmailOutlinedIcon sx={{pr:1}}/>
                            <Divider orientation='vertical'/>
                        </Box>
                    </InputAdornment>
                ),}}
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />

                <TextField
                fullWidth
                size='medium'
                id="password"
                type='password'
                placeholder="password"
                variant="standard"
                sx={{mb:3, mt:3}}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Box sx={{height:30, pb:1}} display='flex' alignItems='center'>
                            <LockOutlinedIcon sx={{pr:1}}/>
                            <Divider orientation='vertical'/>
                        </Box>
                    </InputAdornment>
                ),
                endAdornment:(
                    <InputAdornment position='end'>
                        <VisibilityOutlinedIcon/>
                    </InputAdornment>
                )
                }}
                value={password}
                onChange={e=>setPassword(e.target.value)}
                />

                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3, p:2, borderRadius:50, bgcolor:'#068282' }}
                value = "login"
                onClick={handleSubmit}
                >
                Sign In
                </Button>
                <Box>
                    <Grid container display='flex' alignItems='center'>
                        <Grid item xs={12} sm={5}>
                            <Divider flexItem sx={{ borderTop: 3, borderBottom:0, borderColor:'#068282' }}/>
                        </Grid>
                        <Grid item xs={12} sm={2} display='flex' justifyContent="center">
                            <Avatar sx={{p:1, color:'#068282' , bgcolor:'white', border:'3px solid #068282'}}>
                                OR
                            </Avatar>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Divider flexItem sx={{ borderTop: 3, borderBottom:0, borderColor:'#068282' }}/>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 3, pl:10, borderRadius:50, bgcolor:'white', color:'inherit', boxShadow:'0px 0px 20px 2px #888888', justifyContent:'left' }}
                    value = "login">
                        <Avatar src={googleLogo}/>
                        <Typography pl={2} variant='caption'>
                            login with Gmail
                        </Typography>
                    </Button>

                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 3, pl:10, borderRadius:50, bgcolor:'white', color:'inherit', boxShadow:'0px 0px 20px 2px #888888', justifyContent:'left' }}
                    value = "login">
                        <Avatar src={facebookLogo}/>
                        <Typography pl={2} variant='caption'>
                            Login with facebook
                        </Typography>
                    </Button>
                </Box>
                <Grid container display='flex' justifyContent='center'>
                    <Grid item sx={{color:blueGrey[500]}}>
                        New Members 
                        <Link href='/signup' variant="body2" sx={{pl:1, fontWeight:700}}>
                        {"Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    </Container>
    )
}
export default Signin;