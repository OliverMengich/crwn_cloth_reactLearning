import { createContext, useState,useEffect } from "react";
const addCartItem = (cartItems,productToAdd)=>{
    //find if cartItems contains productToAdd.
    const existingCartItem = cartItems.find(cartItem=>cartItem.id===productToAdd.id);
    //if found, increment quanntity
    if (existingCartItem) {
        return cartItems.map(item=>item.id===productToAdd.id ? {...item,quantity:item.quantity+1}: item);
    }
    //return new array with modified cartItems/
    return [...cartItems,{...productToAdd,quantity:1}]
    
    // return cartItems;
}

const removeCartItem = (cartItems, cartItemToRemove)=>{
    //find the cart item
    const existingCartItem = cartItems.find(cartItem=>cartItem.id===cartItemToRemove.id);
    //check if quantity is equal to 1, 
    //if it is, remove iem from cart
    if (existingCartItem.quantity ===1) {
        return cartItems.filter(cartItem=>cartItem.id !== cartItemToRemove.id);
    }else{
        //if it isn't return back cart items with matching cart items but reduced quantity
        return cartItems.map(item=>item.id===cartItemToRemove.id ? {...item , quantity:item.quantity-1}: item);
    }
}
const clearCartItem = (cartItems, cartItemToRemove)=>(cartItems.filter(cartItem=>cartItem.id !== cartItemToRemove.id))
export const CartDropdownContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    removeItemHandler: ()=>{},
    cartCount: 0,
    cartTotal: 0,
})
export const CartDropdownProvider = ({children})=>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const [cartTotal,setCartTotal] = useState(0);
    const addItemToCart = (productToAdd)=>{
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const removeItemFromCart = (cartItemToRemove) =>{
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }
    const removeItemHandler = (cartItemToClear)=>{
        console.log('Item to clear',cartItemToClear)
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }
    useEffect(()=>{
        
        const newCartCount = cartItems.reduce((acc,item)=>{
            acc += item.quantity
            return acc;
        },0)
        setCartCount(newCartCount)
    },[cartItems])
    useEffect(()=>{
        const newCartTotal = cartItems.reduce((acc,item)=>{
            acc += item.quantity * item.price
            return acc;
        },0)
        setCartTotal(newCartTotal)
    },[cartItems])
    const value = {isCartOpen, setIsCartOpen, addItemToCart,removeItemFromCart, removeItemHandler, cartItems, cartCount, cartTotal}
    return(<CartDropdownContext.Provider value={value}>
        {children}
    </CartDropdownContext.Provider>)
}