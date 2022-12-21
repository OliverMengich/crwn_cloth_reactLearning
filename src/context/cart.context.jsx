import { createContext, useState,useEffect } from "react";
const addCartItem = (cartItems,productToAdd)=>{
    //find if cartItems contains productToAdd.
    const existingCartItem = cartItems.filter(cartItem=>cartItem.id===productToAdd.id);
    //if found, increment quanntity
    if (existingCartItem) {
        return cartItems.map(item=>item.id===productToAdd.id ? {...item,quantity:item.quantity+1}: item);
        // return [...cartItems, {...existingCartItem, quantity: existingCartItem[0].quantity+=1}]
    }
        //return new array with modified cartItems/
        return [...cartItems,{...productToAdd,quantity:1}]
        // return [...cartItems, {...productToAdd, quantity:1}]
    
    // return cartItems;
}
export const CartDropdownContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    cartCount: 0
})
export const CartDropdownProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    useEffect(()=>{
        console.log(cartItems)
        const newCartCount = cartItems.reduce((acc,item)=>{
            acc += item.quantity
            return acc;
        },0)
        setCartCount(newCartCount)
    },[cartItems])
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount}
    return(<CartDropdownContext.Provider value={value}>
        {children}
    </CartDropdownContext.Provider>)
}