import Link from 'next/link';
import Image from 'next/image';
import Navbar from 'components/Navbar';
import CartBar from '@/components/Cartbar';
import SearchBar from '@/components/Searchbar';
import Banner from 'components/banners/ShopBanner'
import Footer from 'components/Footer';
import { bestProducts } from '@/components/JsonData';

const Shop = () => {
  return (
    <>
        <SearchBar />
        <CartBar />
        <Navbar />
        <Banner />
        <section className="py-5">
            <div className="container">
                <div className="row gx-3">
                    <div className="col-lg-3 col-xl-3 col-xxl-3 d-none d-lg-block">
                        <div>
                            <div className="shop-cartigory">
                                <h3>Categories</h3>
                                <p><Link className="active" href="/shop">All Products</Link></p>
                                <p><Link href="/shop/clothing">Clothing</Link></p>
                                <p><Link href="/shop/jewelries">Jewelries</Link></p>
                                <p><Link href="/shop/shoes">Shoes</Link></p>
                                <p><Link href="/shop/accessories">Accessories</Link></p>
                            </div>
                            <div>
                                <h3>Pricing</h3>
                                <div className="price-filter">
                                    <form>
                                        <label className="form-label">Minimum price($)
                                            <input className="form-control border-0" type="number" placeholder="add minimum price" value={0} />
                                        </label>
                                        <label className="form-label mb-3">Maximum price($)
                                            <input className="form-control border-0" type="number" placeholder="add maximum price" value={0} />
                                        </label>
                                        <button className="btn btn-dark btn-special w-100" type="submit">Filter</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-9 col-xl-9 col-xxl-9">
                        <div className="w-100 d-flex justify-content-end mb-2 mt-lg-5">
                            <div className="mb-0">
                                <select className="form-select" value={'date'}>
                                    <option value="none" selected>sort by</option>
                                    <option value="date">date</option>
                                    <option value="trending">trending</option>
                                    <option value="best-selling">best-selling</option>
                                </select>
                            </div>
                        </div>
                        <div className="row gx-4 gy-4">
                            { bestProducts && bestProducts.map((product, index) => <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4" key={index}>
                                <div className="card product-card-grid">
                                <div className="position-relative">
                                    {!product.instock && <button className="btn btn-danger btn-sm disabled position-absolute" type="button" style={{right: 0}} disabled>sold out</button>}
                                    <Link href={product.instock ? "/product/675832" : "#"}>
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
                </div>
            </div>
        </section>
        <Footer />
    </>
  )
}

export default Shop