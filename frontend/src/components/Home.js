import React from 'react'
import {Link} from 'react-router-dom'

function Home(props){
    return(

<div style={{textAlign:'center', backgroundColor:'#9548fa',padding:'5px', margin:'10px'}}>
<h1> Welcome to To Do List!</h1>

<h2> <Link to='/login'>click here to Sign UP / Sign In</Link></h2>

</div>
    )
}

export default Home