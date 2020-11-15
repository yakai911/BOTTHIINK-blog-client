import { Pagination } from "antd";
import { useState, useEffect, useMemo } from "react";
import { TagRow } from "./index";
import Link from "next/link";
import renderHTML from "react-render-html";
import moment from "moment";
import "antd/dist/antd.css";

const PostGrid = ({ posts }) => {
  const [pageSize, setPageSize] = useState(9);
  const [current, setCurrent] = useState(1);

  const paginatedPosts = useMemo(() => {
    const lastIndex = pageSize * current;
    const firstIndex = lastIndex - pageSize;

    return posts.slice(firstIndex, lastIndex);
  }, [current, pageSize, posts]);

  useEffect(() => {
    window.scroll({
      top: 800,
      left: 0,
      behavior: "smooth",
    });
  });

  return (
    <section className='grid-pagination-container'>
      <section className='post-grid container'>
        {paginatedPosts.map((post, index) => (
          <div className='post-container' key={index}>
            <figure>
              <Link href='/blogs/[id]' as={`/blogs/${post._id}`}>
                <img
                  src={`${process.env.API}/blog/image/${post._id}`}
                  alt={post.title}
                />
              </Link>
            </figure>
            <TagRow tags={post.tags} />
            <h2>{post.title}</h2>
            <p className='author-text'>
              <span>
                By:
                <Link href={post.author.profile}>{post.author.name}</Link>
              </span>
              <span>-{moment(post.createdAt).format("MMM,DD,YYYY")}</span>
            </p>
            <div className='description-text'>
              {post.description.replace(/<[^>]+>/g, "")}
            </div>
            <p className='author-text'>
              <Link
                href='/blogs/[id]'
                as={`/blogs/${post._id}`}
                className='a-blue'>
                Read More...
              </Link>{" "}
            </p>
          </div>
        ))}
      </section>
      <Pagination
        simple
        showSizeChanger
        onShowSizeChange={setPageSize}
        pageSize={pageSize}
        total={posts.lenght}
        defaultCurrent={current}
        onChange={setCurrent}
      />
    </section>
  );
};

export default PostGrid;
