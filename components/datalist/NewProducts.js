import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cartSlice';
// import { latests } from 'components/JsonData';

const NewProducts = ({ latests }) => {

    const dispatch = useDispatch();

    const handleSlide = () => {
        const productContainers = [...document.querySelectorAll('.product-container')];
        const nextbtn = [...document.querySelectorAll('.nextbtn')];
        const prevbtn = [...document.querySelectorAll('.prevbtn')];

        productContainers.forEach((item, i) => {
            let containerDimentions = item.getBoundingClientRect();
            let containerWidth = containerDimentions.width;
            // let containerWidth = 390;
            
            nextbtn[i].addEventListener('click', () => {
                item.scrollLeft += containerWidth;
            });
            
            prevbtn[i].addEventListener('click', () => {
                item.scrollLeft -= containerWidth;
            });
        });
    }

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        return;
    }

    useEffect(() => {
        handleSlide()
    },[])

  return (
    <section id="latestProducts" className="my-5">
        <div className="container pt-0">
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className="my-0">Trending products</h2>
                <Link className="btn btn-dark btn-sm" role="button" href="/shop">View all</Link>
            </div>
            <div className="position-relative">
                <div className="product-container d-flex">
                    {latests && latests.slice(0,6).map((latest, index) => <div className="card product-card me-2" key={index}>
                        <div className="position-relative">
                            {latest.quantity > 0 ? <button className="btn btn-info btn-sm disabled position-absolute" type="button" style={{right: 0}} disabled>in stock</button> : <button className="btn btn-secondary btn-sm disabled position-absolute" type="button" style={{right: 0}} disabled>sold out</button>}
                            <Link href={`/product/${latest._id}`} passHref>
                                <Image className="img-fluid" src={latest.images.split(',')[0]} style={{aspectRatio: '5/4', objectFit: 'cover'}} width={500} height={400} />
                            </Link>
                        </div>
                        <div className="card-body px-0">
                            <div className="mb-2">
                                <span className="text-success fw-bold text_small">${(latest.price*0.8).toFixed(2)}</span>
                                <span className="text-danger fw-bold ms-2 text_small">
                                    <span style={{textDecoration: 'line-through'}}>${latest.price}</span>
                                </span>
                            </div>
                            <Link className="product-title" href={`/product/${latest._id}`}>
                                <h5 className="my-0">{latest.title.length < 30 ? `${latest.title.substring(0, 45)}` : `${latest.title.substring(0, 30)}...`}</h5>
                            </Link>
                            <button className="btn btn-dark mt-3 w-100 btn-special" type="button" onClick={(e) => handleAddToCart(latest)}>Add to Cart</button>
                        </div>
                    </div>)}
                </div>
                <p className="text-end mt-3">
                    <button className="btn fw-bolder prevbtn" type="button" style={{color: '#3c0000'}} onClick={handleSlide}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="me-1">
                            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>Previous
                    </button>
                    <button className="btn fw-bolder nextbtn" type="button" style={{color: '#3c0000'}} onClick={handleSlide}>Next
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="ms-1">
                            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </p>
            </div>
        </div>
    </section>
  )
}

export default NewProducts