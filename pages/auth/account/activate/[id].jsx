import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { withRouter } from "next/router";
import { signup } from "../../../../actions/auth";

const ActivateAccount = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    error: "",
    loading: false,
    success: false,
    showButton: true,
  });

  const { name, token, error, loading, success, showButton } = values;

  useEffect(() => {
    let token = router.query.id;
    if (token) {
      const { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, [router]);

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });
    signup({ token }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          loading: false,
          showButton: false,
        });
      } else {
        setValues({
          ...values,
          loading: false,
          success: true,
          showButton: false,
        });
      }
    });
  };

  const showLoading = () => (loading ? <h2>Loading...</h2> : "");

  return (
    <div className='sign'>
      <div className='sign-container p-5'>
        <div className='container'>
          {showLoading()}
          {error && error}
        </div>
        {success ? (
          <h3 className='pb-4 text-center'>
            你好, {name}！准备好激活你的账号了吗？
          </h3>
        ) : (
          <h3>Hi, {name}!你的账号已激活！Let's Jam！</h3>
        )}
        {showButton && (
          <button className='form-btn' onClick={clickSubmit}>
            激活账户
          </button>
        )}
      </div>
    </div>
  );
};

export default withRouter(ActivateAccount);
