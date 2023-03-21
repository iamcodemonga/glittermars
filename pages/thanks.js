import Link from 'next/link';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { initializeCart } from '@/features/cartSlice';
import axios from 'axios';

const Thanks = () => {
    return (
        <>
            <Navbar />
            <section className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="fw-bolder text-success">THANK YOU!!!</h1>
                    <p style={{maxWidth: '700px'}}>We really appreciate your trust and confidence in our services as your product is on its way to your location! It has been a great honour to work with you and we look forward to satisfying you more in the future.</p>
                    <Link className="btn btn-dark" role="button" style={{background: '#3c0000'}} href="/shop">continue shopping</Link>
                </div>
            </section>
            <Footer />
        </>
      )
}

export default Thanks