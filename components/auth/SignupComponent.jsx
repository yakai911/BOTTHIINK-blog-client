import { useState, useEffect } from "react";
import { signup, isAuth } from "../../actions/auth";

const SignupComponent = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const {
    username,
    email,
    password,
    error,
    loading,
    message,
    showForm,
  } = values;

  useEffect(() => {
    isAuth() && router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { username, email, password };
    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          username: "",
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
      <form onSubmit={handleSubmit} className='form-login'>
        <div className='form-group'>
          <label htmlFor='inputUsername' className='sr-only form-label'>
            用户名
          </label>
          <input
            id='inputUsername'
            type='text'
            name='username'
            className='form-control form-input'
            value={username}
            onChange={handleChange}
            placeholder='请输入您的用户名'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='inputEmail' className='sr-ony form-label'>
            邮箱
          </label>
          <input
            id='inputEmail'
            className='form-control form-input'
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            placeholder='请输入您的邮箱'
          />
        </div>
        <div className='form-group mb-4'>
          <label htmlFor='inputEmail' className='sr-ony form-label'>
            密码
          </label>
          <input
            type='password'
            className='form-control form-input'
            name='password'
            value={password}
            onChange={handleChange}
            placeholder='请输入您的密码'
          />
        </div>
        <div>
          <button className='form-btn'>注册</button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </>
  );
};

export default SignupComponent;
