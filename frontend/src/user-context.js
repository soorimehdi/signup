import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const UserContext = createContext([]);


//AXIOS INSTANCE
const axiosInstance = axios.create({
    baseURL : 'http://localhost:4000',
});


const UserProvider = ({children}) => {
    const [user, setUser] = useState('');
    
    
    const readCookie = ()=>{
        const currentUser = Cookies.get('user');
        setUser({accesstoken:currentUser}); 
    }
    
    useEffect(() => {
        readCookie();  
    }, [])
    
    const signup = async(accountName, mobile, email, password) => {
        try {
            const response = await axiosInstance.post('/signup', 
            JSON.stringify({ accountName, mobile, email, password }),
            { 
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials:false
            });
                alert(JSON.stringify(response.data))
            
        } catch(err){
            if (!err.response){
                console.log("no server respose")
            } else {
                console.log('Registaration Failed')
            }
        }
    };


    const signin = async (email, password) => {
        try {
            const response = await axiosInstance.post('/signin', 
            JSON.stringify({ email, password }),
            { 
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials:false
            });
            if(response.data.accesstoken){
                setUser({
                    accesstoken: response.data.accesstoken,
                });
                Cookies.set('user',response.data.accesstoken,{expires: 7, path:''});
                console.log('Refresh token >>>>',response.data.accesstoken);
                alert('welcome');
            }
            else{
                alert('username or password is incorrect')
            }
            
        } catch(err){
            if (!err.response){
                console.log("no server respose")
            } else {
                console.log('login Failed')
            }
        }
    }


    return (
        <UserContext.Provider value={{user, setUser, signin, signup}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;