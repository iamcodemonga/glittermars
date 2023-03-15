import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Cartbar from '@/components/Cartbar';
import Searchbar from '@/components/Searchbar';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchUser } from '@/features/authSlice';
import { initializeCart } from '@/features/cartSlice';

const About = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchUser())
      dispatch(initializeCart())
    })

  return (
    <>
        <Searchbar />
        <Cartbar />
        <Navbar />
        <section className="mb-5 pt-5" style={{marginTop: 100}}>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-7 col-xxl-7">
                        <h1>We are glittermars, we sell fashion, beauty, treasures and every other thing that glitters.</h1>
                        <img className="w-100" src="https://images.pexels.com/photos/3810792/pexels-photo-3810792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-5 col-xxl-5">
                        <p className="mb-5 mt-5">One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame.</p>
                        <img className="w-100 mb-5" src="https://images.pexels.com/photos/776615/pexels-photo-776615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                        <img className="w-100" src="https://images.pexels.com/photos/3205570/pexels-photo-3205570.jpeg?auto=compress&cs=tinysrgb&w=1600" />
                    </div>
                </div>
            </div>
        </section>
        <section className="pb-5 mb-5">
            <iframe allowFullScreen frameBorder={0} loading="lazy" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDx7I6QD7YXBaXyjnaBQsfNQlYeIlSwGHo&q=Nigeria&zoom=11&maptype=satellite" width="100%" height={600} />
        </section>
        <Footer />
    </>
  )
}

export default About