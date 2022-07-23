import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from "react-dom";

function Form() {
    
    const storageAccounts = JSON.parse(localStorage.getItem('allAccounts'));

    const [newAccount, setNewAccount] = useState({name: "", age: "", email: "", phoneNumber: ""});
    const [allAccounts, setAllAccounts] = useState(storageAccounts ?? []);
    const [error, setError] = useState({name: null, age: null, email: null, phoneNumber: null})
    const buttonRef = React.useRef()
    
    // const [count, setCount] = useState(0);

    const validation = (type, value) => {
        switch (type) {
        case 'name': 
            if (validateName(value)) 
            {
                setError({...error, name: null}) 
            }
            else setError({...error, name: 'name error'})
            handleSuccess()
            return
        case 'age': 
            if (validateAge(value)) 
                setError({...error, age: null}) 
            else setError({...error, age: 'age error'})
            handleSuccess()
            return
        }
    }

    const validateName = (name) => name.length >= 3

    const validateAge = (age) => (parseInt(age)) > 1 && (parseInt(age)) <= 100 
                                    //  Number.isInteger(parseInt(age));

    const validateEmail = (email) => {
        const emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email.match(emailFormat)
    }

    const validatePhoneNumber = (phoneNumber) => {
        //const phoneFormat = ;
        const regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(phoneNumber.match(regEx))
        {
            return true;
        } else {
            return false;
        }
    }

    // console.log(validateEmail("baotranongtran@gmail.com"));
    // console.log(validatePhoneNumber("740-405-9687"));

    const handleChange = ({target}) => {
        const {name, value} = target;
        setNewAccount((prev) => ({...prev, [name]: value }));
    }

    const handleSubmit = () => {
        if (newAccount.name !== "" && newAccount.email !== "" && newAccount.phoneNumber !== "" && newAccount.age !== "") {
            if (validateEmail(newAccount.email) && validatePhoneNumber(newAccount.phoneNumber) && validateName(newAccount.name) && validateAge(newAccount.age)) {
                setAllAccounts(prev => {
                    const updatedAccs = [...prev, newAccount];
                    
                    return updatedAccs;
                });
                setNewAccount({name: "", age: "", email: "", phoneNumber: ""});
            } else {
                alert("Cannot verify your account. Please check your email and phone number!")
            }
        }
        else {
            alert("Please fulfill your form to sign up!")
        }
        
    }

    const handleSuccess = () => {
        let checked = true
        const types = ['name', 'age', 'email', 'phoneNumber']
        for (let i = 0; i < types.length; i++) {
            if (error[types[i]] !== null || newAccount.types) 
                checked = false
                break
        }
        if (checked) 
            buttonRef.current.disabled = false
        else
            buttonRef.current.disabled = true
    }


    
    console.log(error)

    useEffect(() => {
        const jsonAccs = JSON.stringify(allAccounts);
        localStorage.setItem('allAccounts', jsonAccs);
        console.log("Updated Component!");
    }, [allAccounts])

    useEffect(() => {
        buttonRef.current.disabled = true
    }, [])

    
    return (
        <div>
            {console.log("Render")}
            Name:  <input name = "name" value = {newAccount.name} onChange = {handleChange} onBlur = {({target}) => validation('name', target.value)}/><br />
                    {error.name && <div style = {{color: 'red'}}> {error.name} </div>}
            Age:  <input name = "age" value = {newAccount.age} onChange = {handleChange} onBlur = {({target}) => validation('age', target.value)}/><br />
                    {error.age && <div style = {{color: 'red'}}> {error.age} </div>}
            Email:  <input name = "email" value = {newAccount.email} onChange = {handleChange}/><br />
            Phone Number:  <input name = "phoneNumber" value = {newAccount.phoneNumber} onChange = {handleChange}/>
            
            <button onClick = {handleSubmit} ref = {buttonRef}> Click me </button>
            {allAccounts.length > 0 && 
            <table border = '1'> 
                <thead>
                    <tr> 
                        <th> Name </th>
                        <th> Age </th>
                        <th> Email </th>
                        <th> Phone Number </th>
                    </tr>
                    
                </thead>
                <tbody>
                    {allAccounts.map((item, index) => (<tr key = {index}>
                        <td> {item.name} </td>
                        <td> {item.age} </td>
                        <td> {item.email} </td>
                        <td> {item.phoneNumber} </td>
                    </tr>))
                    }
                </tbody>
            </table>}
        </div>
    )
}

export default Form