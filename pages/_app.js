import 'styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cartReducer from '../features/cartSlice'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import NextNProgress from 'nextjs-progressbar'

const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})

const App = ({ Component, pageProps }) =>  {
  return (
    <>
      <Head>
          <title>glittermars</title>
          <meta name="description" content="Fashion and luxury all in one place, the biggest e-commerce platform for fashion worldwide" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/shopping-cart.png" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></Script>
      <Provider store={store}>
          <NextNProgress color="#3c0000" startPosition={0.7} stopDelayMs={200} height={7} showOnShallow={true} />
          <Component {...pageProps} />
          <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
      </Provider>
    </>
  )
}

export default App;
