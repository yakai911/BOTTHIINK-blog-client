import { Pagination } from "antd";
import { useState, useMemo, useRef, useEffect } from "react";
import { TagRow } from "./index";
import Link from "next/link";
import "antd/dist/antd.css";
import PostImg from "./PostImg";
import useWindowSize from "../../helper/useWindowSize";
import { DateTime } from "luxon";

const PostGrid = ({ posts }) => {
  const size = useWindowSize();
  const windowWidth = size.width;

  const [pageSize, setPageSize] = useState(9);
  const [current, setCurrent] = useState(1);

  const paginationRef = useRef(null);
  let paginationPos;

  const paginatedPosts = useMemo(() => {
    const lastIndex = pageSize * current;
    const firstIndex = lastIndex - pageSize;

    return posts.slice(firstIndex, lastIndex);
  }, [current, pageSize, posts]);

  // useEffect(() => {
  //   paginationPos = paginationRef.current.offsetTop;
  //   if (typeof window !== "undefined") {
  //     window.scroll({
  //       top: paginationPos,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   }
  // }, []);

  return (
    <section className='grid-pagination-container'>
      <section className='post-grid'>
        {paginatedPosts.map((post, index) => (
          <div className='post-container' key={index}>
            <figure>
              <a href={`/blogs/${post._id}`}>
                <PostImg
                  width={windowWidth > 900 ? "350px" : "305px"}
                  height={windowWidth > 900 ? "350px" : "300px"}
                  src={`/blog/image/${post._id}`}
                  radius={5}
                />
              </a>
            </figure>
            <TagRow tags={post.tags} />
            <section>
              <h2>{post.title}</h2>
              <p className='author-text'>
                <span>
                  By:
                  <Link href={post.author.profile}>
                    {" " + post.author.name + "  "}
                  </Link>
                </span>
                <span>
                  -
                  {DateTime.fromISO(post.createdAt)
                    .setLocale()
                    .toFormat("MMMM,dd,yyyy")}
                </span>
              </p>
              <div className='description-text'>
                {post.description.replace(/<[^>]+>/g, "").length >= 60
                  ? post.description.replace(/<[^>]+>/g, "").slice(0, 57) +
                    " ..."
                  : post.description.replace(/<[^>]+>/g, "")}
              </div>
            </section>
            <p className='author-text'>
              <Link href={`/blogs/${post._id}`} className='a-blue'>
                Read More...
              </Link>
            </p>
          </div>
        ))}
      </section>
      <div className='pagination-container' ref={paginationRef}>
        <Pagination
          simple
          showSizeChanger
          onShowSizeChange={setPageSize}
          pageSize={pageSize}
          total={posts.length}
          defaultCurrent={current}
          onChange={setCurrent}
        />
      </div>
    </section>
  );
};

export default PostGrid;
