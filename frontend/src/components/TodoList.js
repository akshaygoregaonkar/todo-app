import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import secureAxios from '../components/AxiosConfig/SecureAxios'


function TodoList(props) {
    console.log(props.listOfTodo)


    const { listOfTodo, delteTask, checked, username } = props


    const DeleteItem = id => {

        let index = -1
        listOfTodo.find((item, ind) => {
            if (item.id == id) {
                index = ind
                return true
            }
        })
        delteTask(index)
        secureAxios({
            method: 'delete',
            url: `todo/${id}/`
        }).then(res => console.log("Deleted Sucessfully")).catch(err => console.log("Something Went Wrong", err))
    }
    const handleChecked = id => {
        let index = -1
        let check = false
        let is_duePass = false
        listOfTodo.find((item, ind) => {
            if (item.id == id) {
                index = ind
                if (!item.checked) {
                    check = true
                }

                return true
            }
        })
        checked(index)
        secureAxios({
            method: 'put',
            url: `todo/${id}/`,
            data: JSON.stringify({
                checked: check
            })

        }).then(res => console.log("Deleted Sucessfully")).catch(err => console.log("Something Went Wrong", err))


    }




    return (
        <div style={{ textAlign: 'center', background: '#99e810' }}>
            <div><h1>List Of Todo</h1></div>
            <div style={{ textAlign: 'left' }}>
                <h2> <EmailIcon />:{username}</h2>
            </div>



            {listOfTodo &&
                <div style={{ border: '2px solid black', padding: '10px' }}>


                    {listOfTodo.map((item, index) =><li style={{ padding: '10px' },
                            new Date(listOfTodo[index].date) < new Date() ? { border: '5px solid yellow', padding: '5px' } : {}
                        } key={index}>
                            <input type="checkbox" checked={item.checked} onChange={() => { handleChecked(item.id) }} />  <span style={item.checked ? { textDecorationLine: "line-through" } : {}}> {`Task Name: ${item.task}, Details: ${item.description}, planned completion: ${item.date}`}</span>

                            <Button onClick={() => DeleteItem(item.id)} variant="contained" color="primary" type='submit'><DeleteIcon />  </Button>
   
                         {new Date(listOfTodo[index].date) < new Date() ? <div style={{ color: 'red' }}> Due day is passed</div>  : <></>}
                    
                        </li>
                    )}

                </div>}

        </div>
    )
}


const mapStateToProps = state => ({
    listOfTodo: state.listOfTodo
    , username: state.authentication.username
})
const mapDispatchToProps = dispatch => ({
    delteTask: index => dispatch({ type: 'DELETE_TASK', payload: index }),
    checked: index => dispatch({ type: 'CHECKED_TASK', payload: index })
})


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)