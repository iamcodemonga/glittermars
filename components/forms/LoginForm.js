import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useState } from 'react';
import { toast } from 'react-toastify'
import BeatLoader from 'react-spinners/BeatLoader';

const LoginForm = () => {
    const router = useRouter();
    const [ user, setUser ] = useState({ email: "", password: "" });
    const [ show, setShow ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const server = process.env.NEXT_PUBLIC_SERVER;

    const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const data = await axios.post(`${server}/api/auth/login`, user, { withCredentials: true });
            // const { data } = await axios.post('/api/auth/login', user, { withCredentials: true });

            console.log(data)
            setLoading(false)

            // if(data.error) {
            //     toast.error(data.message, {
            //         position: "bottom-right",
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "colored",
            //     });
            //     setLoading(false)
            //     return;
            // }
    
            // toast.success(data.message, {
            //     position: "bottom-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            // });
            // setLoading(false)
            // setTimeout(() => {
            //     router.push("/account")
            // }, 1500);
            return;
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <section className="w-100 min-vh-100 d-flex align-items-center justify-content-center">
            <form className="special-form" onSubmit={handleLogin}>
                <h2 className="text-center text-accent">LOGIN</h2>
                <div className="mb-3">
                    <label className="form-label mb-0">Email</label>
                    <input className="form-control" type="email" placeholder="e.g johndoe@gmail.com" onChange={(e) => setUser((prev) => { return {...prev, email: e.target.value}})}  />
                </div>
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <label className="form-label mb-0">Password</label>
                        <button className="btn btn-sm" type="button" onClick={() => show ? setShow(false) : setShow(true)}>{show ? 'hide' : 'show'}</button>
                    </div>
                    <input className="form-control" type={show ? "text" : "password"} placeholder="xxxxxxx" onChange={(e) => setUser((prev) => { return {...prev, password: e.target.value}})} />
                </div>
                {loading ? <button className="btn btn-dark w-100" type="button" style={{backgroundColor: '#3c0000'}} disabled><BeatLoader size={7} color={"#f3dcd1"} loading={loading} aria-label="Loading Spinner" data-testid="loader" /></button> : <button className="btn btn-dark w-100" type="submit" style={{backgroundColor: '#3c0000'}}>submit</button>}
                <p className="mt-3 text_small">Click <a href="https://codemonga.com" target="_blank">password</a> if you have forgotten your password!</p>
            </form>
        </section>
    )
}

export default LoginForm