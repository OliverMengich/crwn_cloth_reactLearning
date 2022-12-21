import { useContext } from "react";
import { CartDropdownContext } from "../../context/cart.context";
const Checkout = ()=>{
    const {cartItems} = useContext(CartDropdownContext);
    return(
        <div>
            {
                cartItems.map(item=>{
                    return (
                    <div>
                        <h1>item.name</h1>
                    </div>)
                })
            }
        </div>
    )
}
export default Checkout;