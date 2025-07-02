// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Google AdSense verification meta tag */}
        <meta name="google-adsense-account" content="ca-pub-3182066441920648" />

        {/* Google AdSense script - must be raw and server rendered */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3182066441920648"
     crossorigin="anonymous"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
