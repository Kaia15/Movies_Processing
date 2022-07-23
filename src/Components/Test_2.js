import React, { useEffect, useReducer, useRef } from 'react';

const initialState = {
    job: "",
    jobs: []
}

const SET_JOB = "set_job";
const ADD_JOB = "add_job";
const DELETE_JOB = "delete_job";

const setJob = payload => {
    return {
        type: SET_JOB,
        payload
    }
}

const addJob = payload => {
    return {
        type: ADD_JOB,
        payload
    }
}

const deleteJob = payload => {
    return {
        type: ADD_JOB,
        payload
    }
}

// console.log(setJob("Do your housework!"))

const reducer = (state, action) => {
    console.log("Action: ", action);
    console.log("Prev state: ", state)
    let newState;
    switch(action.type) {
        case SET_JOB:
            newState = {
                ...state,
                job: action.payload
            }
            break
        case ADD_JOB:
            newState = {
                ...state,
                jobs: [...state.jobs, action.payload]
            }
            break
        case DELETE_JOB:
            const newJobs = [...state.jobs];
            newJobs.splice(action.payload, 1);
            newState = {
                ...state,
                jobs: newJobs
            }
            break
        default:
            throw new Error ("Please check your input!")
    }

    console.log("New State: ", newState);
    return newState
}

export default function MemoTest() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {job, jobs} = state;
    // console.log(state);

    const handleSubmit = () => {
        dispatch(addJob(job))
        dispatch(setJob(""))
    }

    const handleDelete = () => {
        dispatch(deleteJob(job))
    }

    return (
        <div style = {{}}>
            <input
                value = {job}
                placeholder = "Enter your task today"
                onChange = {e => dispatch(setJob(e.target.value))}
            />
            <button onClick = {handleSubmit}> Add </button>
            <ul>
                {jobs.map((job, index) => (
                    <li key = {index}> {job} </li>
                ))}
            </ul>
        </div>
    )
    

}

/*const [count, setCount] = React.useState(0);

    const a = React.useMemo(() => 
        setCount(count + 1)
    ,[]);
    const b = React.useEffect(() => 
        setCount(count + 1)
    , [])
    
    return (
        <div>
            <p> My count is {count} </p>
            <button onClick = {a}> Click me! </button>
            
            {console.log('abcd')}
        </div>
    )*/