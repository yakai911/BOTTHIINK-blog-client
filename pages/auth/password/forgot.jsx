import { useState } from "react";
import { forgotPassword } from "../../../actions/auth";
import MyBrand from "../../../components/MyBrand";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    message: "",
    error: "",
    showForm: true,
  });

  const { email, message, error, showForm } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, message: "", error: "", [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "" });
    forgotPassword({ email }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          message: data.message,
          email: "",
          showForm: false,
        });
      }
    });
  };

  const showError = () =>
    error ? <div className='alert alert-danger'>{error}</div> : "";
  const showMessage = () =>
    message ? <div className='alert alert-success'>{message}</div> : "";

  const passwordForgotForm = () => (
    <form onSubmit={handleSubmit} className='form-login'>
      <div className='form-group'>
        <input
          type='email'
          onChange={handleChange("email")}
          className='form-input form-control'
          value={email}
          placeholder=' 请输入账号邮箱'
          required
        />
      </div>
      <div>
        <button className='form-btn'>发送验证地址</button>
      </div>
    </form>
  );

  return (
    <div className='sign'>
      <div className='sign-container  my-4 p-5'>
        <div className='brand-container mb-4'>
          <MyBrand />
        </div>
        <h3 className='text-center' style={{ color: "#444" }}>
          忘记密码
        </h3>
        {showError()}
        {showMessage()}
        {showForm && passwordForgotForm()}
      </div>
    </div>
  );
};

export default ForgotPassword;
