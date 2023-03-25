import Link from 'next/link';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const Thanks = () => {
    return (
        <>
            <Navbar />
            <section className="w-100 min-vh-100 d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="fw-bolder text-danger">PAYMENT CANCELLED?</h1>
                    <p style={{maxWidth: '700px'}}>We noticed you didn't confirm your payment and we are here to know if you experience any inconvinience in our system! if so, please don't forget to contact our any customer care agents, Thank you.</p>
                    <Link className="btn btn-dark" role="button" style={{background: '#3c0000'}} href="/shop">continue shopping</Link>
                </div>
            </section>
            <Footer />
        </>
      )
}

export default Thanks