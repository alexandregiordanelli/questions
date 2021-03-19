import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'tailwindcss/tailwind.css'
import { katexCSS } from '../styles/katexCSS'
import { essentialCSS, CSS } from '../styles/globalCSS'
import { AppProps } from 'next/app'
import { AuthProvider } from 'lib/auth'
import * as gtag from '../lib/gtag'

NProgress.configure({ showSpinner: false })

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', (url: string) => {
  gtag.pageview(url)
  NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <style jsx global>
        {katexCSS}
      </style>
      <style jsx global>
        {essentialCSS}
      </style>
      <style jsx global>
        {CSS}
      </style>
    </AuthProvider>
  )
}
