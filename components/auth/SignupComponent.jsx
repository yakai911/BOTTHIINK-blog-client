import React, { useState } from "react";
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
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            name='username'
            value={username}
            onChange={handleChange}
            placeholder='用户名'
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            value={email}
            onChange={handleChange}
            placeholder='邮箱'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
            placeholder='密码'
          />
        </div>
        <div>
          <button className='btn btn-primary'>注册</button>
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
