import Link from 'next/link'

const HomeCTA = () => {
  return (
    <section id="homeParallax" className="hero-parallax" style={{backgroundImage: 'url(https://images.pexels.com/photos/147637/pexels-photo-147637.jpeg?auto=compress&cs=tinysrgb&w=1600)', backgroundPosition: 'center', backgroundSize: 'cover'}}>
        <div className="container d-flex justify-content-center align-items-center h-100">
            <div style={{maxWidth: 600}}>
                <h1 className="text-white">Smell good, attract your dream partner with a touch of Gabrielle chanel.</h1>
                <Link className="btn btn-light" role="button" href="/auth/register">sign up now!</Link>
            </div>
        </div>
    </section>
  )
}

export default HomeCTA