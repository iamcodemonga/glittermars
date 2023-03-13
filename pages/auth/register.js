import CartBar from "@/components/Cartbar"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/Searchbar";
import Form from "@/components/forms/RegisterForm"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/features/authSlice';

const register = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser())
    })

    return (
        <>
            <SearchBar />
            <CartBar />
            <Navbar />
            <Form />
            <Footer />
        </>
    )
}

export default register