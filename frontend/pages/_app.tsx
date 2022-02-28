import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider, useDispatch } from 'react-redux'
import { store } from '../redux/store'
import { useEffect } from 'react'
import { getMe } from '../utils'
import { setMe } from '../redux/me/userActions'
import { ReactElement } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <Provider store={store}>
      <AuthLayer>
        <Component {...pageProps} />
      </AuthLayer>
    </Provider>
  )
}

const AuthLayer: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.accessToken;
    if(accessToken) {
      getMe().then(me => {
        
        dispatch(setMe(me));

      }).catch(console.error);
    }
  }, []);

  return(
    <>
      {children}
    </>
  );
}

export default MyApp
