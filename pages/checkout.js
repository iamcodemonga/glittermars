import CartBar from "@/components/Cartbar"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/Searchbar"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initializeCart } from '@/features/cartSlice';
import axios from "axios"
import Image from "next/image"
import router from 'next/router'

const Checkout = ({ user, query, product }) => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const [ fullname, setFullname ] = useState(user ? user.fullname : "")
    const [ email, setEmail ] = useState(user ? user.email : "")
    const [ country, setCountry ] = useState('')
    const [ city, setCity ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ postalcode, setPostalcode ] = useState('')

    useEffect(() => {
        dispatch(initializeCart())
        setTimeout(() => {
            if(query.type == 'bulk' && cart.items.length == 0) {
                router.push('/')
                return
            }
        }, 1500);
    },[])

    const handleOrder = async(e) => {

        e.preventDefault()
        const nameRegex = /^([a-zA-Z ]+)$/;
        const emailRegex = /^([a-zA-Z0-9\.\-_]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/;
        let queryString = `?type=${query.type}`;

        if (!fullname || !email || !country || !city || !address || !postalcode){
            console.log('please fill in all fields')
            return;
        }

        if(!nameRegex.test(fullname)){
            console.log('name format is improper')
            return;
        }

        if(!emailRegex.test(email)){
            console.log('email format is improper')
            return;
        }

        if (query.type == 'onetime') {
            queryString = `?type=${query.type}&pid=${query.pid}&qty=${query.qty}`
        }

        const products = product ? [{...product, cartQuantity: parseInt(query.qty)}] : cart.items;
        const buyer = user ? { userid: user._id,fullname, email, country, city, address, postalcode } : { fullname, email, country, city, address, postalcode };

        console.log(queryString)
        try {
            const { data } = await axios.post(`http://localhost:3005/user/order${queryString}`, { buyer, products} )
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleStripe = async() => {
        const products = product ? [{...product, cartQuantity: parseInt(query.qty)}] : cart.items;
        const userid = user ? user._id : "unassigned";
        try {
            const { data } = await axios.post(`http://localhost:3005/payments/stripe/create-checkout-session`, { products, userid })
            router.push(data.url)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        return;
    }

    return (
        <>
            <SearchBar />
            <CartBar />
            <Navbar user={user} />
            <section style={{margin: '200px 0', overflowX: 'hidden'}}>
                <div className="container">
                    <form className="row gx-5" onSubmit={handleOrder}>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                            {!user && <div>
                                <h4 className="fw-bolder">Personal details</h4>
                                <div className="mb-2">
                                    <label className="form-label">Fullname</label>
                                    <input className="form-control border-0" type="text" placeholder="e.g john" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                                </div>
                                <div>
                                    <label className="form-label">Email Address</label>
                                    <input className="form-control border-0" type="email" placeholder="e.g john@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>}
                            <div>
                                <h4 className="fw-bolder">Billing details</h4>
                                <div className="mb-2"><label className="form-label">Country</label>
                                    <select className="form-select" value={country} onChange={(e) => setCountry(e.target.value)}>
                                        <optgroup label="Choose country for delivery">
                                            <option value="nigeria">Nigeria</option>
                                            <option value="ghana">Ghana</option>
                                            <option value="south africa">South africa</option>
                                        </optgroup>
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">State</label>
                                    <input className="form-control border-0" type="text" placeholder="choose your state for delivery" value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Postal code</label>
                                    <input className="form-control border-0" type="number" placeholder="add postal code" value={postalcode} onChange={(e) => setPostalcode(e.target.value)} />
                                </div>
                                <div className="mb-2">
                                    <label className="form-label">Address</label>
                                    <input className="form-control border-0" type="text" placeholder="apartment or house address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                            <div>
                                <h4 className="fw-bolder">Your order</h4>
                                <div className="py-4">
                                    { product ? <div className="d-flex mx-4 mb-3">
                                        <div className="h-100 pe-3">
                                            <Image alt='product_image' src={product.images.split(',')[0]} width={60} height={60} style={{objectFit: 'cover'}} />
                                        </div>
                                        <div>
                                            <h6 className="mb-1 cart-price">
                                                <span className="text_small fake">${product.price}</span>
                                                <span className="text_small real ms-2">${(product.price*0.8).toFixed(2)}</span>
                                            </h6>
                                            <p className="my-0">
                                                <strong>
                                                    <span style={{color: 'rgb(60, 0, 0)'}}>{product.title}</span>
                                                </strong>
                                            </p>
                                            <small className="mt-0">Quantity: {query.qty}</small>
                                        </div>
                                    </div> : cart.items.map((item, index) => <div className="d-flex mx-4 mb-3" key={index}>
                                        <div className="h-100 pe-3"><Image alt='product_image' src={item.images.split(',')[0]} width={60} height={60} style={{objectFit: 'cover'}} /></div>
                                        <div>
                                            <h6 className="mb-1 cart-price"><span className="text_small fake">${item.price}</span><span className="text_small real ms-2">${(item.price*0.8).toFixed(2)}</span></h6>
                                            <p className="my-0"><strong><span style={{color: 'rgb(60, 0, 0)'}}>{item.title}</span></strong></p><small className="mt-0">Quantity: {item.cartQuantity}</small>
                                        </div>
                                    </div>)}
                                    {/* <div className="d-flex mx-4 mb-3">
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
                                    </div> */}
                                </div>
                                <hr className="mt-0" />
                                <div className="mx-4 pt-3">
                                    {product ? <h5 className="mt-0 mb-2 fw-bolder">Subtotal: ${(parseInt(product.price)*0.8*query.qty).toFixed(2)}</h5> : <h5 className="mt-0 mb-2 fw-bolder">Subtotal: ${(parseInt(cart.amount)*0.8).toFixed(2)}</h5>}
                                    <h5 className="mt-0 mb-2 fw-bolder">Delivery fee : $65</h5>
                                    {product ? <h5 className="mt-0 mb-2 fw-bolder">Total : ${((parseInt(product.price)*0.8*query.qty)+65).toFixed(2)}</h5> : <h5 className="mt-0 mb-2 fw-bolder">Total : ${((parseInt(cart.amount)*0.8)+65).toFixed(2)}</h5>}
                                    <button className="btn btn-dark btn-lg mt-4 w-100" type="submit" style={{background: '#3c0000'}}>Pay on delivery</button>
                                    <button className="btn btn-dark btn-lg mt-4 w-100" type="button" onClick={handleStripe} style={{background: '#3c0000'}}>Pay with stripe</button>
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

export async function getServerSideProps(context) {
      const { req, query } = context;
      const { cookie } = req.headers;
      const { type, pid, qty } = query
      const qtyRegex = /^([0-9]+)$/;
      console.log(query)

      if (type != 'onetime' && type != 'bulk') {
        console.log('first condition')
        return {
            redirect: {
                destination: '/',
                Permanent: false
            }
        }
      }

      if (type == 'onetime' && (pid == undefined || pid == "")) {
        console.log('second condition')
        return {
            redirect: {
                destination: '/',
                Permanent: false
            }
        }
      }

      if(type == 'onetime' && (qty == undefined || qty == "" || !qtyRegex.test(parseInt(qty)))) {
        console.log('third condition')
        return {
            redirect: {
                destination: '/',
                Permanent: false
            }
        }
      }

      try {
          let product = null;
          const user = await axios("http://localhost:3005/user/", { headers: { cookie: cookie || '' } } );
          if(type == 'onetime'){
            const productData = await axios(`http://localhost:3005/products/${pid}`);
            if (productData.data.error) {
                return {
                    redirect: { destination: '/', permanent: false }
                }
            }
            if (parseInt(qty) > parseInt(productData.data.product[0].quantity)) {
                return {
                    redirect: { destination: '/', permanent: false }
                }
            }
            product = productData.data.product[0];
          }
          console.log(user.data)
          return {
            props: { user: user.data, query: (type == "bulk" ? { type} : { type, pid, qty}), product }
          }
      } catch (error) {
          console.log(error)
      }
  }

export default Checkout