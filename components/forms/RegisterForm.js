import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from 'react-spinners/BeatLoader';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/features/authSlice';

const RegisterForm = () => {

    const [ user, setUser ] = useState({ fullname: "", email: "", password: "" });
    const [ loading, setLoading ] = useState(false);
    const [ show, setShow ] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`http://localhost:3005/auth/register`, user, { withCredentials: true });
            if (data.error){
                setLoading(false);
                toast.error(data.message, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
            setLoading(false);
            toast.success(data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            dispatch(registerUser(data.user))
            setTimeout(() => {
                router.push('/account');
            }, 5000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleShow = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }

    return (
        <>
            <section className="w-100 min-vh-100 d-flex align-items-center justify-content-center">
                <form className="special-form" onSubmit={handleRegister}>
                    <h3 className="text-center text-accent">REGISTER</h3>
                    <div className="mb-3">
                        <label className="form-label mb-0">Name</label>
                        <input className="form-control" type="text" placeholder="e.g john doe" onChange={(e) => setUser((prev) => { return {...prev, fullname: e.target.value}})} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label mb-0">Email</label>
                        <input className="form-control" type="email" placeholder="e.g johndoe@gmail.com" onChange={(e) => setUser((prev) => { return {...prev, email: e.target.value}})} />
                    </div>
                    <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <label className="form-label mb-0">Password</label>
                            <button className="btn btn-sm" type="button" onClick={handleShow}>{show ? 'hide' : 'show'}</button>
                        </div>
                        <input className="form-control" type={show ? "text" : "password"} placeholder="xxxxxxx" onChange={(e) => setUser((prev) => { return {...prev, password: e.target.value}})} />
                    </div>
                    {loading ? <button className="btn btn-dark w-100" type="submit" style={{backgroundColor: '#3c0000'}} disabled><BeatLoader size={7} color={"#f3dcd1"} loading={loading} aria-label="Loading Spinner" data-testid="loader" /></button> : <button className="btn btn-dark w-100" type="submit" style={{backgroundColor: '#3c0000'}}>submit</button>}
                    <p className="text_small mt-3">By signing up, you have agreed to all our conditions!</p>
                </form>
            </section>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    )
}

export default RegisterForm