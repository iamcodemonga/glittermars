import Cartbar from '@/components/Cartbar';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Searchbar from '@/components/Searchbar';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeCart, addProduct } from '@/features/cartSlice';
import useSWR from 'swr';
import { toast } from 'react-toastify'
import BeatLoader from 'react-spinners/BeatLoader';
import Popup from '@/components/Popup';
// import ReactImageMagnify from 'react-image-magnify';

const Product = ({ product, recommended, user, customer, opinions }) => {

    const URL = process.env.NEXT_PUBLIC_API_ROOT;
    const [ activeIndex, setActiveIndex ] = useState(0);
    const [ cartQuantity, setCartQuantity ] = useState(1)
    const [ review, setReview ] = useState({ title: "", rating: 5, description: "" })
    const [ loader, setLoader ] = useState(false)
    const [ status, setStatus ] = useState(false)
    const dispatch = useDispatch();

    const handleAdd = () => {
        if(cartQuantity >= product.quantity){
            return;
        }
        setCartQuantity((prev) => parseInt(prev)+1)
    }

    const handleRemove = () => {
        if(cartQuantity <= 1){
            return;
        }
        setCartQuantity((prev) => parseInt(prev)-1)
    }

    const handleChange = (e) => {
        if(Math.floor(e.target.value) > product.quantity){
            setCartQuantity(product.quantity);
            return;
        }
        setCartQuantity(e.target.value)
    }

    const handleFocusout = () => {
        if(cartQuantity == 0) {
            setCartQuantity(1)
            return;
        }
        if(cartQuantity == "") {
            setCartQuantity(1)
            return;
        }
    }

    const fetchReviews = async() => {
        try {
            const getComment = await axios(`${URL}/products/reviews/${product._id}`);
            return getComment.data;
        } catch (error) {
            console.log(error)
        }
    }

    const { data: reviews, mutate } = useSWR('products/getReviews', fetchReviews, { refreshInterval: 2000})

    const handleReview = async(e) => {
        e.preventDefault();
        setLoader(true)

        if ( !review.title || !review.description ) {
            setLoader(false)
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
            return;
        }

        if (!user) {
            setLoader(false)
            toast.error('you are not logged in!!!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        if (!customer) {
            setLoader(false)
            toast.error('you havn\'t purchased this product!!!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        const addComment = await axios.post(`${URL}/products/review/${product._id}?user=${user._id}`, { review });
        toast.success(`Thanks for the review!!!`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        mutate()
        setReview({ title: "", rating: 5, description: "" })
        setLoader(false)
        return addComment.data.status.review;

    }

    useEffect(() => {
        dispatch(initializeCart())
    },[])

    return (
        <>
            <Cartbar user={user} product={null} cartQuantity={0} />
            <Searchbar />
            <Navbar user={user} />
            <section id="product-view" style={{overflowX: 'hidden'}} className="mt-5 pb-3">
                <div className="container">
                    <div className="row gx-5 gy-4">
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                            <div className="position-relative balablue">
                                <Image className="w-100 activeImage" src={product.images.split(',')[activeIndex]} width={500} height={500} style={{objectFit: 'cover'}} alt={product.title} priority />
                                {/* <ReactImageMagnify {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        isFluidWidth: true,
                                        src: product.images.split(',')[activeIndex]
                                    },
                                    largeImage: {
                                        src: product.images.split(',')[activeIndex],
                                        width: 1200,
                                        height: 1800
                                    }
                                }} /> */}
                                <div className="inactiveImage-wrapper">
                                    {product.images.split(',').map((image, index) => <Image className={index === activeIndex ? "inactiveImage me-2 active": "inactiveImage me-2"} src={image} alt='carousel_image' width={50} height={40} key={index} priority onMouseOver={() => setActiveIndex(index)} />)}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                            <div className="h-100 d-flex align-items-center">
                                <div>
                                    <h5 className="mt-0">
                                        <span className="me-3 text-danger fw-bold">
                                            <span style={{textDecoration: 'line-through'}}>${product.price}</span>
                                        </span>
                                        <span className="text-success fw-bold">${(product.price*0.8).toFixed(2)}</span>
                                    </h5>
                                    <h1><strong>{product.title}</strong></h1>
                                    <div className="mb-3">
                                        <p>Quantity</p>
                                        <div className="input-grou d-flex align-items-center" style={{maxWidth: 200}}>
                                            <button className="btn btn-danger border-0" type="button" onClick={handleRemove}>remove</button>
                                                <input className="form-control cart-input" type="text" value={cartQuantity} onChange={handleChange} onBlur={handleFocusout} />
                                            <button className="btn btn-success border-0 px-4" type="button" onClick={handleAdd}>add</button>
                                        </div>
                                    </div>
                                    <button className="btn btn-dark btn-lg mt-4 w-100" type="button" onClick={() => dispatch(addProduct({cartQuantity, ...product}))}>ADD TO CART</button>
                                    <button href={`/checkout?type=onetime&pid=${product._id}&qty=${cartQuantity}`} className="btn btn-dark btn-lg mt-4 w-100 btn-special" type="button" onClick={() => setStatus(true)}>BUY NOW!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="product-details" className="mt-5">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-12">
                            <div className="description">
                                <h2 className='mt-0'>Product Description</h2>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="recommended" className="pb-3">
                <div className="container">
                    <h2 className="mb-0">Similar Products</h2>
                    <div className="row gx-4 gy-4 mt-3">
                    { recommended && recommended.map((product, index) => <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4" key={index}>
                            <div className="card product-card-grid">
                                <div className="position-relative">
                                    {product.quantity < 1 && <button className="btn btn-danger btn-sm disabled position-absolute" type="button" style={{right: 0}} disabled>sold out</button>}
                                    <Link href={product.quantity > 0 ? `/product/${product._id}` : "#"}>
                                    <Image className="img-fluid" src={product.images.split(',')[0]} style={{aspectRatio: '5/4', objectFit: 'cover'}} width={700} height={500} alt="recommended_image" />
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
                                        <h5 className="my-0">{product.title.length < 40 ? `${product.title.substring(0, 42)}` : `${product.title.substring(0, 42)}...`}</h5>
                                    </Link>
                                    <button className="btn btn-dark mt-3 w-100 btn-special" type="button">Add to Cart</button>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </section>
            <section id="reviews" className="mt-5">
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-12">
                            <div>
                                <div className="comment-section mb-5 pb-2">
                                    <h2 className='mt-0'>{ opinions < 1 ? !customer ? "" : "Customer Reviews" : "Customer Reviews" }</h2>
                                    {/* {opinions.length < 1 ? customer ? :<h2 className='mt-0'>Customer Reviews</h2>} */}
                                    {customer && <div>
                                        <form className="review-form" onSubmit={handleReview}>
                                            <div className="mb-3">
                                                <label className="form-label">Review Title</label>
                                                <input className="form-control border-0" type="text" placeholder="add a title" value={review.title} onChange={(e) => setReview({ ...review, title: e.target.value })} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Product Rating</label>
                                                <select className="form-select py-2" value={review.rating} onChange={(e) => setReview({ ...review, rating: e.target.value })} >
                                                    <optgroup label="Rate this product">
                                                        <option value={5}>5</option>
                                                        <option value={4}>4</option>
                                                        <option value={3}>3</option>
                                                        <option value={2}>2</option>
                                                        <option value={1}>1</option>
                                                    </optgroup>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label className="form-label">Body of review</label>
                                                <textarea className="form-control border-0" placeholder="What do you think?" rows={4} value={review.description} onChange={(e) => setReview({ ...review, description: e.target.value })} />
                                            </div>
                                            {loader ? <button className="btn btn-dark btn-special border-0" type="submit"><BeatLoader size={7} color={"#f3dcd1"} loading={loader} aria-label="Loading Spinner" data-testid="loader" /></button> : <button className="btn btn-dark btn-special border-0" type="submit">Submit review</button>}
                                            
                                        </form>
                                    </div>}
                                    {reviews && reviews.map((comment, index) => <div className="comment mt-5" key={index}>
                                        <hr />
                                        <h6>Rated <strong>{comment.rating}/5</strong> By <strong>{comment.fullname}</strong></h6>
                                        <h3 className="my-2">{comment.title}</h3>
                                        <p className="mt-0">{comment.description}</p>
                                        <p className="text_small text-dark">posted on <strong>{comment.date}</strong></p>
                                    </div>)}
                                    {/* <div className="comment mt-4">
                                    <hr />
                                    <h6>Rated <strong>4/5</strong> By <strong>John doe</strong></h6>
                                    <h3 className="my-2">This is the title of the comment!</h3>
                                    <p className="mt-0">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,</p>
                                    <p className="text_small text-dark">posted on <strong>20-05-2019</strong></p>
                                    </div>
                                    <div className="comment mt-4">
                                    <hr />
                                    <h6>Rated <strong>4/5</strong> By <strong>John doe</strong></h6>
                                    <h3 className="my-2">This is the title of the comment!</h3>
                                    <p className="mt-0">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,</p>
                                    <p className="text_small text-dark">posted on <strong>20-05-2019</strong></p>
                                    </div>
                                    <div className="comment mt-4">
                                    <hr />
                                    <h6>Rated <strong>4/5</strong> By <strong>John doe</strong></h6>
                                    <h3 className="my-2">This is the title of the comment!</h3>
                                    <p className="mt-0">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,</p>
                                    <p className="text_small text-dark">posted on <strong>20-05-2019</strong></p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Popup status={status} handleHide={() => setStatus(false)} user={user} product={product} cartQuantity={cartQuantity} bulk={false} />
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const { req, params } = context
    const { cookie } = req.headers;
    const URL = process.env.API_ROOT;
    try {
        const user = await axios(`${process.env.CLIENT_ROOT}/api/user`, { headers: { cookie: cookie || '' } });
        const qstring = (user.data==null ? `?user=null` : `?user=${user.data._id}`);
        const productData = await axios(`${URL}/products/${params.productid}${qstring}`);
        const similarData = await axios(`${URL}/products/recommended/${params.productid}`);
        const reviews = await axios(`${URL}/products/reviews/${params.productid}`);
        if (productData.data.error){
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
        return {
            props: {
                product: productData.data.product[0],
                recommended: similarData.data,
                user: user.data,
                customer: productData.data.customer,
                opinions: reviews.data
            }
        }
    } catch (error) {
        console.log(error)
    }
}
export default Product