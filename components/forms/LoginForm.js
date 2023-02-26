const LoginForm = () => {
    return (
        <section className="w-100 min-vh-100 d-flex align-items-center justify-content-center">
            <form className="special-form">
                <h2 className="text-center text-accent">LOGIN</h2>
                <div className="mb-3">
                    <label className="form-label mb-0">Email</label>
                    <input className="form-control" type="text" placeholder="e.g johndoe@gmail.com" />
                </div>
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <label className="form-label mb-0">Password</label>
                        <button className="btn btn-sm" type="button">show</button>
                    </div>
                    <input className="form-control" type="password" placeholder="xxxxxxx" />
                </div>
                <button className="btn btn-dark w-100" type="button" style={{backgroundColor: '#3c0000'}}>submit</button>
                <p className="mt-3 text_small">Click <a href="https://codemonga.bss.design" target="_blank">password</a> if you have forgotten your password!</p>
            </form>
        </section>
    )
}

export default LoginForm