import Head from 'next/head';
import SearchBar from 'components/Searchbar';
import CartBar from '@/components/Cartbar';
import Navbar from 'components/Navbar';
import Banner from 'components/banners/HomeBanner';
import NewProducts from 'components/datalist/NewProducts';
import BestSellingProducts from '@/components/datalist/BestSellingProducts';
import HomeCTA from 'components/banners/HomeCTA';
import Categories from 'components/datalist/TopCategories';
import Footer from 'components/Footer';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initializeCart } from '@/features/cartSlice'

export default function Home({ latests, bestProducts, user }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCart())
  })

  return (
    <>
      <SearchBar />
      <CartBar user={user} product={null} cartQuantity={0} />
      <Navbar user={user} />
      <Banner />
      <NewProducts latests={latests} />
      {bestProducts.length > 0 && <BestSellingProducts bestProducts={bestProducts} />}
      <HomeCTA />
      <Categories />
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const { cookie } = req.headers;
    const URL = process.env.API_ROOT;
    try {
        const user = await axios(`${URL}/user/`, { headers: { cookie: cookie || '' } } );
        const newData = await axios(`${URL}/products/new`);
        const bestData = await axios(`${URL}/products/trending`);
        return {
          props: { latests: newData.data, bestProducts: bestData.data, user: user.data }
        }
    } catch (error) {
        console.log(error)
    }
}
