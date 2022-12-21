import './product-card.styles.scss';
import { useContext } from 'react';
import { CartDropdownContext} from '../../context/cart.context';
import Button from '../button/button.component';
const ProductCard = ({product})=>{
    const {addItemToCart} = useContext(CartDropdownContext);
    const {name,price,imageUrl} = product;
    const addItem= ()=> addItemToCart(product);
    return(
        <div className='product-card-container'>
            <img alt={`${name}`} src={imageUrl}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button onClick={addItem} buttonType='inverted'>Add to Cart</Button>
        </div>
    )
}
export default ProductCard;