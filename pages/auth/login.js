import CartBar from "@/components/Cartbar"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import SearchBar from "@/components/Searchbar";
import Form from '@/components/forms/LoginForm';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router"
import { initializeCart } from "@/features/cartSlice";

const login = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem('id')){
            router.push('/')
            return
        }
        dispatch(initializeCart())
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

export default login