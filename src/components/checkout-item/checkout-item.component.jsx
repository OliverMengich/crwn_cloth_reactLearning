import './checkout-utem.styles.scss';
const CheckoutItem = ({cartItem,removeItemHandler, removeItemFromCart, addItemToCart})=>{
    const { name, imageUrl, price, quantity} = cartItem;
    const increaseItemHandler = ()=> addItemToCart(cartItem);
    const reduceItemHandler = ()=> removeItemFromCart(cartItem)
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={reduceItemHandler} className='arrow'>&#10095;</div>
                <span className='value'>{quantity}</span>
                <div onClick={increaseItemHandler} className='arrow'>&#10094;</div>
            </span>
            <span className='price'>{price}</span>
            <span onClick={removeItemHandler} className='remove-button'>&#10005;</span>
        </div>
    )
}
export default CheckoutItem;