import SignupComponent from "../components/auth/SignupComponent";

const Signup = () => {
  return (
    <div className='sign'>
      <div className='sign-container bg-white my-4 p-3'>
        <h2 className='text-center my-4'>新用户注册</h2>
        <SignupComponent />
      </div>
    </div>
  );
};

export default Signup;
