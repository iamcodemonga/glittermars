import Cartbar from "@/components/Cartbar"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/Searchbar";
import Form from '@/components/forms/LoginForm';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { initializeCart } from "@/features/cartSlice";
import axios from "axios";

const login = ({ user }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeCart())
    })

    return (
        <>
            <SearchBar />
            <Cartbar user={user} product={null} cartQuantity={0} />
            <Navbar user={user} />
            <Form />
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const { cookie } = req.headers;
    const URL = process.env.API_ROOT;

    try {
        const { data } = await axios(`${URL}/user`, { headers: { cookie: cookie || '' } })
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