import { useState, useEffect } from "react";
import { signup, isAuth, preSignup } from "../../actions/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";

const SignupComponent = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    isAuth() && router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    preSignup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValues({ ...values, error: false, [name]: value });
  };

  const showLoading = () =>
    loading ? <div className='alert alert-info'>Loading...</div> : "";

  const showError = () =>
    error ? <div className='alert alert-danger'>{error}</div> : "";

  const showMessage = () =>
    message ? <div className='alert alert-info'>{message}</div> : "";

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit} className='sign-form'>
        <div className='form-group'>
          <label htmlFor='inputUsername'>用户名</label>
          <input
            id='inputUsername'
            type='text'
            name='name'
            className='form-input'
            value={name}
            onChange={handleChange}
            placeholder='请输入您的用户名'
          />
        </div>
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
        <button className='form-btn'>注册</button>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
      <Link href='/auth/password/forgot'>
        <span
          style={{
            textDecoration: "underline",
            cursor: "pointer",
            color: "#0879bf !important",
            margin: "5px 0 20px",
          }}>
          忘记密码
        </span>
      </Link>
    </>
  );
};

export default SignupComponent;
