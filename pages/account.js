import CartBar from '@/components/Cartbar';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/Searchbar';
import Link from 'next/link';
import Image from 'next/image';
import { bestProducts } from '@/components/JsonData';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/features/authSlice';
import { useRouter } from 'next/router';

const Account = () => {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth)
    const router = useRouter();

    useEffect(() => {
        if(!localStorage.getItem('id')) {
            router.push('/');
            return;
        }
        dispatch(fetchUser())
    },[])

    return (
        <>
            <SearchBar />
            <CartBar />
            <Navbar />
            <section className="mt-5 pt-5">
                <div className="container mt-5 pt-5">
                    {auth.loading ? <h1 className="mb-3 text-accent">_ _ _ _ _ _ _ _ _ _ _,</h1> : <h1 className="mb-3 text-accent">{auth.user.fullname},</h1>}
                    {auth.loading ? <h1 className="mb-3 text-accent">_ _ _ _ _ _ _ _ _ _,</h1> : <p>{auth.user.email}</p>}
                </div>
            </section>
            <section id="orders" className="pb-5">
                <div className="container d-non">
                    <h4 className="mb-0 fw-bolder">Your Orders</h4>
                    <div className="row gx-4 gy-4 mt-3">
                        { bestProducts && bestProducts.map((product, index) => <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4" key={index}>
                            <div className="card product-card-grid">
                            <div className="position-relative">
                                {!product.instock && <button className="btn btn-danger btn-sm disabled position-absolute" type="button" style={{right: 0}} disabled>sold out</button>}
                                <Link href={product.instock ? "/product" : "#"}>
                                <Image className="img-fluid" src={product.image} style={{aspectRatio: '5/4', objectFit: 'cover'}} width={500} height={400} />
                                </Link>
                            </div>
                            <div className="card-body px-0">
                                <div className="mb-2">
                                <span className="text-success fw-bold text_small">${product.price*0.8}</span>
                                    <span className="text-danger fw-bold ms-2 text_small">
                                    <span style={{textDecoration: 'line-through'}}>${product.price}</span>
                                    </span>
                                </div>
                                <Link className="product-title" href={product.instock ? "/product" : "#"}>
                                    <h5 className="my-0">{product.title}</h5>
                                </Link>
                                <button className="btn btn-dark mt-3 w-100 btn-special" type="button">Add to Cart</button>
                            </div>
                            </div>
                        </div>)}
                    </div>
                    <p className="text-center mt-4"><button className="btn btn-dark btn-special border-0" type="button">More Orders</button></p>
                </div>
                <div className="container d-none">
                    <h4 className="mb-0 fw-bolder">Your Orders</h4>
                    <div className="vh-50 w-100 d-flex justify-content-center align-items-center nothing mt-3 mb-5">
                    <div>
                        <h5>You have not ordered anything yet!</h5>
                        <p className="text-center"><a className="btn btn-dark btn-sm btn-special" role="button" href="/shop">Start Shopping</a></p>
                    </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Account