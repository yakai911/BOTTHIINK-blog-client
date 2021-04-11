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
    message ? (
      <div style={{ width: "70%" }}>
        <h3>{message}</h3>
      </div>
    ) : (
      ""
    );

  const passwordForgotForm = () => (
    <form onSubmit={handleSubmit} className='sign-form'>
      <div className='form-group'>
        <input
          type='email'
          onChange={handleChange("email")}
          className='form-input'
          value={email}
          placeholder=' 请输入账号邮箱'
          required
        />
      </div>
      <button className='form-btn'>发送验链接</button>
    </form>
  );

  return (
    <div className='sign'>
      <div className='sign-container  my-4 p-5'>
        <div className='brand-container mb-4'>
          <MyBrand width={45} height={45} />
        </div>
        <h2 className='sign-title' style={{ margin: "50px auto" }}>
          忘记了密码？
        </h2>
        {showError()}
        {showMessage()}
        {showForm && passwordForgotForm()}
      </div>
    </div>
  );
};

export default ForgotPassword;
