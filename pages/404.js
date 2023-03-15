import Link from 'next/link';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/features/authSlice';
import { initializeCart } from '@/features/cartSlice';

const NotFound = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(initializeCart())
  })

  return (
    <>
        <Navbar />
        <section className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
            <div>
                <h1 className="fw-bolder">Oops...404 ERROR</h1>
                <p>Page not found, check your url and try again.</p>
                <Link className="btn btn-dark" role="button" style={{background: '#3c0000'}} href="/">continue shopping</Link>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default NotFound