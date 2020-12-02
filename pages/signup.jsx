import SignupComponent from "../components/auth/SignupComponent";
import MyBrand from "../components/MyBrand";

const Signup = () => {
  return (
    <div className='sign'>
      <div className='sign-container'>
        <div className='brand-container my-4'>
          <MyBrand />
        </div>
        <h2 className='text-center my-4'>新用户注册</h2>
        <SignupComponent />
      </div>
    </div>
  );
};

export default Signup;
