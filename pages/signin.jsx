import SigninComponent from "../components/auth/SigninComponent";
import Link from "next/link";

const Signin = () => {
  return (
    <div className='sign'>
      <div className='sign-container'>
        <h2 className='text-center my-4'>登录</h2>
        <p className='text-center'>
          还没有账号？点击
          <Link href='/signup'>
            <span
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#0879bf",
              }}>
              此处
            </span>
          </Link>
          注册
        </p>
        <SigninComponent />
      </div>
    </div>
  );
};

export default Signin;
