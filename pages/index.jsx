import Layout from "../components/Layout";
import Link from "next/link";

const Index = () => {
  return (
    <Layout>
      <h2>index page</h2>
      <Link href='/Signup'>
        <a>注册</a>
      </Link>
    </Layout>
  );
};

export default Index;
