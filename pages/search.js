import Link from 'next/link';
import Image from 'next/image';
import Navbar from 'components/Navbar';
import Cartbar from '@/components/Cartbar';
import Searchbar from '@/components/Searchbar';
import Banner from 'components/banners/ShopBanner'
import Footer from 'components/Footer';
import { bestProducts  } from '@/components/JsonData';

const search = () => {
    return (
        <>
            <Searchbar />
            <Cartbar />
            <Navbar />
            <section style={{padding: '100px 0', marginTop: 100}}>
                <div className="container">
                    <h1>6 Results found</h1>
                    <div className="row gx-4 gy-4 mt-3">
                        { bestProducts && bestProducts.map((product, index) => <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4" key={index}>
                            <div className="card product-card-grid">
                                <div className="position-relative">
                                    {!product.instock && <button className="btn btn-danger btn-sm disabled position-absolute" type="button" style={{right: 0}} disabled>sold out</button>}
                                    <Link href={product.instock ? "/product" : "#"}>
                                    <Image className="img-fluid" src={product.image} style={{aspectRatio: '5/4', objectFit: 'cover'}} width={500} height={400} />
                                    </Link>
                                </div>
                                <div className="card-body px-0">
                                    <div className="mb-2">
                                    <span className="text-success fw-bold text_small">${product.price*0.8}</span>
                                        <span className="text-danger fw-bold ms-2 text_small">
                                        <span style={{textDecoration: 'line-through'}}>${product.price}</span>
                                        </span>
                                    </div>
                                    <Link className="product-title" href={product.instock ? "/product" : "#"}>
                                        <h5 className="my-0">{product.title}</h5>
                                    </Link>
                                    <button className="btn btn-dark mt-3 w-100 btn-special" type="button">Add to Cart</button>
                                </div>
                            </div>
                        </div>)}
                    </div>
                    <p className="mt-4 text-center"><button className="btn btn-dark btn-special" type="button">Load more</button></p>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default search