import './categories-preview.styles.scss';
import { useContext, Fragment } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';
const CategoriesPreview = ()=>{
    const { categoriesMap } = useContext(CategoriesContext);
    return(
        <div className='categories-preview-container'>
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
export default CategoriesPreview;