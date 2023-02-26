import Link from 'next/link';
import Image from 'next/image';

const TopCategories = () => {
  return (
    <section id="homeCategory" className="my-5 pb-5">
        <div className="container mb-5">
            <h2 className="mb-4">Hot Categories</h2>
            <div className="row gx-3 gy-3">
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                    <Link className="text-decoration-none category-link" href="/shop/clothing">
                        <div className="cartegory-box d-flex justify-content-center align-items-center position-relative">
                            <div className="w-100 h-100 position-absolute category-overlay" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000}} />
                            <div className="category-border d-flex justify-content-center align-items-center">
                                <button className="btn btn-light" type="button">Clothing</button>
                            </div>
                            <Image className="h-100 w-100 category-img" style={{backgroundColor: '#3c0000', objectFit: 'cover'}} src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" fill />
                        </div>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                    <Link className="text-decoration-none category-link" href="/shop/jewelries">
                        <div className="cartegory-box d-flex justify-content-center align-items-center position-relative">
                            <div className="w-100 h-100 position-absolute position-absolute" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000}} />
                                <div className="category-border d-flex justify-content-center align-items-center">
                                    <button className="btn btn-light" type="button">Jewelries</button>
                                </div>
                                <Image className="h-100 w-100 category-img" style={{backgroundColor: '#3c0000', objectFit: 'cover'}} src="https://images.pexels.com/photos/3266700/pexels-photo-3266700.jpeg?auto=compress&cs=tinysrgb&w=1600" fill />
                        </div>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                    <Link className="text-decoration-none category-link" href="/shop/shoes">
                        <div className="cartegory-box d-flex justify-content-center align-items-center position-relative">
                            <div className="w-100 h-100 position-absolute position-absolute" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000}} />
                                <div className="category-border d-flex justify-content-center align-items-center">
                                    <button className="btn btn-light" type="button">Shoes</button>
                                </div>
                                <Image className="h-100 w-100 category-img" style={{backgroundColor: '#3c0000', objectFit: 'cover'}} src="https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1600" fill />
                        </div>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6">
                    <Link className="text-decoration-none category-link" href="/shop/accessories">
                        <div className="cartegory-box d-flex justify-content-center align-items-center position-relative">
                            <div className="w-100 h-100 position-absolute position-absolute" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000}} />
                                <div className="category-border d-flex justify-content-center align-items-center">
                                    <button className="btn btn-light" type="button">Accessories</button>
                                </div>
                                <Image className="h-100 w-100 category-img" style={{backgroundColor: '#3c0000', objectFit: 'cover'}} src="https://images.pexels.com/photos/158741/gshock-watch-sports-watch-stopwatch-158741.jpeg?auto=compress&cs=tinysrgb&w=800" fill />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default TopCategories