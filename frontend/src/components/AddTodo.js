import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListIcon from '@material-ui/icons/List';
import TodayIcon from '@material-ui/icons/Today';
import { useForm } from 'react-hook-form'
import secureAxios from './AxiosConfig/SecureAxios'

const style = {
    common: {
        padding: '10px'
    }
}

function AddTodo(props) {

    const { register, errors, handleSubmit } = useForm()
    const { addTodoList, todolist } = props
    const onSubmission = e => {
        
        // date < new Date() ? due=true: due=false
        e.preventDefault()
        const date = new Date(`${e.target['date'].value} 00:00`)
        
    
        var TodoObj = JSON.stringify({
            task: e.target['task'].value,
            description: e.target['description'].value,
            date: date.toString(),
            checked: false
});


        secureAxios({
            method: 'post',
            url: 'todo/',
            data: TodoObj
        }).then(res => { addTodoList(res.data); console.log(JSON.stringify(res.data)) }).catch(err => console.log("Something Went Wrong", err))
        console.log(date)

    }
   
    console.log(todolist)
    return (
        <div style={{ background: '#eda005' }}>

            <form onSubmit={(e) => handleSubmit(onSubmission(e))}>
                {/* <form onSubmit={handleSubmit(onSubmission)}> */}
                <div style={style.common} >
                    <label> Task <AssignmentIcon /> :</label>
                    <input type='text' name='task' placeholder='Task' ref={register({ required: { value: true, message: 'please Enter Task' } })} />
                    {errors.task && (<span style={{ color: 'red' }}> {errors.task.message}</span>)}
                </div>
                <div style={style.common}>
                    <label> Description <ListIcon /> :</label>
                    <input type='text' name='description' placeholder='description' ref={register({ required: { value: true, message: 'please Enter Description' } })} />
                    {errors.description && (<span style={{ color: 'red' }}> {errors.description.message}</span>)}
                </div>
                <div style={style.common}>
                    <label>Date <TodayIcon />:</label>
                    <input type='date' name='date' ref={register({ required: { value: true, message: 'please Select Date' } })} />
                    {errors.date && (<span style={{ color: 'red' }}> {errors.date.message}</span>)}
                </div>
                <div style={style.common}>
                    <Button variant="contained" color="default" color="primary" startIcon={<AddIcon />} type='submit'> Add </Button>

                </div>
            </form>
        </div>
    )
}
const mapStateToProps = state => ({ todolist: state.listOfTodo })

const mapDispatchToProps = dispatch => ({
    addTodoList: val => dispatch({ type: 'ADD_TODO', payload: val })
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)