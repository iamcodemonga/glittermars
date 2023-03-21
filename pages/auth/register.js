import CartBar from "@/components/Cartbar"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/Searchbar";
import Form from "@/components/forms/RegisterForm"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { initializeCart } from "@/features/cartSlice";

const register = ({ user }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeCart())
    })

    return (
        <>
            <SearchBar />
            <CartBar />
            <Navbar user={user} />
            <Form />
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const { cookie } = req.headers;

    try {
        const { data } = await axios('http://localhost:3005/user', { headers: { cookie: cookie || '' } })
        if(data){
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
        return {
            props: {
                user: data
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export default register