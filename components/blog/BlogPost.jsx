import React from "react";
import useWindowSize from "../../helper/useWindowSize";
import { TagRow } from "./index";
import Link from "next/link";
import moment from "moment";

const BlogPost = ({ post, tagsOnTop }) => {
  const size = useWindowSize();
  const windowWidth = size.width;

  const imageBackground = {
    backgroundImage: `url('${process.env.NEXT_PUBLIC_API}/blog/image/${post._id}')`,
    cursor: "pointer",
  };

  const style =
    windowWidth > 900 ? { ...imageBackground, ...post.style } : imageBackground;

  return (
    <Link href='/blogs/[id]' as={`/blogs/${post._id}`}>
      <div className='post overlay' style={style}>
        <div
          className='image-text'
          style={{
            justifyContent: tagsOnTop ? "space-between" : "flex-end",
          }}>
          <TagRow tags={post.tags} />
          <div>
            <h2 className='image-title'>{post.title}</h2>
            <span className='image-date'>
              {moment(post.createdAt).format("MMMM,DD,YYYY")}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPost;
