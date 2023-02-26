const RegisterForm = () => {
    return (
        <section className="w-100 min-vh-100 d-flex align-items-center justify-content-center">
            <form className="special-form">
                <h3 className="text-center text-accent">REGISTER</h3>
                <div className="mb-3">
                    <label className="form-label mb-0">Name</label>
                    <input className="form-control" type="text" placeholder="e.g john doe" />
                </div>
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
                <p className="text_small mt-3">By signing up, you have agreed to all our conditions!</p>
            </form>
        </section>
    )
}

export default RegisterForm