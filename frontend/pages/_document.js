import Document, { Html, Head, Main, NextScript } from "next/document";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

class MyDocument extends Document {
  setGoogleTags() {
    if (publicRuntimeConfig.PRODUCTION) {
      return {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-E4PDHZQWJF');
        `
      };
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="shortcut icon" href="favicon.ico" />
          <link rel="stylesheet" href="/css/nprogress.css" />
          <script data-ad-client="ca-pub-2228523188784689" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-E4PDHZQWJF"></script>
          <script dangerouslySetInnerHTML={this.setGoogleTags()} />
        </Head>{" "}
        <body>
          <Main />
          <NextScript />
        </body>{" "}
      </Html>
    );
  }
}

export default MyDocument;
