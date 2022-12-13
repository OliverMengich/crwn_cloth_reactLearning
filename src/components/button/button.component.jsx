import './button.styles.scss';
//  inverted button, default button, google sign in button
const BUTTON_TYPES_CLASSES={
    google: 'google-sign-in',
    inverted: 'inverted'
}
const Button = ({children, buttonType,...otherProps})=>{
    return(
        <div className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </div>
    )
}
export default Button;