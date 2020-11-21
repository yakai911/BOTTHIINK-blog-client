import { useState } from "react";
import Link from "next/link";
import { emailContactForm } from "../../actions/form";

const ContactForm = () => {
  const [values, setValues] = useState({
    message: "",
    name: "",
    email: "",
    sent: false,
    buttonText: "发送消息",
    success: false,
    error: false,
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "发送中..." });
    emailContactForm({ name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          sent: true,
          name: "",
          email: "",
          message: "",
          buttonText: "已发送",
          success: data.success,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: "发送消息",
    });
  };

  const showSuccessMessage = () =>
    success && (
      <div className='alert alert-info'>Thank you for contacting us.</div>
    );

  const showErrorMessage = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const contactForm = () => {
    return (
      <form onSubmit={clickSubmit} className='form-login'>
        <div className='form-group'>
          <label className='lead'>Message</label>
          <textarea
            value={message}
            onChange={handleChange("message")}
            required
            type='text'
            rows='10'
            className='form-control'></textarea>
        </div>
        <div className='form-group mt-3'>
          <label htmlFor='inputEmail' className='sr-ony form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control form-input'
            value={name}
            onChange={handleChange("name")}
            placeholder='请输入您的姓名'
            required
          />
        </div>
        <div className='form-group mt-3'>
          <label htmlFor='inputEmail' className='sr-ony form-label'>
            Email
          </label>
          <input
            type='email'
            className='form-control form-input'
            value={email}
            onChange={handleChange("email")}
            placeholder='请输入您的邮箱'
            required
          />
        </div>
        <div>
          <button type='submit' className='form-btn'>
            {buttonText}
          </button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showSuccessMessage()}
      {showErrorMessage()}
      {contactForm()}
    </>
  );
};

export default ContactForm;
