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
  const token = getCookie("token");
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

  const [checked, setChecked] = useState([]); //categories
  const [checkedTag, setCheckedTag] = useState([]); //tags

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
    // console.log("ready to publishBlog");
    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `《${data.title}》已成功发布！`,
        });
        setBody("");
        setCategories([]);
        setTags([]);
      }
    });
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
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const handleToggle = (c) => () => {
    setValues({ ...values, error: "" });
    //return the first index of -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }

    console.log(all);
    setChecked(all);
    formData.set("categories", all);
  };

  const handleTagsToggle = (t) => () => {
    setValues({ ...values, error: "" });
    //return the first index of -1
    const clickedTag = checkedTag.indexOf(t);
    const all = [...checkedTag];

    if (clickedTag === -1) {
      all.push(t);
    } else {
      all.splice(clickedTag, 1);
    }

    console.log(all);
    setCheckedTag(all);
    formData.set("tags", all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
          <input
            type='checkbox'
            className='mr-2'
            onChange={handleToggle(c._id)}
          />
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
          <input
            type='checkbox'
            className='mr-2'
            onChange={handleTagsToggle(t._id)}
          />
          <label className='form-check-label'>{t.name}</label>
        </li>
      ))
    );
  };

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ dispaly: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ dispaly: success ? "" : "none" }}>
      {success}
    </div>
  );

  const createBLogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='input-group input-group-sm mb-3'>
          <div className='input-group-text title text-muted'>标题</div>
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
        <div className='btn-container'>
          <button type='submit' className='form-btn my-3 right'>
            发布文章
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='pt-3'>
          {error && showError()}
          {success && showSuccess()}
        </div>
        <div className='col-md-8'>{createBLogForm()}</div>

        <div className='col-md-4'>
          <div>
            <div className='form-group pb-2'>
              <h5>配图（可选）</h5>
              <hr />
              <small className='text-muted mr-3'>配图不可大于1Mb</small>
              <label className='btn btn-outline-dark'>
                上传图片
                <input
                  type='file'
                  onChange={handleChange("image")}
                  accept='image/*'
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h5>分类</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflow: "scroll" }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>标签</h5>
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
