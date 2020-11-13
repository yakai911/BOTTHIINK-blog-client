import { Pagination } from "antd";
import { useState, useEffect, useMemo } from "react";
import { TagRow } from "./";
import Link from "next/link";
import { API } from "../../config";

const PostGrid = ({ posts }) => {
  const [pageSize, setPageSize] = useState(9);
  const [current, setCurrent] = useState(1);

  const paginatedPosts = useMemo(() => {
    const lastIndex = pageSize * current;
    const firstIndex = lastIndex - pageSize;

    return posts.slice(firstIndex, lastIndex);
  }, [current, pageSize, posts]);

  // useEffect(() => {
  //   window.scroll({
  //     top: 800,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // });

  return (
    <section className='grid-pagination-container'>
      <section className='post-grid container'>
        {paginatedPosts.map((post, index) => (
          <div className='post-container' key={index}>
            <figure>
              <Link href='/blog/[id]' as={`/blog/${post._id}`}>
                <img src={`${API}/blog/image/${post._id}`} alt={post.title} />
              </Link>
            </figure>
            <TagRow tags={post.tags} />
            <h2>{post.title}</h2>
            <p className='author-text'>
              <span>
                By:
                <Link href={post.author.profile}>{post.author.name}</Link>
              </span>
              <span>-{post.createdAt}</span>
            </p>
            <p className='description-text'>{post.description}</p>
            <Link href='/blog/[id]' as={`/blog/${post._id}`}>
              Read More...
            </Link>
          </div>
        ))}
      </section>
    </section>
  );
};

export default PostGrid;
