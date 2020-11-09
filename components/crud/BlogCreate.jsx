import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, withRouter } from "next/router";
import dynamic from "next/dynamic";
import { getCookie, isAuth } from "../../actions/auth";
import { listCategories } from "../../actions/category";
import { listTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"));
import "../../node_modules/react-quill/dist/quill.snow.css";

const CreateBlog = ({ router }) => {
  const [body, setBody] = useState({});
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = values;

  const publishBlog = (e) => {
    e.preventDefault();
    console.log("ready to publishBlog");
  };

  const handleChange = (name) => (e) => {
    console.log(e.target.value);
  };

  const handleBody = (e) => {
    console.log(e);
  };

  const createBLogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='form-group'>
          <label htmlFor='' className='text-muted'>
            <input
              type='text'
              formName='form-control'
              value={title}
              onChange={handleBody}
            />
          </label>
        </div>
        <div className='form-group'>
          <ReactQuill
            value={value}
            placeholder='输入内容...'
            onChange={handleBody}
          />
        </div>
        <div>
          <button>发表</button>
        </div>
      </form>
    );
  };

  return <div>{JSON.stringify.router}</div>;
};

export default withRouter(CreateBlog);
