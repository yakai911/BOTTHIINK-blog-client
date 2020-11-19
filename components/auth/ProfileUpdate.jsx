import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, update } from "../../actions/user";

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    password: "",
    error: false,
    success: false,
    loading: false,
    photo: "",
    userData: "",
  });

  const token = getCookie("token");
  const {
    username,
    name,
    email,
    password,
    about,
    error,
    success,
    loading,
    photo,
    userData,
  } = values;

  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    let userFormData = new FormData();
    userFormData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userData: userFormData,
      error: false,
      success: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    update(token, userData).then((data) => {
      if (data.error) {
        setValues({
          ...value,
          error: data.error,
          success: false,
          loading: false,
        });
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            username: data.username,
            name: data.name,
            email: data.email,
            about: data.about,
            password: "",
            success: true,
            loading: false,
          });
        });
      }
    });
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label className='btn btn-outline-info'>
          用户头像
          <input
            type='file'
            onChange={handleChange("photo")}
            accept='image/*'
            hidden
          />
        </label>
      </div>
      <div className='form-group'>
        <label className='text-muted'>用户ID</label>
        <input
          type='text'
          onChange={handleChange("username")}
          value={username}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>用户名</label>
        <input
          type='text'
          onChange={handleChange("name")}
          value={name}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          onChange={handleChange("email")}
          value={email}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>关于</label>
        <textarea
          type='text'
          onChange={handleChange("about")}
          value={about}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>密码</label>
        <input
          type='password'
          onChange={handleChange("password")}
          value={password}
          className='form-control'
        />
      </div>
      <div>
        <button type='submit' className='form-btn'>
          提交
        </button>
      </div>
    </form>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? "" : "none" }}>
      档案更新成功
    </div>
  );

  const showLoading = () => (
    <div
      className='alert alert-info'
      style={{ display: loading ? "" : "none" }}>
      loading...
    </div>
  );

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <img
              src={`${process.env.NEXT_PUBLIC_API}/user/photo/${username}`}
              alt='user profile'
              className='img img-fluid img-thumbnail mb-3'
              style={{ maxHeight: "auto", maxWidth: "100%" }}
            />
          </div>
          <div className='col-md-8 mb-5'>
            {showSuccess()}
            {showError()}
            {showLoading()}
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
