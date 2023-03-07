import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const UploadForm = () => {

    const [ url, setUrl ] = useState('')
    const [ images, setImages ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [ price, setPrice ] = useState(1);
    const [ quantity, setQuantity ] = useState(0)
    const [ category, setCategory ] = useState('');
    const [ description, setDescription ] = useState('');

    const handleAddImage = () => {
        setImages((prev) => [ ...prev, url ]);
        setUrl('');
    }

    const handleUpload = async(e) => {
        e.preventDefault();
        let form = { images, title, price, quantity, category, description };
        try {
            const { data } = await axios.post('http://localhost:3005/products/create', form);
            if (data.error) {
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
            console.log(data.product);
            return
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
        <section className="w-100 min-vh-100 d-flex align-items-center justify-content-center my-5">
            <form className="special-form" onSubmit={(e) => handleUpload(e)}>
                <h3 className="text-center text-accent">ADD PRODUCT</h3>
                <div className="mb-3">
                    <label className="form-label mb-0">Product Title</label>
                    <input className="form-control" type="text" placeholder="e.g A louis vuitton" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <label className="form-label mb-0">Product Image</label>
                        <button className="btn btn-sm" type="button" onClick={handleAddImage}>add</button>
                    </div>
                    <input className="form-control" type="text" placeholder="e.g https://imagelink.com/productimage" value={url} onChange={(e) => setUrl(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label mb-0">Product Price</label>
                    <input className="form-control" type="number" placeholder="e.g 200 ( in dollars )" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label mb-0">Quantity available</label>
                    <input className="form-control" type="number" placeholder="e.g 50" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label mb-0">Product Description</label>
                    <textarea className='form-control' value={description} cols="30" rows="5" placeholder='write product description here..' onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>
                <div className="mb-4">
                    <label className="form-label mb-0">Product category</label>
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <optgroup label="This is a group">
                            <option value="clothing">clothing</option>
                            <option value="shoes">shoes</option>
                            <option value="accessories">accessories</option>
                            <option value="jewelries">jewellries</option>
                        </optgroup>
                    </select>
                </div>
                <button className="btn btn-dark w-100" type="submit" style={{ backgroundColor: '#3c0000' }}>submit</button>
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

export default UploadForm