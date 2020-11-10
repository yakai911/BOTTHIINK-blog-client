import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, withRouter } from "next/router";
import dynamic from "next/dynamic";
import { getCookie, isAuth } from "../../actions/auth";
import { listCategories } from "../../actions/category";
import { listTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const CreateBlog = ({ router }) => {
  //parse blog from localStorage
  const blogFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [body, setBody] = useState(blogFromLS());
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

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, [router]);

  const publishBlog = (e) => {
    e.preventDefault();
    console.log("ready to publishBlog");
  };

  const handleChange = (name) => (e) => {
    console.log(e.target.value);
    const value = name === "image" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    console.log(e);
    setBody(e);
    formData.set("body", e);
    if (typeof window !== undefined) {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const createBLogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='form-group'>
          <label className='text-muted'>标题</label>
          <input
            type='text'
            className='form-control'
            value={title}
            onChange={handleChange("title")}
          />
        </div>
        <div className='form-group'>
          <ReactQuill
            modules={CreateBlog.modules}
            formats={CreateBlog.formats}
            value={body}
            placeholder='输入内容...'
            onChange={handleBody}
          />
        </div>
        <div>
          <button type='submit' className='btn btn-black'>
            发表
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      {createBLogForm()}
      <hr />
      {JSON.stringify(title)}
      <hr />
      {JSON.stringify(body)}
    </div>
  );
};

CreateBlog.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
    ["code-block"],
  ],
};

CreateBlog.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "code-block",
];

export default withRouter(CreateBlog);
