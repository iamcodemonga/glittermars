// import Cartbar from '@/components/Cartbar';
import CartBar from '@/components/Cartbar';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/Searchbar';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { initializeCart } from '@/features/cartSlice';
import axios from 'axios';

const Account = ({ user, orders }) => {

    const dispatch = useDispatch();
    const [ limit, setLimit ] = useState(6);

    const handleMore = () => {
        setLimit((prev) => prev+3)
    }

    useEffect(() => {
        dispatch(initializeCart())
    },[])

    return (
        <>
            <SearchBar />
            <CartBar user={user} product={null} cartQuantity={0} />
            <Navbar user={user} />
            <section className="mt-5 pt-5">
                <div className="container mt-5 pt-5">
                    <h1 className="mb-3 text-accent">{user.fullname},</h1>
                    <p>{user.email}</p>
                </div>
            </section>
            <section id="orders" className="pb-5">
                <div className={orders.length > 0 ? "container" : "container d-none"}>
                    <h4 className="mb-0 fw-bolder">Your Orders</h4>
                    <div className="row gx-4 gy-4 mt-3">
                        { orders && orders.slice(0, limit).map((order, index) => <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4" key={index}>
                            <div className="card product-card-grid">
                            <div className="position-relative">
                                {order.pending == 0 ? <button className="btn btn-danger btn-sm disabled position-absolute" type="button" style={{right: 0}} disabled>Pending</button> : <button className="btn btn-success btn-sm disabled position-absolute" type="button" style={{right: 0}} disabled>Done</button>}
                                <Link href={order.quantity > 1 ? `/product/${order._id}` : "#"}>
                                <Image className="img-fluid" src={order.images.split(',')[0]} style={{aspectRatio: '5/4', objectFit: 'cover'}} width={700} height={500} alt="order_image" />
                                </Link>
                            </div>
                            <div className="card-body px-0">
                                <div className="mb-2">
                                <span className="text-success fw-bold text_small">${(order.price)}</span>
                                    <span className="text-success fw-bold ms-2 text_small">
                                    <span>(Qty: {order.order_quantity})</span>
                                    </span>
                                </div>
                                <Link className="product-title" href={order.quantity > 1 ? `/product/${order._id}`: "#"}>
                                    <h5 className="my-0">{order.title}</h5>
                                </Link>
                            </div>
                            </div>
                        </div>)}
                    </div>
                    <p className="text-center mt-4"><button className="btn btn-dark btn-special border-0" type="button" onClick={handleMore}>More Orders</button></p>
                </div>
                <div className={orders.length > 0 ? "container d-none" : "container"}>
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

export async function getServerSideProps(context) {
    
    const { req } = context;
    const { cookie } = req.headers;
    const URL = process.env.API_ROOT;

    try {
        const user = await axios(`${process.env.CLIENT_ROOT}/api/user`, { headers: { cookie: cookie || '' } });
        const orders = await axios(`${URL}/user/orders/${user.data._id}`);
        if (!user.data){
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        } else {
            return {
                props: { user: user.data, orders: orders.data.orders }
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export default Account