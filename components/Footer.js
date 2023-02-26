import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
        <section className="newsletter-section d-flex justify-content-center w-100 px-3">
            <div className="newsletter">
                <h1 className="text-center">Join our newsletter today</h1>
                <p className="mb-4 text-center">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot.</p>
                <form>
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Add your email" />
                        <button className="btn btn-light" type="button">Submit</button>
                    </div>
                </form>
            </div>
        </section>
        <section className="mt-5 pt-2">
            <div className="container">
                <div className="row gx-4 gy-4 text-center">
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3">
                        <h4 className="mb-2 mt-0">About Us</h4>
                        <p className="mb-1"><Link href="/about">The company</Link></p>
                        <p className="mb-1"><Link href="/about">Terms &amp; conditions</Link></p>
                        <p className="mb-1"><Link href="/about">Trade policy</Link></p>
                        <p className="mb-1"><Link href="/about">FAQs</Link></p>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3">
                        <h4 className="mb-2 mt-0">Categories</h4>
                        <p className="mb-1"><Link href="/shop/clothing">Clothing</Link></p>
                        <p className="mb-1"><Link href="/shop/jewelries">Jewellries</Link></p>
                        <p className="mb-1"><Link href="/shop/accessories">Accessories</Link></p>
                        <p className="mb-1"><Link href="/shop/shoes">Shoes</Link></p>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3">
                        <h4 className="mb-2 mt-0">Help Centre</h4>
                        <p className="mb-1"><Link href="/about">Blog</Link></p>
                        <p className="mb-1"><Link href="/about">Careers</Link></p>
                        <p className="mb-1"><Link href="/about">customer care</Link></p>
                        <p className="mb-1"><Link href="/about">logistics</Link></p>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 col-xxl-3">
                        <h4 className="mb-2 mt-0">Contact Us</h4>
                        <p className="mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="me-1">
                                <path d="M17.6569 16.6569C16.7202 17.5935 14.7616 19.5521 13.4138 20.8999C12.6327 21.681 11.3677 21.6814 10.5866 20.9003C9.26234 19.576 7.34159 17.6553 6.34315 16.6569C3.21895 13.5327 3.21895 8.46734 6.34315 5.34315C9.46734 2.21895 14.5327 2.21895 17.6569 5.34315C20.781 8.46734 20.781 13.5327 17.6569 16.6569Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M15 11C15 12.6569 13.6569 14 12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>Headquarters, Independence layout, presidential road, NIGERIA
                        </p>
                        <p className="mb-1">
                            <a href="mailto:support@glittermars.com" target='_blank'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="me-1">
                                    <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>support@glittermars.com
                            </a>
                        </p>
                        <p className="mb-1">
                            <a href="tel:07066340180" target='_blank'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="me-1">
                                    <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>234-70-6634-0180
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <h6 className="mt-5 text-center text-white-50">Developed by <a href="https://twitter.com/codemonga" target="_blank">@codemonga</a></h6>
    </footer>
  )
}

export default Footer