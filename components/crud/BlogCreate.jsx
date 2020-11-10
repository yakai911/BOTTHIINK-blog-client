import Link from "next/link";
import { useState, useEffect } from "react";
import { withRouter } from "next/router";
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

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

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
    initCategories();
    initTags();
  }, [router]);

  const initCategories = () => {
    listCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    listTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

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

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
          <input type='checkbox' className='mr-2' />
          <label className='form-check-label'>{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className='list-unstyled'>
          <input type='checkbox' className='mr-2' />
          <label className='form-check-label'>{t.name}</label>
        </li>
      ))
    );
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
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-8'>
          {createBLogForm()}
          <hr />
          {JSON.stringify(title)}
          <hr />
          {JSON.stringify(body)}
          <hr />
          {JSON.stringify(categories)}
          <hr />
          {JSON.stringify(tags)}
        </div>

        <div className='col-md-4'>
          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflow: "scroll" }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflow: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
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
