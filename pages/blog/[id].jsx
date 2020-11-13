import Head from "next/head";
import Link from "next/link";
import { TagRow } from "../../components/blog/";
import fetch from "isomorphic-fetch";
import { API } from "../../config";
import renderHTML from "react-render-html";
import { useState } from "react";
import moment from "moment";
import SlideImage from "../../components/SlideImage";

const SingleBlog = ({ blog }) => {
  return (
    <main>
      <article>
        <SlideImage img={`${API}/blog/image/${blog._id}`} alt={blog.title} />
      </article>
      <article className='pt-5'>
        <section>
          <h1 className='text-center'>{blog.title}</h1>
          <p className='author-text text-center'>
            <span>
              By : {"  "}
              <Link href='/blog/'>{blog.author.name}</Link>
            </span>
            <span className='description-text'>
              {" "}
              | {moment(blog.createdAt).format("MMMM,DD-YYYY")}
            </span>
          </p>
        </section>
      </article>
      <article>
        <div className='article-container'>
          <section>{renderHTML(blog.body)}</section>
        </div>
      </article>
    </main>
  );
};

SingleBlog.getInitialProps = async ({ query }) => {
  const res = await fetch(`${API}/blog/${query.id}`);
  const json = await res.json();
  return { blog: json };
};

export default SingleBlog;
