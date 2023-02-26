import Link from 'next/link';

const CartBar = () => {

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
        <aside className="cart-box">
            <div className="cart-bar">
                <div className="h-100 cart-wrapper pb-5 flex-column justify-content-between align-items-lg-stretch">
                    <header className="mx-4 pt-2 d-flex justify-content-between align-items-center" style={{height: '10%'}}>
                        <h4 className="my-0" style={{color: '#3c0000'}}>CART(5)</h4>
                        <p className="text-end" />
                        <button className="btn btn-lg cart-close" type="button" onClick={handleCloseCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="me-1 d-none">
                                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>X&nbsp;
                        </button>
                    </header>
                    <section className="pb-5 overflow-auto" style={{height: '70%'}}>
                        <div>
                            <div className="d-flex mx-4 mt-5">
                                <div className="h-100 pe-3">
                                    <img src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width="70px" />
                                </div>
                                <div>
                                    <h6 className="mb-0 cart-price">
                                        <span className="text_small fake">$248.35</span>
                                        <span className="text_small real ms-2">$164.27</span>
                                    </h6>
                                    <p className="my-2">
                                        <Link className="cart-title" href="/product/1">This is the product you wanna buy from us</Link>
                                    </p>
                                    <div className="d-flex">
                                        <button className="btn btn-danger btn-sm" type="button">Remove</button>
                                        <div className="d-flex justify-content-center align-items-center ms-4">
                                            <button className="btn btn-dark btn-sm px-3" type="button">-</button>
                                            <input className="form-control-sm cart-input" type="text" minLength={0} maxLength={100} required defaultValue={0} />
                                            <button className="btn btn-success btn-sm px-3" type="button">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mx-4 mt-5">
                                <div className="h-100 pe-3">
                                    <img src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width="70px" />
                                </div>
                                <div>
                                    <h6 className="mb-0 cart-price">
                                        <span className="text_small fake">$248.35</span>
                                        <span className="text_small real ms-2">$164.27</span>
                                    </h6>
                                    <p className="my-2">
                                        <Link className="cart-title" href="/product/1">This is the product you wanna buy from us</Link>
                                    </p>
                                    <div className="d-flex">
                                        <button className="btn btn-danger btn-sm" type="button">Remove</button>
                                        <div className="d-flex justify-content-center align-items-center ms-4">
                                            <button className="btn btn-dark btn-sm px-3" type="button">-</button>
                                            <input className="form-control-sm cart-input" type="text" minLength={0} maxLength={100} required defaultValue={0} />
                                            <button className="btn btn-success btn-sm px-3" type="button">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex mx-4 mt-5">
                                <div className="h-100 pe-3">
                                    <img src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width="70px" />
                                </div>
                                <div>
                                    <h6 className="mb-0 cart-price">
                                        <span className="text_small fake">$248.35</span>
                                        <span className="text_small real ms-2">$164.27</span>
                                    </h6>
                                    <p className="my-2">
                                        <Link className="cart-title" href="/product/1">This is the product you wanna buy from us</Link>
                                    </p>
                                    <div className="d-flex">
                                        <button className="btn btn-danger btn-sm" type="button">Remove</button>
                                        <div className="d-flex justify-content-center align-items-center ms-4">
                                            <button className="btn btn-dark btn-sm px-3" type="button">-</button>
                                            <input className="form-control-sm cart-input" type="text" minLength={0} maxLength={100} required defaultValue={0} />
                                            <button className="btn btn-success btn-sm px-3" type="button">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section style={{height: '20%'}}>
                        <div className="mx-4">
                            <h5 className="fw-bolder text-end" style={{color: '#3c0000'}}>Sub-total : $1259.00</h5>
                            <div>
                                <Link className="btn btn-success w-100" role="button" href="checkout.html">Checkout now!</Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </aside>

    )
}

export default CartBar