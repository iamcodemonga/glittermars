import React from 'react'

const UploadForm = () => {
    return (
        <section className="w-100 min-vh-100 d-flex align-items-center justify-content-center">
            <form className="special-form">
                <h3 className="text-center text-accent">ADD PRODUCT</h3>
                <div className="mb-3">
                    <label className="form-label mb-0">Product Title</label>
                    <input className="form-control" type="text" placeholder="e.g A louis vuitton" />
                </div>
                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <label className="form-label mb-0">Product Image</label>
                        <button className="btn btn-sm" type="button">add</button>
                    </div>
                    <input className="form-control" type="text" placeholder="e.g https://imagelink.com/productimage" />
                </div>
                <div className="mb-3">
                    <label className="form-label mb-0">Product Price</label>
                    <input className="form-control" type="number" placeholder="e.g 200 ( in dollars )" />
                </div>
                <div className="mb-3">
                    <label className="form-label mb-0">Quantity available</label>
                    <input className="form-control" type="number" placeholder="e.g 50" />
                </div>
                <div className="mb-4">
                    <label className="form-label mb-0">Product category</label>
                    <select className="form-select">
                        <optgroup label="This is a group">
                            <option value="clothing" selected>clothing</option>
                            <option value="shoes">shoes</option>
                            <option value="accessories">accessories</option>
                            <option value="jewellries">jewellries</option>
                        </optgroup>
                    </select>
                </div>
                <button className="btn btn-dark w-100" type="button" style={{ backgroundColor: '#3c0000' }}>submit</button>
            </form>
        </section>
    )
}

export default UploadForm