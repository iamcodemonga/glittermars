import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import CartBar from '@/components/Cartbar'
import SearchBar from "@/components/Searchbar";
import Form from '@/components/forms/LoginForm';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { initializeCart } from "@/features/cartSlice";
import axios from "axios";
import cookie from 'cookie';

const login = ({ user }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(`user = ${user}`)
        dispatch(initializeCart())
    })

    return (
        <>
            <SearchBar />
            <CartBar user={user} product={null} cartQuantity={0} />
            <Navbar user={user} />
            <Form />
            <Footer />
        </>
    )
}

export async function getServerSideProps({ req }) {
    const { cookie } = req.headers;

    try {
        const { data } = await axios(`${process.env.CLIENT_ROOT}/api/user`, { headers: { cookie: cookie || '' } });

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

export default login