import React, { useState } from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button'
import EmailIcon from '@material-ui/icons/Email';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Input from '@material-ui/core/Input'
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import  secureAxios from '../AxiosConfig/SecureAxios'
import { List } from '@material-ui/icons';
// const apiKey = 'AIzaSyC_aoK2piSs97bZQQpy8RjcXRI4wHbEWnM'
const style={
    common: {
        padding: '10px'
    }
}
function SignIn(props) {
    const [signUp, setSignUp] = useState(true)
    const {authSuccess,errorsLogin,errorsSignUp,signUpErrors,loginErrors,list_initiate}=props

    const handleSubmit = (e) => {
        e.preventDefault()
const credentials= JSON.stringify({
    username: e.target['email'].value,
    password : e.target['password'].value
  });


secureAxios({
    method:'post',
    url:signUp? 'signUp/' :'signIn/',
    headers: { 
        'Content-Type':'application/json'
    },
    data:credentials
}).then(res=>{authSuccess(res.data);
    secureAxios({
        method:'get',
        url:'todo/'
    }).then(res=>{list_initiate(res.data);
        console.log(JSON.stringify(res.data))}).catch(err=>console.log("somthing went wrong",err));
    

     props.history.push('/todoapp')}).catch(err => signUp?
     errorsSignUp(err.response.data.username[0]) :errorsLogin(err.response.data.mgs)
// console.log(err.response.data.username[0])
)
    // console.log(err.response.data.username[0]))
     
 console.log(props)
 console.log(signUpErrors)
 
       
     }
  

//for restapi
//     const handleSubmit = (e) => {
//         e.preventDefault() 
//         const url= signUp ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' :'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
//         const credentials= {
//             email: e.target['email'].value,
//             password: e.target['password'].value,
//             returnSecureToken: true
//         }
//         axios.post(url + apiKey ,credentials).then(res=> {
//              authSuccess(res.data);
//              props.history.push('/todoapp')
//             }).catch(err=>console.log("error",err))
     
// console.log(props)
       
//     }
    console.log(props.state,"store Value")

    return (
        <div style={{textAlign:'center'}}>
            

             <div style={{ backgroundColor:'#bfe004',padding:'5px', margin:'10px'}}>
             <h1> Welcome to To Do List!</h1>

<h2>Sign Up / Sign In</h2>
             </div>
           
           <Container maxWidth="sm">
           <Typography component="div" style={{ backgroundColor: '#facae8' }} >
            <div style={style.common}>
            click here to  <Button  variant="contained" color="primary"  onClick={()=>setSignUp(!signUp)}>{signUp? 'Sign In':'Sign Up'}</Button>
               
            </div>
            <form onSubmit={handleSubmit}>
            <div style={style.common}>
                    <label > username  <EmailIcon/>:</label>
            <Input   type='text' name='email' placeholder='Email' />
                  
                </div>
                <div style={style.common}>
                    <label>Passward <VpnKeyIcon/> :</label>
                    <Input type='password' name='password' placeholder='Password' />
                </div>
                <div style={style.common}>
                    <Button  variant="contained" color="primary" type='submit'>{signUp ? 'Sign Up': 'Sign In'}</Button>
                 
                </div>
                {loginErrors &&<h1> {loginErrors} </h1> }
                {signUpErrors  &&  <h1>{signUpErrors }</h1>}
            </form>
            </Typography>
            </Container>
        </div>
    )
}
const mapStateToProps = state =>({loginErrors:state.loginErrors,
    signUpErrors:state.signUpErrors,
    list_todo:state.listOfTodo
})
const mapDispatchToProps=dispatch=>({
    errorsLogin:(val)=>dispatch({type:"LoginErrors",payload:val}),
    errorsSignUp:(val)=>dispatch({type:"SignUpErrors",payload:val}),
    authSuccess:auth=>dispatch({type:'AUTH_SUCCESS',payload:auth}),
    list_initiate: val => dispatch({ type: 'INITIATE_LIST', payload: val })



})
export default connect(mapStateToProps,mapDispatchToProps)(SignIn)