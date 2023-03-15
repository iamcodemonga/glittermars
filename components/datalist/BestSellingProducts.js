import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cartSlice';

const BestSellingProducts = ({ bestProducts }) => {

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        return;
    }

    return (
      <section id="bestSelling" className="my-5">
        <div className="container product-grid pb-4">
          <h2 className="mb-4">Best Selling Products</h2>
          <div className="row gx-4 gy-4">
            { bestProducts && bestProducts.slice(0, 6).map((product, index) => <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4" key={index}>
              <div className="card product-card-grid">
                <div className="position-relative">
                  {product.quantity == 0 && <button className="btn btn-danger btn-sm disabled position-absolute" type="button" style={{right: 0}} disabled>sold out</button>}
                  <Link href={product.quantity > 1 ? `/product/${product._id}` : ""} passHref>
                    <Image className="img-fluid" src={product.images.split(',')[0]} style={{aspectRatio: '5/4', objectFit: 'cover'}} width={700} height={500} />
                  </Link>
                </div>
                <div className="card-body px-0">
                  <div className="mb-2">
                    <span className="text-success fw-bold text_small">${(product.price*0.8).toFixed(2)}</span>
                      <span className="text-danger fw-bold ms-2 text_small">
                        <span style={{textDecoration: 'line-through'}}>${product.price}</span>
                      </span>
                    </div>
                    <Link className="product-title" href={product.quantity > 0 ? `/product/${product._id}` : "#"}>
                      <h5 className="my-0">{product.title.length < 40 ? `${product.title.substring(0, 45)}` : `${product.title.substring(0, 45)}...`}</h5>
                    </Link>
                    <button className="btn btn-dark mt-3 w-100 btn-special" type="button" onClick={(e) => handleAddToCart(product)}>Add to Cart</button>
                </div>
              </div>
            </div>)}
          </div>
        </div>
      </section>
    )
}

export default BestSellingProducts