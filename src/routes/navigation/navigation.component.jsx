import { Fragment, useContext } from "react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../context/user.context";
import { CartDropdownContext } from "../../context/cart.context";
import { Link, Outlet } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import './navigation.style.scss';
const Navigation = ()=>{
    const { currentUser } = useContext(UserContext);
    const {isCartOpen} = useContext(CartDropdownContext);
    console.log(currentUser ? 'Current user is': 'Current user is not');
    
	return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">SHOP</Link>
                    {
                        currentUser ? (
                            <span className="nav-link" onClick={signOutUser}>{' '}SIGN OUT {' '}</span>
                        ): (<Link className="nav-link" to="/auth">SIGN IN</Link>)
                    }
                    <CartIcon/>
                </div>
            </div>
            {/* components are all truthy values because they are functions  */}
            { isCartOpen &&(<CartDropdown/>) }
            <Outlet/>		
        </Fragment>
    )
}
export default Navigation;