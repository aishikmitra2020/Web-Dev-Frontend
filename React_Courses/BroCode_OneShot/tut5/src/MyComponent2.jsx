// onChange --> event handler used primarilly with form elements
//              ex- <input>, <textarea>, <select>, <radio>
//              Triggers a function every time the value of the input changes

import { useState } from "react";

function MyComponent2(){
    const [name, setName] = useState("Guest"); // Setting the initial value
    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState("");
    const [payment, setPayment] = useState("");
    const [shipping, setShipping] = useState("Delivery");

    function handleNameChange(event){
        setName(event.target.value)
    }

    function handleQuantityChange(event){
        setQuantity(event.target.value)
    }

    function handleCommentChange(event){
        setComment(event.target.value)
    }

    function handlePaymentChange(event){
        setPayment(event.target.value);
    }

    function handleShippingChange(event){
        // console.log(event.target.value)
        setShipping(event.target.value);
    }

    return(
        <div style={{"marginTop":"15px"}}>
            {/* When the state (or props) changes, React re-renders the component and updates the UI accordingly. If there is no onChange handler, the state does not update when the user types, so the UI remains the same. So, useState hook determines the value of the input field */}
            {/* only change in state (or props) initiates a re-render but without using onChanfge with useState hook it doesn't change the state and it doesn't initiate a re-render to update the value in the Virtual DOM */}
            <input value={name} onChange={handleNameChange} type="text" />
            <p>Name: {name}</p>

            <input value={quantity} onChange={handleQuantityChange} type="number" />
            <p>Quantity: {quantity}</p>

            <textarea value={comment} onChange={handleCommentChange} placeholder="Enter delivery instructions"></textarea>
            <p>Comment: {comment}</p>

            <select value={payment} onChange={handlePaymentChange}>
                <option value="">Select an option</option>
                <option value="Visa">Visa</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Platinum Card">Platinum Card</option>
                <option value="Giftcard">Giftcard</option>
                <option value="American Express">American Express</option>
            </select>
            <p>Payment: {payment}</p>

            <label>
                <input type="radio" value="Pick Up" checked={shipping === "Pick Up"} onChange={handleShippingChange} />
                Pickup
            </label>
            <br/>
            <label>
            <input type="radio" value="Delivery" checked={shipping === "Delivery"} onChange={handleShippingChange} />
                Delivery
            </label>
            <p>Shipping: {shipping}</p>
        </div>
    );
}

export default MyComponent2