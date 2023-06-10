import { useContext } from "react";
import { CartDropdownContext } from "../../context/cart.context";
import './checkout.styles.scss';
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
const Checkout = ()=>{
    const {cartItems, addItemToCart, removeItemFromCart,removeItemHandler, cartTotal} = useContext(CartDropdownContext);
    console.log(cartItems);
    return(
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            <h1>This is The checkout page</h1>
            {
                cartItems.map(item=>{
                    return (
                        <CheckoutItem removeItemFromCart={ removeItemFromCart } addItemToCart={addItemToCart} key={item.id} cartItem={item} removeItemHandler={removeItemHandler}/>
                        // <div key={item.id}>
                        //     <h2>{item.name}</h2>
                        //     <span>{item.quantity}</span>
                        //     <br/>
                        //     <span onClick={removeItemFromCart}>decrement</span>
                        //     <br/>
                        //     <span onClick={addItemToCart(item)}>increment</span>
                        // </div>
                    )
                })
            }
            <span className="total">Total: ${cartTotal}</span>
        </div>
    )
}
export default Checkout;