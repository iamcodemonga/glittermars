import Cartbar from '@/components/Cartbar';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Searchbar from '@/components/Searchbar';
import Image from 'next/image';
import Link from 'next/link';
import { bestProducts } from 'components/JsonData';

const Product = () => {
  return (
    <>
        <Cartbar />
        <Searchbar />
        <Navbar />
        <section id="product-view" style={{overflowX: 'hidden'}} className="mt-5 pb-3">
            <div className="container">
                <div className="row gx-5 gy-4">
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                        <div className="position-relative">
                            <Image className="w-100 activeImage" src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1600" width={500} height={500} style={{objectFit: 'cover'}} priority />
                            <div className="inactiveImage-wrapper">
                                <Image className="inactiveImage me-2 active" src="https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={50} height={40} priority />
                                <Image className="inactiveImage me-2" src="https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={50} height={40} priority />
                                <Image className="inactiveImage me-2" src="https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=1600" width={50} height={40} priority />
                                <Image className="inactiveImage me-2" src="https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" width={50} height={40} priority />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                        <div className="h-100 d-flex align-items-center">
                            <div>
                                <h5 className="mt-0">
                                    <span className="me-3 text-danger fw-bold">
                                        <span style={{textDecoration: 'line-through'}}>$155.67</span>
                                    </span>
                                    <span className="text-success fw-bold">$155.67</span>
                                </h5>
                                <h1><strong>This is the title of the product you wanna buy.</strong></h1>
                                <div className="mb-3">
                                    <p>Quantity</p>
                                    <div className="input-group" style={{maxWidth: 200}}>
                                        <button className="btn btn-danger border-0" type="button">remove</button>
                                            <input className="form-control cart-input" type="text" defaultValue={1} />
                                        <button className="btn btn-success border-0 px-4" type="button">add</button>
                                    </div>
                                </div>
                                <button className="btn btn-dark btn-lg mt-4 w-100" type="button">ADD TO CART</button>
                                <button className="btn btn-dark btn-lg mt-4 w-100 btn-special" type="button">BUY NOW!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="product-details" className="mt-5">
            <div className="container">
                {/* <ul className="nav product-nav">
                    <li className="nav-item"><a className="nav-link active" href="#">Product details</a></li>
                    <li className="nav-item"><a className="nav-link" href="#">Customer reviews</a></li>
                </ul> */}
                <div className="row mt-3">
                    <div className="col-12">
                        <div className="description">
                            <h2 className='mt-0'>Product Description</h2>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</p>
                        </div>
                    </div>
                    <div className="col-12 d-none">
                        <div>
                        <div>
                            <h4 className="mt-0"><strong>Write a review</strong></h4>
                            <form className="review-form">
                            <div className="mb-3"><label className="form-label">Name</label><input className="form-control border-0" type="text" placeholder="what's ya name" /></div>
                            <div className="mb-3"><label className="form-label">Product Rating</label><select className="form-select py-2">
                                <optgroup label="Rate this product">
                                    <option value={5} selected>5</option>
                                    <option value={4}>4</option>
                                    <option value={3}>3</option>
                                    <option value={2}>2</option>
                                    <option value={1}>1</option>
                                </optgroup>
                                </select></div>
                            <div className="mb-3"><label className="form-label">Review Title</label><input className="form-control border-0" type="text" placeholder="add a title" /></div>
                            <div className="mb-4"><label className="form-label">Body of review</label><textarea className="form-control border-0" placeholder="What do you think?" rows={4} defaultValue={""} /></div><button className="btn btn-dark btn-special border-0" type="button">Submit review</button>
                            </form>
                        </div>
                        <div className="comment-section">
                            <div className="comment mt-5">
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
                            </div>
                            <div className="comment mt-4">
                            <hr />
                            <h6>Rated <strong>4/5</strong> By <strong>John doe</strong></h6>
                            <h3 className="my-2">This is the title of the comment!</h3>
                            <p className="mt-0">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,</p>
                            <p className="text_small text-dark">posted on <strong>20-05-2019</strong></p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="recommended" className="pb-3">
            <div className="container">
                <h2 className="mb-0">Similar Products</h2>
                <div className="row gx-4 gy-4 mt-3">
                { bestProducts && bestProducts.map((product, index) => <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4" key={index}>
                        <div className="card product-card-grid">
                        <div className="position-relative">
                            {!product.instock && <button className="btn btn-danger btn-sm disabled position-absolute" type="button" style={{right: 0}} disabled>sold out</button>}
                            <Link href={product.instock ? "/product/5125167" : "#"}>
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
            </div>
        </section>
        <section id="reviews" className="mt-5">
            <div className="container">
                <div className="row mt-3">
                    <div className="col-12">
                        <div>
                            <div className="comment-section mb-5 pb-2">
                                <h2 className='mt-0'>Customer Reviews</h2>
                                <div className='d-none'>
                                    <form className="review-form">
                                    <div className="mb-3"><label className="form-label">Name</label><input className="form-control border-0" type="text" placeholder="what's ya name" /></div>
                                    <div className="mb-3"><label className="form-label">Product Rating</label><select className="form-select py-2">
                                        <optgroup label="Rate this product">
                                            <option value={5} selected>5</option>
                                            <option value={4}>4</option>
                                            <option value={3}>3</option>
                                            <option value={2}>2</option>
                                            <option value={1}>1</option>
                                        </optgroup>
                                        </select></div>
                                    <div className="mb-3"><label className="form-label">Review Title</label><input className="form-control border-0" type="text" placeholder="add a title" /></div>
                                    <div className="mb-4"><label className="form-label">Body of review</label><textarea className="form-control border-0" placeholder="What do you think?" rows={4} defaultValue={""} /></div><button className="btn btn-dark btn-special border-0" type="button">Submit review</button>
                                    </form>
                                </div>
                                <div className="comment mt-5">
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
                                </div>
                                <div className="comment mt-4">
                                <hr />
                                <h6>Rated <strong>4/5</strong> By <strong>John doe</strong></h6>
                                <h3 className="my-2">This is the title of the comment!</h3>
                                <p className="mt-0">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a,</p>
                                <p className="text_small text-dark">posted on <strong>20-05-2019</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default Product