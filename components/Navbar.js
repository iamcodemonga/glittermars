import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Navbar = () => {

    const router = useRouter();

    useEffect(() => {
        window.onclick = function(event) {
            let cartbar = document.querySelector('.cart-bar');
            let cartbox = document.querySelector('.cart-box');
            let cartwrapper = document.querySelector('.cart-wrapper');
    
            if (event.target == cartbox) {
              cartwrapper.style.opacity = '0';
              setTimeout(()=>{
                  cartbox.style.width = "0";
                  cartbar.style.width = '0';
              },250)
            }
          }
    }, [])

    const handleOpenCart_lg = (e) => {
        e.preventDefault();
        let cartbar = document.querySelector('.cart-bar');
        let cartbox = document.querySelector('.cart-box');
        let cartwrapper = document.querySelector('.cart-wrapper');
        cartbox.style.width = "100%";
        cartbar.style.width = '500px';
        setTimeout(() => {
            cartwrapper.style.opacity = '1';
        }, 400);
    }

    const handleOpenCart = (e) => {
        e.preventDefault();
        let cartbar = document.querySelector('.cart-bar');
        let cartbox = document.querySelector('.cart-box');
        let cartwrapper = document.querySelector('.cart-wrapper');
        cartbar.style.width = '100%';
        setTimeout(() => {
            cartbox.style.width = "100%";
            cartwrapper.style.opacity = '1';
        }, 400);
    }

    const handleOpenSearch_lg = (e) => {
        e.preventDefault();
        let searchbar = document.querySelector('.searchbar');
        let searchwrapper = document.querySelector('.search-wrapper');
        searchbar.style.width = '100%';
        setTimeout(() => {
            searchwrapper.style.opacity = '1';
        }, 300);
    }

    const handleOpenSearch = (e) => {
        e.preventDefault();
        let searchbar = document.querySelector('.searchbar');
        let searchwrapper = document.querySelector('.search-wrapper');
        searchbar.style.width = '100%';
        setTimeout(() => {
            searchwrapper.style.opacity = '1';
        }, 300);
    }

  return (
        <header id="topbar" className="fixed-top">
            <div className="w-100 bg-success d-flex justify-content-center align-items-center text-white extra-tops">
                <p className="mb-0 text_small text-white">We are currently offering 20% off of any purchase</p>
            </div>
            <div className="w-100 d-flex justify-content-around align-items-center extra-tops">
                <div className="d-none d-lg-block">
                    <a data-bs-toggle="tooltip" data-bss-tooltip data-bs-placement="bottom" className="me-3 bar-link" href="tel:07066340180" title="call now" target='_blank'>+2347066340180</a>
                    <a data-bs-toggle="tooltip" data-bss-tooltip data-bs-placement="bottom" className="bar-link" href="mailto:codemonha@gmail.com" title="send us mails" target='_blank'>support@glittermars.com</a>
                </div>
                <div>
                    <Link href='/auth/login' legacyBehavior>
                        <a className="me-3 bar-link">Login</a>
                    </Link>
                    <Link href='/auth/register' legacyBehavior>
                        <a className="me-3 bar-link">Register</a>
                    </Link>
                    <Link href='/account' legacyBehavior>
                        <a className="bar-link">My Account</a>
                    </Link>
                </div>
            </div>
            <nav className="navbar navbar-light navbar-expand-lg py-2">
                <div className="container">
                    <Link href='/' className='navbar-brand fw-bolder'>Glittermars</Link>
                    <div>
                        <button className="btn d-lg-none nav-search-btn" type="button" onClick={handleOpenSearch}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style={{fontSize: 25, color: '#050609'}}>
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="btn d-lg-none position-relative nav-cart-btn" type="button" onClick={handleOpenCart}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" style={{fontSize: 25, color: '#050609'}}>
                                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="badge rounded-pill bg-success position-absolute cartbadge">3</span>
                        </button>
                        <button data-bs-toggle="collapse" className="navbar-toggler border-0 shadow-none" data-bs-target="#navcol-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                                <path d="M4 8H20M4 16H20" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navcol-2">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link href='/' legacyBehavior>
                                    <a className={router.pathname == '/' ? "nav-link active" : "nav-link"}>Home</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href='/shop' legacyBehavior>
                                    <a className={router.pathname == "/shop" || router.pathname == "/shop/clothing" || router.pathname == "/shop/accessories" || router.pathname == "/shop/shoes" || router.pathname == "/shop/jewelries" ? "nav-link active" : "nav-link"}>Shop</a>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Categories&nbsp;</a>    
                                <div className="dropdown-menu">
                                    <Link href='/shop/clothing' legacyBehavior>
                                        <a className={router.pathname == "/shop/clothing" ? "dropdown-item active" : "dropdown-item"}>Clothing</a>
                                    </Link>
                                    <Link href='/shop/jewelries' legacyBehavior>
                                        <a className={router.pathname == "/shop/jewelries" ? "dropdown-item active" : "dropdown-item"}>Jewelries</a>
                                    </Link>
                                    <Link href='/shop/shoes' legacyBehavior>
                                        <a className={router.pathname == "/shop/shoes" ? "dropdown-item active" : "dropdown-item"}>Shoes</a>
                                    </Link>
                                    <Link href='/shop/accessories' legacyBehavior>
                                        <a className={router.pathname == "/shop/accessories" ? "dropdown-item active" : "dropdown-item"}>Accessories</a>
                                    </Link>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="mailto:codemonga@gmail.com" target="_blank">Contact</a>
                            </li>
                            <li className="nav-item">
                                <Link href='/about' legacyBehavior>
                                    <a className={router.pathname == '/about' ? "nav-link active" : "nav-link"}>About</a>
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto d">
                            <li className="nav-item d-none d-lg-block">
                                <Link className="nav-link search-link" href='#' onClick={(e) => handleOpenSearch_lg(e)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="me-1">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z" fill="currentColor" />
                                        </svg>Search
                                </Link>
                            </li>
                            <li className="nav-item d-none d-lg-block">
                                <Link className="nav-link cart-link" href='#' onClick={(e) => handleOpenCart_lg(e) }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="me-1 mb-1">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z" fill="currentColor" />
                                            <path d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z" fill="currentColor" />
                                            <path d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z" fill="currentColor" />
                                        </svg>Cart
                                        <span className="badge rounded-pill bg-success ms-1">3</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
  )
}

export default Navbar