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

export default function Home() {

  return (
    <>
      <SearchBar />
      <CartBar />
      <Navbar />
      <Banner />
      <NewProducts />
      <BestSellingProducts />
      <HomeCTA />
      <Categories />
      <Footer />
    </>
  )
}
