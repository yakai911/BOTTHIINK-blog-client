import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";
import Link from "next/link";
import classNames from "classnames";

const SigninComponent = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    message: "",
    error: "",
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && router.push("/");
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: "" });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //save user token to cookie
        //save user info to localstorage
        //authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            router.push(`/admin`);
          } else {
            router.push("/user");
          }
        });
      }
    });
  };

  const showError = () =>
    error ? <div className='alert alert-danger'>{error}</div> : "";

  const showLoading = () =>
    loading ? <div className='alert alert-info'>正在加载...</div> : "";

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit} className='sign-form'>
        <div className='form-group'>
          <label htmlFor='inputEmail'>邮箱</label>
          <input
            id='inputEmail'
            className='form-input'
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            placeholder='请输入您的邮箱'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='inputEmail'>密码</label>
          <input
            type='password'
            className='form-input'
            name='password'
            value={password}
            onChange={handleChange}
            placeholder='请输入您的密码'
          />
        </div>
        <button type='submit' className='form-btn'>
          登 录
        </button>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showForm && signinForm()}
      <Link href='/auth/password/forgot'>
        <span
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "#0879bf !important",
            margin: "10px 0 25px",
          }}>
          忘记密码
        </span>
      </Link>
    </>
  );
};

export default SigninComponent;
