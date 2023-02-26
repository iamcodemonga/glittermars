import Link from 'next/link';

const HomeBanner = () => {
  return (
    <section id="homebanner" className="hero-carousel" style={{backgroundImage: 'url(https://images.pexels.com/photos/1557980/pexels-photo-1557980.jpeg?auto=compress&cs=tinysrgb&w=1600)', backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <div className="container">
            <div style={{maxWidth: 600}}>
                <h1 className="text-white">Smell good, attract your dream partner with a touch of Gabrielle chanel.</h1>
                <Link href="/shop" className="btn btn-info" role="button">Shop now</Link>
            </div>
        </div>
    </section>
  )
}

export default HomeBanner