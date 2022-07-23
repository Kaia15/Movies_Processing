import React, { useState, useEffect } from 'react';
import Tasks from './Tasks';
import ReactDOM from 'react-dom';

function Button() {
    const [show, setShow] = useState(false);
    
    return (
        <div>
            <button onClick = {() => setShow(!show)}>Toggle</button>
            {show && <Tasks />}

        </div>
    )
}

export default Button