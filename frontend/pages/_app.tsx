import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider, useDispatch } from 'react-redux'
import { store } from '../redux/store'
import { useEffect } from 'react'
import { getMe } from '../utils'
import { ReactElement } from 'react'
import { PopupProvider } from '../contexts/PopupProvider'
import { ModalProvider } from '../contexts/ModalProvider'
import { ReactNode } from 'react'
import { NextPage } from 'next'
import { setMe } from '../redux/me/meActions'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return(
    <Provider store={store}>
      <AuthLayer>
        <ModalProvider>
          <PopupProvider>
            {getLayout(<Component {...pageProps} />)}
          </PopupProvider>
        </ModalProvider>
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
    } else {
      dispatch(setMe(null));
    }
  }, []);

  return(
    <>
      {children}
    </>
  );
}

export default MyApp
