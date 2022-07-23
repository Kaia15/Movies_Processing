import React, { useState } from "react";

export default function Test() {
    const [count, setCount] = useState(0);
    React.useEffect(() => {
        alert("Component did mount!")
    }, []);

    React.useEffect(() => {
        alert("Component will mount!")
    });

    React.useEffect(() => {
        alert("Component did update!")
    }, [count]);

    return (
        <div>
            <p> My count is {count} </p>
            <button onClick={() => setCount(prev => prev + 1)}> Click me! </button>
        </div>
    )
}
