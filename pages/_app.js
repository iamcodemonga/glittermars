import 'styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authReducer from '../features/authSlice'

const store = configureStore({
  reducer: {
    auth: authReducer
  }
})

const App = ({ Component, pageProps }) =>  {
  return (
    <>
      <Head>
          <title>glittermars</title>
          <meta name="description" content="Fashion and luxury all in one place, the biggest e-commerce platform for fashion worldwide" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"></link>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sail&amp;display=swap"></link>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></Script>
      <Provider store={store}>
          <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default App;
// const makeStore = () => store;
// const wrapper = createWrapper(makeStore)

// export default wrapper.withRedux(App)
