import Head from "next/head";
import Link from "next/link";
import { BlogPost, PostGrid, TagRow } from "../../components/blog";
import fetch from "isomorphic-fetch";
import renderHTML from "react-render-html";
import { useEffect, useState } from "react";
import moment from "moment";
import SlideImage from "../../components/SlideImage";
import { APP_NAME, DOMAIN } from "../../config";

const SingleBlog = ({ blog, query }) => {
  // const [related, setRelated] = useState([]);

  // const loadRelated = async (blog) => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API}/blogs/related`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify(blog),
  //   });

  //   const data = await res.json();

  //   setRelated(data);
  // };

  // useEffect(() => {
  //   loadRelated();
  //   console.log(related);
  // }, []);

  const head = () => {
    <Head>
      <title>{blog.mtitle}</title>
      <meta name='description' content={blog.description} />
      <link rel='canonical' href={`${DOMAIN}/blogs/${query._id}`} />
      <meta property='og:title' content={`${blog.title}| ${APP_NAME}`} />
      <meta property='og:description' content={blog.description} />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}/blogs/${query._id}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta
        property='og:image'
        content={`${process.env.NEXT_PUBLIC_API}/blog/image/${blog._id}`}
      />
      <meta
        property='og:image:secure_url'
        ccontent={`${process.env.NEXT_PUBLIC_API}/blog/image/${blog._id}`}
      />
      <meta property='og:image:type' content='image/jpg' />
    </Head>;
  };

  // const showRelatedBlog = () => {
  //   return related.map((blog, i) => {
  //     <div className='col-md-4' key={i}>
  //       <article>
  //         <BlogPost post={blog} />
  //       </article>
  //     </div>;
  //   });
  // };

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
      {/* <div className='container'>
        <h4 className='text-center pt-5 pb-5 h2'>Related blogs</h4>
        <div className='row'>{showRelatedBlog()}</div>
      </div> */}
    </main>
  );
};

SingleBlog.getInitialProps = async ({ query }) => {
  const res = await fetch(`${process.env.API}/blog/${query.id}`, {
    method: "GET",
  });

  const json = await res.json();
  return { blog: json };
};

export default SingleBlog;
