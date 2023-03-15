import Head from 'next/head';
import SearchBar from 'components/Searchbar';
import CartBar from 'components/Cartbar';
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
import { fetchUser } from '@/features/authSlice';
import { initializeCart } from '@/features/cartSlice'

export default function Home({ latests, bestProducts }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(initializeCart())
  })

  return (
    <>
      <SearchBar />
      <CartBar />
      <Navbar />
      <Banner />
      <NewProducts latests={latests} />
      <BestSellingProducts bestProducts={bestProducts} />
      <HomeCTA />
      <Categories />
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const newData = await axios('http://localhost:3005/products/new');
  const bestData = await axios('http://localhost:3005/products/');

  return {
    props: { latests: newData.data, bestProducts: bestData.data }
  }
}
