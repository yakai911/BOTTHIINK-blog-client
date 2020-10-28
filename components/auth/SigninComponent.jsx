import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";

const SigninComponent = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    error: "",
    showForm: true,
  });

  const { email, password, error, loading, showForm } = values;

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
          router.push("/");
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
      <form onSubmit={handleSubmit}>
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
          <button type='submit' className='btn btn-primary'>
            登录
          </button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showForm && signinForm()}
    </>
  );
};

export default SigninComponent;
