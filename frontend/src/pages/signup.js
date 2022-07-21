import React from 'react';
import { Container, Card, Divider, Button, TextField, Link, Grid, Box, Typography, Avatar, InputAdornment } from '@mui/material';
import { UserContext } from "../user-context";
import { blueGrey, blue } from '@mui/material/colors';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';





function Signup(){
    const [screen, setScreen] = React.useState({});
    const [accountName, setAccountName] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signup } = React.useContext(UserContext);
    
    const handleSubmit = async e => {
        e.preventDefault();

        if(accountName.length > 0 && mobile.length > 0 && password > 0 && email.length>0 ){
            signup(
                accountName,
                mobile,
                email,
                password,
            )
        }
        else{
            alert('you must fill in all options')
        }
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
         window.location.href = '/signin' 
    }
    

return(
    <Container component="main" sx={{width: screen.wS, height:screen.hS}}>     
        <Card variant='outlined' sx={{m:0 ,pl:4,pr:4,pt:10,pb:2,borderRadius:10,border:'1px solid grey'}}>
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
                    Sign up
                </Typography>
                <Typography component='h2' variant='subtitle1' sx={{color:'GrayText'}}>
                    Create an account here
                </Typography>
            </Box>
                  
            <Box dir='ltr' component="form" sx={{ mt:2, pl:2, pr:2 }} >  
                <TextField
                fullWidth
                size='medium'
                id="accountName"
                type='text'
                placeholder="Create an account here"
                variant="standard"
                autoFocus
                sx={{mb:3, mt:3}}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Box sx={{height:30, pb:1}} display='flex' alignItems='center'>
                            <PersonOutlineOutlinedIcon sx={{pr:1}}/>
                            <Divider orientation='vertical'/>
                        </Box>
                    </InputAdornment>
                ),}}
                value={accountName}
                onChange={e=>setAccountName(e.target.value)}
                />

                <TextField
                fullWidth
                size='medium'
                id="mobile"
                type='number'
                placeholder="Mobile Number"
                variant="standard"
                sx={{mb:3, mt:3}}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Box sx={{height:30, pb:1}} display='flex' alignItems='center'>
                            <PhoneIphoneOutlinedIcon sx={{pr:1}}/>
                            <Divider orientation='vertical'/>
                        </Box>
                    </InputAdornment>
                ),}}
                value={mobile}
                onChange={e=>setMobile(e.target.value)}
                />

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
                Sign Up
                </Button>
                <Box>
                    <Grid container display='flex' alignItems='center' justifyContent='center'>
                        <Grid item xs={12} sm={5}>
                            <Divider variant='fullWidth' flexItem sx={{ borderTop:3, borderBottom:0, borderColor:'#068282'}}/>
                        </Grid>
                        <Grid item xs={12} sm={2} display='flex' alignItems='center' justifyContent='center'>
                            <Avatar sx={{p:1, color:'#068282' , bgcolor:'white', border:'3px solid #068282'}}>
                                OR
                            </Avatar>
                        </Grid>
                        
                        <Grid item xs={12} sm={5} >
                            <Divider variant='fullWidth' flexItem sx={{ borderTop:3, borderBottom:0, borderColor:'#068282'}}/>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 3, pr:6, borderRadius:50, bgcolor:'white', color:'inherit', boxShadow:'0px 0px 20px 2px #888888', justifyContent:'center' }}
                    value = "login">
                        <GoogleIcon fontSize='large' sx={{color: blue[700], pr:1}}/>
                        login with Gmail
                    </Button>

                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 3, borderRadius:50, bgcolor:'white', color:'inherit', boxShadow:'0px 0px 20px 2px #888888', justifyContent:'center' }}
                    value = "login">
                        <FacebookOutlinedIcon fontSize='large' sx={{color: blue[700], pr:1}}/>
                        Login with facebook
                    </Button>
                </Box>
                <Grid container display='flex' justifyContent='center'>
                    <Grid item sx={{color:blueGrey[500]}}>
                        New Members 
                        <Link href='/signin' variant="body2" sx={{pl:1, fontWeight:700}}>
                        {"Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Card>
</Container>
)
}

export default Signup;