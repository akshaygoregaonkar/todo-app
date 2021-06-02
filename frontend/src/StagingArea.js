import {connect} from 'react-redux'
import {Switch,Route} from 'react-router-dom'


import {useEffect} from 'react'
import TodoApp from './components/TodoApp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut.js/SignOut'
import Home from './components/Home'
import ErrorBoundary from './components/ErrorBoundry'
import secureAxios from './components/AxiosConfig/SecureAxios'

function StagingArea(props) {
    const {authInitiate,list_initiate,todolist}=props
    useEffect(()=>{
    authInitiate()
    secureAxios({
        method:'get',
        url:'todo/'
    }).then(res=>{list_initiate(res.data);
        console.log(JSON.stringify(res.data))}).catch(err=>console.log("somthing went wrong",err))
    

    },[])

    console.log(todolist)
return(
    <div>
       <ErrorBoundary> 
 <Switch>
        <Route  path='/login' component={SignIn}/>
        <Route path='/todoapp' component={TodoApp}/>
        <Route path='/logout' component={SignOut}/>
        <Route path='/' component={Home} />
     </Switch>
     </ErrorBoundary>
    </div>
)    
}
 

const mapStateToProps=state=>({todolist:state.listOfTodo }) 
const mapDispatchToProps=dispatch=>({
    authInitiate:()=>dispatch({type:'AUTH_INITIATE'}),
     list_initiate: val => dispatch({ type: 'INITIATE_LIST', payload: val })

})

export default connect(mapStateToProps,mapDispatchToProps)(StagingArea)

//THIS CALL IS MADE Bcz go to local storage and check if theier is value (session is expires or not if the value is thier)

//when we refresh the value of store is emmpty but token value is present at loacal storage 
//incase of token is not expire and value is present in local storage we have to update the  redux store