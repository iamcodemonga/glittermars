import Link from 'next/link';

const ShopBanner = () => {
    return (
        <section className="d-flex justify-content-center align-items-center" style={{paddingTop: 150, height: '70vh', width: '100%', backgroundImage: 'url(https://images.pexels.com/photos/5650045/pexels-photo-5650045.jpeg?auto=compress&cs=tinysrgb&w=1600)', backgroundPosition: 'center', backgroundSize: 'cover'}}>
            <h3 className="mx-2 text-center bg-dark p-3 text-white">
                <strong>SHOP YOUR DREAMS TODAY!</strong>
            </h3>
        </section>

    )
}

export default ShopBanner;