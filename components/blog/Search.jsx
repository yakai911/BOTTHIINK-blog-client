import Link from "next/link";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useRef, useEffect } from "react";
import { listSearch } from "../../actions/blog";
import classNames from "classnames";

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: "",
  });

  const { search, results, searched, message } = values;

  const searchSubmit = (e) => {
    e.preventDefault();

    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message: `共发现   ${data.length}  条结果,点击跳转`,
      });
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
  };

  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setValues({ ...values, searched: false });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, values]);

  const searchedBlogs = (results = []) => {
    return (
      <div className='drop'>
        {message && <p>{message}</p>}

        {results.map((blog, i) => {
          return (
            <div
              key={i}
              className='drop-items'
              style={{ display: { searched } ? "" : none }}>
              <Link href={`/blogs/${blog._id}`}>
                <a className='title-text'>{blog.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit} className='search-form'>
      <div className='search-container'>
        <SearchOutlined />
        <input
          type='text'
          value={search}
          className={classNames("search-input", {
            "searched-container": searched,
          })}
          onChange={handleChange}
        />
      </div>
    </form>
  );

  return (
    <div className='search'>
      {searchForm()}
      {searched && (
        <div className='searched' ref={ref}>
          {searchedBlogs(results)}
        </div>
      )}
    </div>
  );
};

export default Search;
