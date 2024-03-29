import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { addToCart, removeFromCart, deleteProduct } from '@/features/cartSlice'
import { useState } from 'react';
import Popup from './Popup';

const CartBar = ({ user, product, cartQuantity }) => {

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [ status, setStatus ] = useState(false)

    const handleCloseCart = () => {
        let cartbar = document.querySelector('.cart-bar');
        let cartbox = document.querySelector('.cart-box');
        let cartwrapper = document.querySelector('.cart-wrapper');
        cartwrapper.style.opacity = '0';
        setTimeout(()=>{
            cartbox.style.width = "0";
            cartbar.style.width = '0';
        },250)
    }

    return (
        <>
            <aside className="cart-box">
                <div className="cart-bar">
                    <div className="h-100 cart-wrapper pb-5 flex-column justify-content-between align-items-lg-stretch">
                        <header className="mx-4 pt-2 d-flex justify-content-between align-items-center" style={{height: '10%'}}>
                            <h4 className="my-0" style={{color: '#3c0000'}}>CART({cart.items.length})</h4>
                            <p className="text-end" />
                            <button className="btn btn-lg cart-close" type="button" onClick={handleCloseCart}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="me-1 d-none">
                                    <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>X&nbsp;
                            </button>
                        </header>
                        <section className="pb-5 overflow-auto" style={{height: '70%'}}>
                            <div>
                                {cart.items.length > 0 ? cart.items.map((item, index) => <div className="d-flex mx-4 mt-5"key={item.id}>
                                    <div className="h-100 pe-3">
                                        <Image src={item.images.split(',')[0]} style={{objectFit: 'cover'}} width={70} height={70} alt="cart_image" />
                                    </div>
                                    <div>
                                        <h6 className="mb-0 cart-price">
                                            <span className="text_small fake">${item.price*item.cartQuantity}</span>
                                            <span className="text_small real ms-2">${(item.price*item.cartQuantity*0.8).toFixed(2)}</span>
                                        </h6>
                                        <p className="my-2">
                                            <Link className="cart-title" href={`/product/${item.slug}`}>${item.title}</Link>
                                        </p>
                                        <div className="d-flex">
                                            <button className="btn btn-danger btn-sm" type="button" onClick={() => dispatch(deleteProduct(item))}>Remove</button>
                                            <div className="d-flex justify-content-center align-items-center ms-4">
                                                <button className="btn btn-dark btn-sm px-3" type="button" onClick={() => dispatch(removeFromCart(item))}>-</button>
                                                <input className="form-control-sm cart-input" type="text" minLength={0} maxLength={item.quantity} required value={item.cartQuantity} readOnly />
                                                <button className="btn btn-success btn-sm px-3" type="button"  onClick={() => dispatch(addToCart(item))}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>): <h3 className='text-center' style={{marginTop: "200px"}}>
                                    <p>Cart is empty</p>
                                    <Link className="btn btn-sm btn-success btn-lg" href="/shop">start shopping</Link>
                                </h3> }
                            </div>
                        </section>
                        <section style={{height: '20%'}}>
                            <div className="mx-4">
                                <h5 className="fw-bolder text-end" style={{color: '#3c0000'}}>Sub-total : ${(cart.amount*0.8).toFixed(2)}</h5>
                                <div>
                                    {cart.items.length < 1 ? <button className="btn btn-success w-100" role="button" type='button' disabled>Checkout now!</button> : <button className="btn btn-success w-100" role="button" type='button' onClick={() => {
                                        handleCloseCart()
                                        setTimeout(() => {
                                            setStatus(true)
                                        }, 500)
                                        }
                                    }>Checkout now!</button>}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </aside>
            <Popup status={status} handleHide={() => setStatus(false)} user={user} product={product} cartQuantity={cartQuantity} bulk={true} />
        </>
    )
}

export default CartBar