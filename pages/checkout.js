import CartBar from "@/components/Cartbar"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/Searchbar"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/features/authSlice';
import { useRouter } from 'next/router';

const Checkout = () => {

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
            <section style={{margin: '200px 0', overflowX: 'hidden'}}>
                <div className="container">
                    <form className="row gx-5">
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                            <div>
                                <h4 className="fw-bolder">Personal details</h4>
                                <div className="mb-2">
                                    <label className="form-label">Fullname</label>
                                    <input className="form-control border-0" type="text" placeholder="e.g john" />
                                </div>
                                <div>
                                    <label className="form-label">Email Address</label>
                                    <input className="form-control border-0" type="email" placeholder="e.g john@gmail.com" />
                                </div>
                            </div>
                            <div>
                                <h4 className="fw-bolder">Billing details</h4>
                                <div className="mb-2"><label className="form-label">Country</label>
                                    <select className="form-select">
                                        <optgroup label="Choose country for delivery">
                                        <option value="nigeria" selected>Nigeria</option>
                                        <option value="ghana">Ghana</option>
                                        <option value="south africa">South africa</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">State</label>
                                    <input className="form-control border-0" type="email" placeholder="choose your state for delivery" />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Postal code</label>
                                    <input className="form-control border-0" type="email" placeholder="add postal code" />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Address</label>
                                    <input className="form-control border-0" type="email" placeholder="apartment or house address" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                            <div>
                                <h4 className="fw-bolder">Your order</h4>
                                <div className="py-4">
                                    <div className="d-flex mx-4 mb-3">
                                    <div className="h-100 pe-3">
                                    <img src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width="60px" /></div>
                                    <div>
                                        <h6 className="mb-1 cart-price"><span className="text_small fake">$248.35</span><span className="text_small real ms-2">$164.27</span></h6>
                                        <p className="my-0"><strong><span style={{color: 'rgb(60, 0, 0)'}}>This is a product you wanna buy from us</span></strong></p><small className="mt-0">Quantity: 2</small>
                                    </div>
                                    </div>
                                    <div className="d-flex mx-4 mb-3">
                                    <div className="h-100 pe-3"><img src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width="60px" /></div>
                                    <div>
                                        <h6 className="mb-1 cart-price"><span className="text_small fake">$248.35</span><span className="text_small real ms-2">$164.27</span></h6>
                                        <p className="my-0"><strong><span style={{color: 'rgb(60, 0, 0)'}}>This is a product you wanna buy from us</span></strong></p><small className="mt-0">Quantity: 2</small>
                                    </div>
                                    </div>
                                    <div className="d-flex mx-4 mb-3">
                                    <div className="h-100 pe-3"><img src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width="60px" /></div>
                                    <div>
                                        <h6 className="mb-1 cart-price"><span className="text_small fake">$248.35</span><span className="text_small real ms-2">$164.27</span></h6>
                                        <p className="my-0"><strong><span style={{color: 'rgb(60, 0, 0)'}}>This is a product you wanna buy from us</span></strong></p><small className="mt-0">Quantity: 2</small>
                                    </div>
                                    </div>
                                    <div className="d-flex mx-4 mb-3">
                                    <div className="h-100 pe-3"><img src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width="60px" /></div>
                                    <div>
                                        <h6 className="mb-1 cart-price"><span className="text_small fake">$248.35</span><span className="text_small real ms-2">$164.27</span></h6>
                                        <p className="my-0"><strong><span style={{color: 'rgb(60, 0, 0)'}}>This is a product you wanna buy from us</span></strong></p><small className="mt-0">Quantity: 2</small>
                                    </div>
                                    </div>
                                    <div className="d-flex mx-4 mb-3">
                                    <div className="h-100 pe-3"><img src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width="60px" /></div>
                                    <div>
                                        <h6 className="mb-1 cart-price"><span className="text_small fake">$248.35</span><span className="text_small real ms-2">$164.27</span></h6>
                                        <p className="my-0"><strong><span style={{color: 'rgb(60, 0, 0)'}}>This is a product you wanna buy from us</span></strong></p><small className="mt-0">Quantity: 2</small>
                                    </div>
                                    </div>
                                </div>
                                <hr className="mt-0" />
                                <div className="mx-4 pt-3">
                                    <h5 className="mt-0 mb-2 fw-bolder">Subtotal: $5000</h5>
                                    <h5 className="mt-0 mb-2 fw-bolder">Delivery fee : $500</h5>
                                    <h5 className="mt-0 mb-2 fw-bolder">Total : $5500</h5>
                                    <button className="btn btn-dark btn-lg mt-4 w-100" type="submit" style={{background: '#3c0000'}}>Place order</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Checkout