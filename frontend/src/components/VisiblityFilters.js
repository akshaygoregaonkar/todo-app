import React, { useState } from 'react'
import { connect } from 'react-redux'


function VisiblityFilters(props) {
    const [type, setType] = useState('')
    const { listOfTodo } = props

    const Completed = listOfTodo.filter(item => item.checked == true)
    const InCompleted = listOfTodo.filter(item => item.checked == false)

    return (
        <div style={{ background: '#984aff', padding: '10px', color: 'white' }}>
            <div>
                <label style={{ fontSize: '20px' }}>Visiblity Filter :</label>
                <select name='filter' onChange={(e) => setType(e.target.value)}>
                    <option value=""></option>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Incomplete">Incomplete</option>

                </select>
            </div>

            <div>
                {type === 'All' ? <div>
                    <h3> All Task</h3>
                    {listOfTodo.map((item, index) => <div key={index}>
                        <li> <div>Task:{item.task} </div>Description : {item.description}<div> Date :{String(item.date)}</div></li>

                    </div>)} </div> : <></>}

                {type === 'Completed' ? <div>
                    <h3> Completed Task</h3>
                    {Completed.map((item, index) => <div key={index}>


                        <li> <div>Task:{item.task} </div>Description : {item.description}<div> Date :{String(item.date)}</div></li>

                    </div>)} </div> : <></>}

                {type === 'Incomplete' ? <div>
                    <h3> Incomplete Task</h3>
                    {InCompleted.map((item, index) => <div key={index}>


                        <li> <div>Task:{item.task} </div>Description : {item.description}<div> Date :{item.date}</div></li>

                    </div>)} </div> : <></>}


            </div>
            {/* <table style={{ width: '100%', textAlign: 'center' }}>
                    <tr>
                        <th  >Completed Task</th>
                        <th>InCompleted Task</th>

                    </tr>
                    <tr>
                        <td>

                            {Completed.map((item, index) => <div key={index}>


                                <li> <div>Task:{item.Task} </div>Description : {item.Description}<div> Date :{String(item.Date)}</div></li>

                            </div>)}
                        </td>

                        <td>
                            {InCompleted.map((item, index) => <div key={index}>

                                <li> <div>Task:{item.Task} </div>Description : {item.Description}<div> Date :{String(item.Date)}</div></li>

                            </div>)}
                        </td>

                    </tr>

                </table> */}


            {/* {listOfTodo && <div>
                <div  >
                     
                <h3>Completed Task</h3>
                    {listOfTodo.map((item, index) => <div  key={index}>
                    
                            {item.checked ? <li> <div>{item.Task} </div>{item.Description}<div></div></li> : <></>}
                    
                    </div>)} 
                    </div>
                 

               
                    <div >
                    <h3>InCompleted Task</h3>
                    {listOfTodo.map((item, index) => <div  key={index}>
                        <div>
                            {!item.checked ? <li> <div>{item.Task} </div>{item.Description}<div></div></li> : <></>}
                        </div>
                    </div>)}
                    
                </div>

            </div>} */}
        </div>
    )
}


const mapStateToProps = state => ({ listOfTodo: state.listOfTodo })
// const mapDispatchToProps=dispatch=>({
//     delteTask:index=>dispatch({type:'DELETE_TASK',payload:index}),
//     checked: index=>dispatch({type:'CHECKED_TASK',payload:index})
// })


export default connect(mapStateToProps)(VisiblityFilters)