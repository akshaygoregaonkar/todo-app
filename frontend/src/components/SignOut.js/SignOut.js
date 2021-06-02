import { connect } from "react-redux"
import {useEffect} from 'react'
import {Redirect} from "react-router-dom"

function SignOut(props){
    useEffect(()=>{
props.LogOut()
    },[])
    
    return(
        <div>
<Redirect to='/login'/>
        </div>
    )
}
const mapDispatchToProps=dispatch=>({
    LogOut:()=>dispatch({type:'LOG_OUT'})
})
export default connect(null,mapDispatchToProps)(SignOut)