import { useState, useEffect } from "react";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";
import { getCookie } from "../../actions/auth";
import { listCategories } from "../../actions/category";
import { listTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import { QuillModules, QuillFormats } from "../../helper/quill";
import { UploadOutlined } from "@ant-design/icons";

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

  const { error, success, formData, title } = values;

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
    const value = name === "image" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    // console.log(e);
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

    setCheckedTag(all);
    formData.set("tags", all);
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className='checkbox-group'>
          <input type='checkbox' onChange={handleToggle(c._id)} />
          <label>{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className='checkbox-group'>
          <input type='checkbox' onChange={handleTagsToggle(t._id)} />
          <label>{t.name}</label>
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
    <div style={{ dispaly: success ? "" : "none" }}>{success}</div>
  );

  const createBLogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='input-container'>
          <input
            type='text'
            className='form-control'
            value={title}
            onChange={handleChange("title")}
            placeholder='输入题目...'
          />
        </div>
        <div className='form-group'>
          <ReactQuill
            modules={QuillModules}
            formats={QuillFormats}
            value={body}
            placeholder='开始创作...'
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
    <div className='blog-creator-container'>
      <div className='blog-form'>
        {error && showError()}
        {success && showSuccess()}
        <div className='blog-form-container'>{createBLogForm()}</div>
      </div>
      <div className='right-container'>
        <div className='upload-pic'>
          <div>
            <h5>
              配图 <small className='text-muted'>{`(<1MB)`}</small>
            </h5>
            <hr />
            <label className='upload-btn'>
              <UploadOutlined />
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
          <h5>
            分类 <small className='text-muted'>{`(必选)`}</small>
          </h5>
          <hr />
          <ul>{showCategories()}</ul>
        </div>
        <div>
          <h5>
            标签 <small className='text-muted'>{`(必选)`}</small>
          </h5>
          <hr />
          <ul>{showTags()}</ul>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateBlog);
