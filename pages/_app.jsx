import "../styles/main.scss";
import Header from "../components/Header";
import "../node_modules/react-quill/dist/quill.snow.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
