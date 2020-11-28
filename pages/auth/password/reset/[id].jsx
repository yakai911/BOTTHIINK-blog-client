import { useState } from "react";
import { withRouter } from "next/router";
import { resetPassword } from "../../../../actions/auth";
import MyBrand from "../../../../components/MyBrand";

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    newPassword: "",
    error: "",
    message: "",
    showForm: true,
  });

  const { showForm, name, newPassword, error, message } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({
      newPassword,
      resetPasswordLink: router.query.id,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          showForm: false,
          newPassword: "",
        });
      } else {
        setValues({
          ...values,
          message: data.message,
          showForm: false,
          newPassword: "",
          error: false,
        });
      }
    });
  };

  const passwordResetForm = () => (
    <form onSubmit={handleSubmit} className='form-login'>
      <div className='form-group pt-5'>
        <input
          type='password'
          onChange={(e) =>
            setValues({ ...values, newPassword: e.target.value })
          }
          className='form-input'
          value={newPassword}
          placeholder=' 请输入新的密码'
          required
        />
      </div>
      <div>
        <button className='form-btn'>修改密码</button>
      </div>
    </form>
  );

  const showError = () =>
    error ? <div className='alert alert-danger'>{error}</div> : "";
  const showMessage = () =>
    message ? <div className='alert alert-success'>{message}</div> : "";

  return (
    <div className='sign'>
      <div className='sign-container my-4 p-5'>
        <div className='brand-container mb-4'>
          <MyBrand />
        </div>
        <h3 className='text-center' style={{ color: "#444" }}>
          重新设置密码
        </h3>
        {showError()}
        {showMessage()}
        {showForm && passwordResetForm()}
      </div>
    </div>
  );
};

export default withRouter(ResetPassword);
