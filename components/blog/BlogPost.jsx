import React from "react";
import { TagRow } from "./index";
import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import useWindowSize from "../../helper/useWindowSize";
import myLoader from "../../helper/myloader";

const BlogPost = ({ post, tagsOnTop }) => {
  const windowSize = useWindowSize();
  const windowWidth = windowSize.width;

  const style = windowWidth > 900 ? { ...post.style } : {};

  return (
    <Link href='/blogs/[id]' as={`/blogs/${post._id}`}>
      <div className='post overlay' style={style}>
        <Image
          src={`/blog/image/${post._id}`}
          layout='fill'
          objectFit='cover'
          alt='post image'
          loader={myLoader}
        />
        <div
          className='image-text'
          style={{
            justifyContent: tagsOnTop ? "space-between" : "flex-end",
          }}>
          <TagRow tags={post.tags} />
          <div>
            <h2 className='image-title'>{post.title}</h2>
            <span className='image-date'>
              {dayjs(post.createdAt, "MMM,DD,YYYY", "zh", true).format(
                "MMMM,DD,YYYY"
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPost;
