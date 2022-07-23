import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

/*function Content() {
    
    // useState to launch the initial value of current state, and state setter
    const [title, setTitle] = useState('');
    const [posts, setPosts] = useState([]);
    const [type, setType] = useState('albums');

    const tabs = ['albums', 'posts', 'comments'];

    const changeTitle = (event) => {
        setTitle(event.target.value);
    }

    // useEffect is used to control the events happening while the app is mounting/unmounting, and the side effects of re-rendering the app.
    // useEffect: 1. useEffect(callback)
    //            2. useEffect(callback, [])
    //            3. useEffect(callback, [dependency array])
    
    useEffect(() => {fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then(res => res.json())
        .then(posts => {
            // console.log(albums);
            setPosts(posts);
        })
    }, [type]);

    
    return (
        <div>
            {tabs.map(tab=> (
                <button 
                    style = {type === tab ? {
                        color:'#fff',
                        backgroundColor: '#333'
                    } : {}}
                    onClick = {() => setType(tab)}> {tab} </button>
            ))}

            <input 
                value = {title}
                onChange = {changeTitle}
            />
            
            <ul>
                {posts.map(post => (
                    <li key = {post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    )

    // useEffect with DOM event listener
    
    const [size, setSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleSize = () => {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', handleSize)
        return () => window.removeEventListener('resize', handleSize);
    })

    return (
        <div>
            {size}
        </div>
    )
    
    
    const [order, setOrder] = useState({id: 1});

    const orders = [
        {id : 1, combo: 'blackcoffee_crossaints', price: 8},
        {id : 2, combo: 'orangejuice_bread', price: 9},
        {id: 3, combo: 'icelatte_tiramisu', price: 9}
    ]


    return (
        <div>
            
            {orders.map(ord => 
                <li style = {ord.id === order.id ? {color:'red'} : {}}
                    onClick = {() => setOrder(ord)}>{ord.combo}
                </li>)}
            
        </div>
    )
}*/

/*class Tasks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {newTask: {}, allTasks: []}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleChange({target}) {
        const {name, value} = target;
        this.setState((prev) => 
        ({...prev, newTask : {...prev.newTask, [name]: value}, id: Date.now()})
        )
    }
    handleSubmit() {
        // const {name, value} = target;
        this.setState((prev) => 
        ({allTasks: [prev.newTask, ...prev.allTasks], newTask: {}})
        )
    }
    handleDelete(taskIdremoved) {
        const {name, value} = target;
        this.setState((prev) => 
        ({...prev.allTasks.filter(task => task.id !== taskIdremoved), ...prev.newTask})
        )
    }
    
}*/

function Tasks() {
    const [task, setTask] = useState({});
    const [alltasks, setAlltasks] = useState([]);

    const updateTask = ({target}) => {
        const {name, value} = target;
        setTask((prev) => ({...prev, [name]: value}));
        // setAlltasks((prev) => ([task, ...prev]))
    }

    const addTask = () => {
        setAlltasks((prev) => ([task, ...prev]))
        setTask({});
    }


}

export default Tasks