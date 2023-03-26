import Link from 'next/link';
import Image from 'next/image';
import Navbar from 'components/Navbar';
import Cartbar from '@/components/CartBar';
import Searchbar from '@/components/Searchbar';
import Footer from 'components/Footer';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { initializeCart } from '@/features/cartSlice';

const search = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(initializeCart())
    })

    return (
        <>
            <Searchbar />
            <Cartbar user={null} product={null} cartQuantity={0} />
            <Navbar />
            <section style={{padding: '100px 0', marginTop: 100}}>
                <div className="container">
                    <h1>6 Results found</h1>
                    <div className="row gx-4 gy-4 mt-3">
                    </div>
                    <p className="mt-4 text-center"><button className="btn btn-dark btn-special" type="button">Load more</button></p>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default search