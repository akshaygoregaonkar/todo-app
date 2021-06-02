import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import AddTodo from './AddTodo'
import ErrorBoundary from './ErrorBoundry'
import Header from './Header'
import TodoList from './TodoList'
import VisiblityFilters from './VisiblityFilters'
import secureAxios  from './AxiosConfig/SecureAxios'
// import {BrowserRouter,Switch,Route} from 'react-router-dom'

 


function TodoApp(props){
    const{authSucess,list_initiate}=props
    useEffect(()=>{
        if(authSucess===null){
        props.history.push('/login')
        // secureAxios({
        //     method:'get',
        //     url:'todo/'
        // }).then(res=>{list_initiate(res.data);
        //     console.log(JSON.stringify(res.data))}).catch(err=>console.log("somthing went wrong",err))
        
        }


    },[authSucess])

    // console.log(props)
    return(
    <div >
       <ErrorBoundary>
    
    <Header/>
    
        <div style={{margin:'10px',padding:'5px',textAlign:'center'}}>
        <AddTodo/>
        </div>
        <div style={{margin:'10x',padding:'5px'}}>
        <TodoList/>
        </div>

        <div style={{margin:'10px',padding:'5px'}}>
       

        <VisiblityFilters/>
       
        </div>

        </ErrorBoundary>
    </div>
    )
}
// const mapStateToProps=state=>({ }) 

const mapStateToProps =state=>({
    authSucess:state.authentication.tokenId,
    todolist:state.listOfTodo
})
const mapDispatchToProps=dispatch=>({
    // authInitiate:()=>dispatch({type:'AUTH_INITIATE'}),
     list_initiate: val => dispatch({ type: 'INITIATE_LIST', payload: val })

})

export default connect(mapStateToProps,mapDispatchToProps)(TodoApp)