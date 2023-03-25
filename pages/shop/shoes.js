import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import Navbar from 'components/Navbar';
import Cartbar from '@/components/Cartbar';
import SearchBar from '@/components/Searchbar';
import Banner from 'components/banners/ShopBanner'
import Footer from 'components/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/features/authSlice';
import { initializeCart, addToCart } from '@/features/cartSlice';

const Category = ({ allProducts, user }) => {

    const URL = process.env.NEXT_PUBLIC_API_ROOT;
    const router = useRouter();
    const dispatch = useDispatch();
    const [ products, setProducts ] = useState(allProducts);
    const [ limit, setLimit ] = useState(6)
    const [ price, setPrice ] = useState({ min: 0, max: 0 })
    const [ sort, setSort ] = useState('date')

    useEffect(() => {
        dispatch(initializeCart())
    })

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        return;
    }

    const handleMore = async() => {
        setLimit((prev) => prev+3);
    }
    
    const handlePriceFilter = async(e) => {
        e.preventDefault();

        if(!price.min || !price.max) {
            console.log('put something');
            return;
        }

        if (price.max == 0){
            console.log('you like free things');
            return;
        }

        if (Math.floor(price.max) < price.min) {
            console.log('minimum price cannot be greater than maximum price');
            return;
        }

        const { data } = await axios(`${URL}/products/category/shoes?min=${price.min}&max=${price.max}`);
        // console.log(data)
        router.push(`?min=${price.min}&max=${price.max}`, undefined, { shallow: true })
        setProducts(data.product)
        return data;
        
    }

    return (
        <>
            <SearchBar />
            <Cartbar user={user} product={null} cartQuantity={0} />
            <Navbar user={user} />
            <Banner />
            <section className="py-5">
                <div className="container">
                    <div className="row gx-3">
                        <div className="col-lg-3 col-xl-3 col-xxl-3 d-none d-lg-block">
                            <div>
                                <div className="shop-cartigory">
                                    <h3>Categories</h3>
                                    <p><Link href="/shop">All Products</Link></p>
                                    <p><Link href="/shop/clothing">Clothing</Link></p>
                                    <p><Link href="/shop/jewelries">Jewelries</Link></p>
                                    <p><Link href="/shop/shoes" className="active">Shoes</Link></p>
                                    <p><Link href="/shop/accessories">Accessories</Link></p>
                                </div>
                                <div>
                                    <h3>Pricing</h3>
                                    <div className="price-filter">
                                        <form onSubmit={handlePriceFilter}>
                                            <label className="form-label">Minimum price($)
                                                <input className="form-control border-0" type="number" placeholder="add minimum price" value={price.min} onChange={(e) => setPrice((prev) => { return {...prev, min: e.target.value} })} />
                                            </label>
                                            <label className="form-label mb-3">Maximum price($)
                                                <input className="form-control border-0" type="number" placeholder="add maximum price" value={price.max} onChange={(e) => setPrice((prev) => { return {...prev, max: e.target.value} })} />
                                            </label>
                                            <button className="btn btn-dark btn-special w-100" type="submit">Filter</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-9 col-xl-9 col-xxl-9">
                            <div className="w-100 d-flex justify-content-end mb-2 mt-lg-5">
                                <div className="mb-0">
                                    <select className="form-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                                        <option value="none">sort by</option>
                                        <option value="date">date</option>
                                        <option value="trending">trending</option>
                                        <option value="best-selling">best-selling</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row gx-4 gy-4">
                                {products && products.slice(0,limit).map((product, index) => <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4" key={index}>
                                    <div className="card product-card-grid">
                                        <div className="position-relative">
                                            {product.quantity < 1 && <button className="btn btn-danger btn-sm disabled position-absolute" type="button" style={{right: 0}} disabled>sold out</button>}
                                            <Link href={product.quantity > 0 ? `/product/${product._id}` : "#"}>
                                            <Image className="img-fluid" src={product.images.split(',')[0]} style={{aspectRatio: '5/4', objectFit: 'cover'}} width={700} height={400} alt={product.title} />
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
                            { products.length > 6 && <p className="mt-4 text-center"><button className="btn btn-dark btn-special" type="button" onClick={handleMore}>Load more</button></p>}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {

    const URL = process.env.API_ROOT;
    const { req, query } = context;
    const { cookie } = req.headers;
    const { min, max } = query;
    let queryString = '';
    const queryRegex = /^([a-zA-Z ]+)$/;

    if (min != undefined && max != undefined){
        if (!queryRegex.test(min) && !queryRegex.test(max)) {
            queryString = `?min=${min}&max=${max}`;
        }
    }

    try {
        const { data } = await axios(`${URL}/products/category/shoes${queryString}`);
        const user = await axios(`${URL}/user/`, { headers: { cookie: cookie || '' } } );
        if (!data.error){
            return {
                props: { allProducts: data.product, user: user.data }
            }
        } else {
            return {
                props: { allProducts: [], user: user.data }
            }
        }
    } catch (error) {
        console.log(error)
    }
    
}

export default Category