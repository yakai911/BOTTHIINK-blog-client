import Head from "next/head";
import Link from "next/link";
import { TagRow } from "../../components/blog";
import fetch from "isomorphic-fetch";
import renderHTML from "react-render-html";
import { useState } from "react";
import moment from "moment";
import SlideImage from "../../components/SlideImage";
import { APP_NAME, DOMAIN } from "../../config";

const SingleBlog = ({ blog }) => {
  const head = () => {
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name='description' content={blog.description} />
      <link rel='canonical' href={`${DOMAIN}/blogs/${query._id}`} />
      <meta property='og:title' content={`${blog.title}| ${APP_NAME}`} />
      <meta property='og:description' content={blog.description} />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}/blogs/${query._id}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta
        property='og:image'
        content={`${process.env.API}/blog/image/${blog._id}`}
      />
      <meta
        property='og:image:secure_url'
        ccontent={`${process.env.API}/blog/image/${blog._id}`}
      />
      <meta property='og:image:type' content='image/jpg' />
    </Head>;
  };

  return (
    <main>
      <article>
        <SlideImage
          img={`${process.env.API}/blog/image/${blog._id}`}
          alt={blog.title}
          className='banner'
        />
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
  const res = await fetch(`${process.env.API}/blog/${query.id}`);
  const json = await res.json();
  return { blog: json };
};

export default SingleBlog;
