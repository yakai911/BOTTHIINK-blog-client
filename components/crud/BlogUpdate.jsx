import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { listCategories } from "../../actions/category";
import { listTags } from "../../actions/tag";
import { singleBlog, updateBlog } from "../../actions/blog";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import { UploadOutlined } from "@ant-design/icons";
import { QuillModules, QuillFormats } from "../../helper/quill";

const BlogUpdate = ({ router }) => {
  const myRouter = useRouter();
  const [body, setBody] = useState("");

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]);
  const [checkedTag, setCheckedTag] = useState([]);

  const [values, setValues] = useState({
    title: "",
    error: "",
    success: "",
    formData: "",
    title: "",
    body: "",
  });

  const { error, success, formData, title } = values;
  const token = getCookie("token");

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCategories();
    initTags();
  }, [router]);

  const initBlog = () => {
    if (router.query.id) {
      singleBlog(router.query.id).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = (blogCategories) => {
    let ca = [];
    blogCategories.map((c, i) => {
      ca.push(c._id);
    });
    setChecked(ca);
  };

  const setTagsArray = (blogTags) => {
    let ta = [];
    blogTags.map((t, i) => {
      ta.push(t._id);
    });
    setCheckedTag(ta);
  };

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

  const handleToggle = (c) => () => {
    setValues({ ...values, error: "" });
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

  const findOutCategory = (c) => {
    const result = checked.indexOf(c);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const findOutTag = (t) => {
    const result = checkedTag.indexOf(t);
    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
          <input
            type='checkbox'
            onChange={handleToggle(c._id)}
            checked={findOutCategory(c._id)}
            className='mr-2'
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
            onChange={handleTagsToggle(t._id)}
            checked={findOutTag(t._id)}
            className='mr-2'
          />
          <label className='form-check-label'>{t.name}</label>
        </li>
      ))
    );
  };

  const handleChange = (name) => (e) => {
    console.log(e.target.value);
    const value = name === "image" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    setBody(e);
    formData.set("body", e);
  };

  const editBlog = (e) => {
    e.preventDefault();
    console.log(router.query.id);
    updateBlog(formData, token, router.query.id).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          sucess: `您的文章《${data.title}》已成功更新`,
        });
        if (isAuth() && isAuth().role === 1) {
          myRouter.replace(`/admin`);
        } else if (isAuth() && isAuth().role === 0) {
          myRouter.replace(`/user`);
        }
      }
    });
  };

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
      {success}
    </div>
  );

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className='input-container'>
          <input
            type='text'
            className='form-control'
            value={title}
            onChange={handleChange("title")}
            placeholder='Post title'
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
            更新文章
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className='blog-update-container'>
      <div className='blogUpdate-form'>
        {body && (
          <div>
            <img
              src={`${process.env.NEXT_PUBLIC_API}/blog/image/${router.query.id}`}
              alt=''
              style={{ width: "100%", marginBottom: "20px" }}
            />
          </div>
        )}
        {error && showError()}
        {success && showSuccess()}
        <div className='blog-form-container'>{updateBlogForm()}</div>
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
              更换图片
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

export default withRouter(BlogUpdate);
