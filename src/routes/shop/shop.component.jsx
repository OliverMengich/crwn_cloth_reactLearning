import { useContext, Fragment } from 'react';
import { CategoriesContext } from '../../context/categories.context';
// import ProductCard from '../../components/product-card/product-card.component';
import CategoryPreview from '../../components/category-preview/category-preview.component'
import './shop.styles.scss';
const Shop = ()=>{
    const { categoriesMap } = useContext(CategoriesContext);
    return(
        <div className='shop-container'>
            {
                Object.keys(categoriesMap).map(title=>{
                    const products = categoriesMap[title];
                    return ( <CategoryPreview key={title} title={title} products={products} /> )
                    // <Fragment key={title}>
                    //     <h2>{title} &#rarr;</h2>
                    //     <div className='products-container'>
                    //         {
                    //             products.map((product)=>(<CategoryPreview key={product.id} product={product}/>))
                    //         }
                    //     </div>
                    // </Fragment>
                })
            }
        </div>
    )
};
export default Shop;