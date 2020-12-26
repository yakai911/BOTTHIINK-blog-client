import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Mybrand from "../MyBrand";
import Avatar from "../profile/Avatar";
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, update } from "../../actions/user";
import { UploadOutlined } from "@ant-design/icons";

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
    isAuth();
    init();
  }, []);

  const handleChange = (name) => (e) => {
    console.log(e.target.value);
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
          ...values,
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
    setTimeout(() => {
      setValues({
        ...values,
        success: false,
      });
    }, 1000);
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit} className='user-form'>
      <div className='form-group'>
        <label className='sr-ony form-label'>用户ID</label>
        <input
          type='text'
          onChange={handleChange("username")}
          value={username}
          className='form-control form-input'
        />
      </div>
      <div className='form-group'>
        <label className='sr-ony form-label'>用户名</label>
        <input
          type='text'
          onChange={handleChange("name")}
          value={name}
          className='form-control form-input'
        />
      </div>
      <div className='form-group'>
        <label className='sr-ony form-label'>Email</label>
        <input
          type='email'
          onChange={handleChange("email")}
          value={email}
          className='form-control form-input'
        />
      </div>
      <div className='form-group'>
        <label className='sr-ony form-label'>About</label>
        <textarea
          type='text'
          onChange={handleChange("about")}
          value={about}
          className='form-control about-input'
        />
      </div>
      <div className='form-group'>
        <label className='sr-ony form-label'>密码</label>
        <input
          type='password'
          onChange={handleChange("password")}
          value={password}
          className='form-control form-input'
        />
      </div>
      <div className='form-group'>
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
      <div className='update-container'>
        <div className='avatar-update'>
          <div className='avatar-container'>
            <Avatar
              src={`${process.env.NEXT_PUBLIC_API}/user/photo/${username}`}
              size={150}
              radius={150}
            />
          </div>
          <div className='form-group'>
            <label className='btn'>
              <UploadOutlined
                style={{ fontSize: "25px", marginRight: "5px" }}
              />{" "}
              更换头像
              <input
                type='file'
                onChange={handleChange("photo")}
                accept='image/*'
                hidden
              />
            </label>
          </div>
        </div>
        <div className='update-form'>
          {showSuccess()}
          {showError()}
          {showLoading()}
          <div className='brand-container'>
            <Mybrand />
          </div>
          {profileUpdateForm()}
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
