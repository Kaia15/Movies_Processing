import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'

export default function Cart() {
    const [order, setOrder] = useState([]);
    const [product, setProduct] = useState({name: "Breast", quantity: 0});
    const [type, setType] = useState([]);
    const [category, setCategory] = useState("Fresh meat");
    // const [successfulOrder, setSuccessfulOrder] = useState(false);

    const categories = ["Fresh_meat", "Chicken", "Dairy Products", "Carbs", "Grocery", "Others"];
    const products = [  {id: 1, cat: "Fresh_meat", prod: ["Beef", "Pork", "Lamb", "Ham"]},
                        {id: 2, cat: "Chicken", prod: ["Breast", "Wings", "Full", "Fresh"]},
                        {id: 3, cat: "Dairy Products", prod: ["Milk", "Cheese", "Yogurt", "Butter"]},
                        {id: 4, cat: "Carbs", prod: ["Rice", "Noodles", "Cereal"]},
                        {id: 5, cat: "Grocery", prod: ["Carrots", "Potatoes", "Veggies", "Fruits"]},
                        {id: 6, cat: "Others", prod: ["Services", "Contact", "Support"]}                    ]

    /*const addItems = (({target}) => {
        const {b} = target;
        console.log(target);
        setProduct(() => {
            const a = order
            const m = a.filter(ord => ord.name === b)
            console.log(m);
            // let q = 1;
            if (m.length === 0) {
                return {name: b, quantity: 1}
            } else {
                return {name: b, quantity: m[0].quantity + 1}
            }
        
        })
    })*/
                    
    useEffect(() =>{
        for (let i = 0; i < products.length; i++) {
            const prodObj = products[i];
            if (prodObj['cat'] === category) {
                setType(prodObj['prod']);
                break;
            }
        }
    }, [category])

    useEffect(() => {
        setOrder(prev => {
            
            for (let i = 0; i < prev.length; i++) {
                    if (prev[i].name === product.name) {
                        prev.splice(i,1);
                        break
                    }
                }
            /*
            return prev;
            const pr = prev.filter(obj => obj.name === product.name)
            if (pr !== []) {
                const ind = prev.indexOf(pr[0])
                console.log(ind);
                prev[ind] = product
            } else {
                prev = [...prev, product]
            }
            return prev
            */
            return [...prev, product]
            })
        }
    , [product])

    
    // const handleChange = (() => {setOrder()})

    // console.log(category);
    // console.log(type);
    console.log(product);
    console.log(order);

    return (
        <div>
            {categories.map(cate => <button style = {cate === category ? {color: "white", backgroundColor: "black"} : {}} onClick = {() => setCategory(cate)}> {cate} </button>)}
            {type.map(t => <li onClick = {() => {setProduct(() => {
                                    const a = order
                                    const m = a.filter(ord => ord.name === t)
                                    // console.log(m);
                                    // let q = 1;
                                    if (m.length === 0) {
                                        return {name: t, quantity: 1}
                                    } else {
                                        return {name: t, quantity: m[0].quantity + 1}
                                    }
                                
                                })
                            }}> {t} </li>)}
            <button> Order </button>
            {order.length > 0 && order.map((obj,index) => 
                (<ul key = {index}>
                <li> Item: {obj.name} </li>
                <li> Quantity: {obj.quantity} </li>
                </ul>))}
        </div>
    )
}