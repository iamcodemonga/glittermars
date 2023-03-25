import Cartbar from "@/components/Cartbar"
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
import { toast } from "react-toastify";
import BeatLoader from 'react-spinners/BeatLoader';

const Checkout = ({ user, query, product }) => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const [ fullname, setFullname ] = useState(user ? user.fullname : "")
    const [ email, setEmail ] = useState(user ? user.email : "")
    const [ country, setCountry ] = useState('Nigeria')
    const [ city, setCity ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ postalcode, setPostalcode ] = useState('');
    const [ loading, setLoading ] = useState(false)

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
        setLoading(true)
        if (!fullname || !email || !country || !city || !address || !postalcode){
            toast.error('please fill in all fields!!!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false)
            return;
        }

        if(!nameRegex.test(fullname)){
            toast.error('Name format is improper!!!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false)
            return;
        }

        if(!emailRegex.test(email)){
            toast.error('Email format is improper!!!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false)
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
            toast.success(data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false)
            setTimeout(() => {
                router.push("/account")
            }, 1500);
            return;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <SearchBar />
            <Cartbar user={user} product={null} cartQuantity={0} />
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
                                            <option value="Afghanistan">Afghanistan</option>
                                            <option value="Åland Islands">Åland Islands</option>
                                            <option value="Albania">Albania</option>
                                            <option value="Algeria">Algeria</option>
                                            <option value="American Samoa">American Samoa</option>
                                            <option value="Andorra">Andorra</option>
                                            <option value="Angola">Angola</option>
                                            <option value="Anguilla">Anguilla</option>
                                            <option value="Antarctica">Antarctica</option>
                                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                            <option value="Argentina">Argentina</option>
                                            <option value="Armenia">Armenia</option>
                                            <option value="Aruba">Aruba</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Austria">Austria</option>
                                            <option value="Azerbaijan">Azerbaijan</option>
                                            <option value="Bahamas">Bahamas</option>
                                            <option value="Bahrain">Bahrain</option>
                                            <option value="Bangladesh">Bangladesh</option>
                                            <option value="Barbados">Barbados</option>
                                            <option value="Belarus">Belarus</option>
                                            <option value="Belgium">Belgium</option>
                                            <option value="Belize">Belize</option>
                                            <option value="Benin">Benin</option>
                                            <option value="Bermuda">Bermuda</option>
                                            <option value="Bhutan">Bhutan</option>
                                            <option value="Bolivia">Bolivia</option>
                                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                            <option value="Botswana">Botswana</option>
                                            <option value="Bouvet Island">Bouvet Island</option>
                                            <option value="Brazil">Brazil</option>
                                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                                            <option value="Bulgaria">Bulgaria</option>
                                            <option value="Burkina Faso">Burkina Faso</option>
                                            <option value="Burundi">Burundi</option>
                                            <option value="Cambodia">Cambodia</option>
                                            <option value="Cameroon">Cameroon</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Cape Verde">Cape Verde</option>
                                            <option value="Cayman Islands">Cayman Islands</option>
                                            <option value="Central African Republic">Central African Republic</option>
                                            <option value="Chad">Chad</option>
                                            <option value="Chile">Chile</option>
                                            <option value="China">China</option>
                                            <option value="Christmas Island">Christmas Island</option>
                                            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                            <option value="Colombia">Colombia</option>
                                            <option value="Comoros">Comoros</option>
                                            <option value="Congo">Congo</option>
                                            <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                                            <option value="Cook Islands">Cook Islands</option>
                                            <option value="Costa Rica">Costa Rica</option>
                                            <option value="Cote D'ivoire">Cote D'ivoire</option>
                                            <option value="Croatia">Croatia</option>
                                            <option value="Cuba">Cuba</option>
                                            <option value="Cyprus">Cyprus</option>
                                            <option value="Czech Republic">Czech Republic</option>
                                            <option value="Denmark">Denmark</option>
                                            <option value="Djibouti">Djibouti</option>
                                            <option value="Dominica">Dominica</option>
                                            <option value="Dominican Republic">Dominican Republic</option>
                                            <option value="Ecuador">Ecuador</option>
                                            <option value="Egypt">Egypt</option>
                                            <option value="El Salvador">El Salvador</option>
                                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                                            <option value="Eritrea">Eritrea</option>
                                            <option value="Estonia">Estonia</option>
                                            <option value="Ethiopia">Ethiopia</option>
                                            <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                            <option value="Faroe Islands">Faroe Islands</option>
                                            <option value="Fiji">Fiji</option>
                                            <option value="Finland">Finland</option>
                                            <option value="France">France</option>
                                            <option value="French Guiana">French Guiana</option>
                                            <option value="French Polynesia">French Polynesia</option>
                                            <option value="French Southern Territories">French Southern Territories</option>
                                            <option value="Gabon">Gabon</option>
                                            <option value="Gambia">Gambia</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Germany">Germany</option>
                                            <option value="Ghana">Ghana</option>
                                            <option value="Gibraltar">Gibraltar</option>
                                            <option value="Greece">Greece</option>
                                            <option value="Greenland">Greenland</option>
                                            <option value="Grenada">Grenada</option>
                                            <option value="Guadeloupe">Guadeloupe</option>
                                            <option value="Guam">Guam</option>
                                            <option value="Guatemala">Guatemala</option>
                                            <option value="Guernsey">Guernsey</option>
                                            <option value="Guinea">Guinea</option>
                                            <option value="Guinea-bissau">Guinea-bissau</option>
                                            <option value="Guyana">Guyana</option>
                                            <option value="Haiti">Haiti</option>
                                            <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                                            <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                            <option value="Honduras">Honduras</option>
                                            <option value="Hong Kong">Hong Kong</option>
                                            <option value="Hungary">Hungary</option>
                                            <option value="Iceland">Iceland</option>
                                            <option value="India">India</option>
                                            <option value="Indonesia">Indonesia</option>
                                            <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                                            <option value="Iraq">Iraq</option>
                                            <option value="Ireland">Ireland</option>
                                            <option value="Isle of Man">Isle of Man</option>
                                            <option value="Israel">Israel</option>
                                            <option value="Italy">Italy</option>
                                            <option value="Jamaica">Jamaica</option>
                                            <option value="Japan">Japan</option>
                                            <option value="Jersey">Jersey</option>
                                            <option value="Jordan">Jordan</option>
                                            <option value="Kazakhstan">Kazakhstan</option>
                                            <option value="Kenya">Kenya</option>
                                            <option value="Kiribati">Kiribati</option>
                                            <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                                            <option value="Korea, Republic of">Korea, Republic of</option>
                                            <option value="Kuwait">Kuwait</option>
                                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                                            <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                                            <option value="Latvia">Latvia</option>
                                            <option value="Lebanon">Lebanon</option>
                                            <option value="Lesotho">Lesotho</option>
                                            <option value="Liberia">Liberia</option>
                                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                            <option value="Liechtenstein">Liechtenstein</option>
                                            <option value="Lithuania">Lithuania</option>
                                            <option value="Luxembourg">Luxembourg</option>
                                            <option value="Macao">Macao</option>
                                            <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                                            <option value="Madagascar">Madagascar</option>
                                            <option value="Malawi">Malawi</option>
                                            <option value="Malaysia">Malaysia</option>
                                            <option value="Maldives">Maldives</option>
                                            <option value="Mali">Mali</option>
                                            <option value="Malta">Malta</option>
                                            <option value="Marshall Islands">Marshall Islands</option>
                                            <option value="Martinique">Martinique</option>
                                            <option value="Mauritania">Mauritania</option>
                                            <option value="Mauritius">Mauritius</option>
                                            <option value="Mayotte">Mayotte</option>
                                            <option value="Mexico">Mexico</option>
                                            <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                                            <option value="Moldova, Republic of">Moldova, Republic of</option>
                                            <option value="Monaco">Monaco</option>
                                            <option value="Mongolia">Mongolia</option>
                                            <option value="Montenegro">Montenegro</option>
                                            <option value="Montserrat">Montserrat</option>
                                            <option value="Morocco">Morocco</option>
                                            <option value="Mozambique">Mozambique</option>
                                            <option value="Myanmar">Myanmar</option>
                                            <option value="Namibia">Namibia</option>
                                            <option value="Nauru">Nauru</option>
                                            <option value="Nepal">Nepal</option>
                                            <option value="Netherlands">Netherlands</option>
                                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                                            <option value="New Caledonia">New Caledonia</option>
                                            <option value="New Zealand">New Zealand</option>
                                            <option value="Nicaragua">Nicaragua</option>
                                            <option value="Niger">Niger</option>
                                            <option value="Nigeria">Nigeria</option>
                                            <option value="Niue">Niue</option>
                                            <option value="Norfolk Island">Norfolk Island</option>
                                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                            <option value="Norway">Norway</option>
                                            <option value="Oman">Oman</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="Palau">Palau</option>
                                            <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                            <option value="Panama">Panama</option>
                                            <option value="Papua New Guinea">Papua New Guinea</option>
                                            <option value="Paraguay">Paraguay</option>
                                            <option value="Peru">Peru</option>
                                            <option value="Philippines">Philippines</option>
                                            <option value="Pitcairn">Pitcairn</option>
                                            <option value="Poland">Poland</option>
                                            <option value="Portugal">Portugal</option>
                                            <option value="Puerto Rico">Puerto Rico</option>
                                            <option value="Qatar">Qatar</option>
                                            <option value="Reunion">Reunion</option>
                                            <option value="Romania">Romania</option>
                                            <option value="Russian Federation">Russian Federation</option>
                                            <option value="Rwanda">Rwanda</option>
                                            <option value="Saint Helena">Saint Helena</option>
                                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                            <option value="Saint Lucia">Saint Lucia</option>
                                            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                                            <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                                            <option value="Samoa">Samoa</option>
                                            <option value="San Marino">San Marino</option>
                                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                            <option value="Saudi Arabia">Saudi Arabia</option>
                                            <option value="Senegal">Senegal</option>
                                            <option value="Serbia">Serbia</option>
                                            <option value="Seychelles">Seychelles</option>
                                            <option value="Sierra Leone">Sierra Leone</option>
                                            <option value="Singapore">Singapore</option>
                                            <option value="Slovakia">Slovakia</option>
                                            <option value="Slovenia">Slovenia</option>
                                            <option value="Solomon Islands">Solomon Islands</option>
                                            <option value="Somalia">Somalia</option>
                                            <option value="South Africa">South Africa</option>
                                            <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                                            <option value="Spain">Spain</option>
                                            <option value="Sri Lanka">Sri Lanka</option>
                                            <option value="Sudan">Sudan</option>
                                            <option value="Suriname">Suriname</option>
                                            <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                                            <option value="Swaziland">Swaziland</option>
                                            <option value="Sweden">Sweden</option>
                                            <option value="Switzerland">Switzerland</option>
                                            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                                            <option value="Taiwan">Taiwan</option>
                                            <option value="Tajikistan">Tajikistan</option>
                                            <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                                            <option value="Thailand">Thailand</option>
                                            <option value="Timor-leste">Timor-leste</option>
                                            <option value="Togo">Togo</option>
                                            <option value="Tokelau">Tokelau</option>
                                            <option value="Tonga">Tonga</option>
                                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                            <option value="Tunisia">Tunisia</option>
                                            <option value="Turkey">Turkey</option>
                                            <option value="Turkmenistan">Turkmenistan</option>
                                            <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                            <option value="Tuvalu">Tuvalu</option>
                                            <option value="Uganda">Uganda</option>
                                            <option value="Ukraine">Ukraine</option>
                                            <option value="United Arab Emirates">United Arab Emirates</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="United States">United States</option>
                                            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                            <option value="Uruguay">Uruguay</option>
                                            <option value="Uzbekistan">Uzbekistan</option>
                                            <option value="Vanuatu">Vanuatu</option>
                                            <option value="Venezuela">Venezuela</option>
                                            <option value="Viet Nam">Viet Nam</option>
                                            <option value="Virgin Islands, British">Virgin Islands, British</option>
                                            <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                                            <option value="Wallis and Futuna">Wallis and Futuna</option>
                                            <option value="Western Sahara">Western Sahara</option>
                                            <option value="Yemen">Yemen</option>
                                            <option value="Zambia">Zambia</option>
                                            <option value="Zimbabwe">Zimbabwe</option>
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
                                    
                                    {loading ? <button className="btn btn-dark btn-lg mt-4 w-100" type="button" style={{background: '#3c0000'}} disabled><BeatLoader size={7} color={"#f3dcd1"} loading={loading} aria-label="Loading Spinner" data-testid="loader" /></button> : <button className="btn btn-dark btn-lg mt-4 w-100" type="submit" style={{background: '#3c0000'}}>Place order</button>}
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