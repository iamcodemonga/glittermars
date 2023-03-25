import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Popup = ({ status, handleHide, user, product, cartQuantity, bulk }) => {

    const URL = process.env.NEXT_PUBLIC_API_ROOT;
    const cart = useSelector(state => state.cart)
    const router = useRouter();

    const handleStripe = async(e) => {
        e.preventDefault();
        const products = product ? [{...product, cartQuantity}] : cart.items;
        const userid = user ? user._id : "unassigned";
        try {
            const { data } = await axios.post(`${URL}/payments/stripe/create-checkout-session`, { products, userid })
            router.push(data.url)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        return;
    }

    return (
        <Modal show={status} onHide={handleHide}  size="sm"   aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton className='border-0' style={{backgroundColor: "#f3dcd1"}}>
                <Modal.Title id="contained-modal-title-vcenter"> </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: "#f3dcd1"}}>
                <h5 className='mt-0 mb-2 text-center'><Link href={bulk ? "/checkout?type=bulk": `/checkout?type=onetime&pid=${product._id}&qty=${cartQuantity}`} className='paylink fw-bold'>Pay on delivery</Link></h5>
                <h5 className='mt-4 mb-2 text-center'><Link href="/" className='paylink fw-bold' onClick={handleStripe}>Pay with stripe</Link></h5>
            </Modal.Body>
            <Modal.Footer className='border-0' style={{backgroundColor: "#f3dcd1"}}>

            </Modal.Footer>
        </Modal>
    )
}

export default Popup