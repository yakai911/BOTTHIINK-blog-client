import Head from "next/head";
import Link from "next/link";
import { BlogCategory, TagRow } from "../../components/blog";
import renderHTML from "react-render-html";
import { useEffect, useState } from "react";
import moment from "moment";
import SlideImage from "../../components/SlideImage";
import { APP_NAME, DOMAIN } from "../../config";
import { singleBlog, listRelated } from "../../actions/blog";
import { mergeStyles } from "../../helper/mergeStyles";

const SingleBlog = ({ blog, query }) => {
  const [related, setRelated] = useState([]);

  const loadRelated = () => {
    listRelated({ blog }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setRelated(data);
      }
    });
  };

  useEffect(() => {
    loadRelated();
  }, []);

  const head = () => (
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
        content={`${process.env.NEXT_PUBLIC_API}/blog/image/${blog._id}`}
      />
      <meta
        property='og:image:secure_url'
        ccontent={`${process.env.NEXT_PUBLIC_API}/blog/image/${blog._id}`}
      />
      <meta property='og:image:type' content='image/jpg' />
    </Head>
  );

  const relatedConfig = {
    0: {
      height: "275px",
    },
    2: {
      height: "275px",
    },
  };

  mergeStyles(related, relatedConfig);

  const showRelatedBlog = () => {
    return <BlogCategory posts={related} columns={3} tagsOnTop={true} />;
  };

  return (
    <>
      {head()}
      <main>
        <SlideImage
          img={`${process.env.NEXT_PUBLIC_API}/blog/image/${blog._id}`}
          alt={blog.title}
          className='banner'
        />
        <article className='pt-5'>
          <section>
            <h1 className='text-center'>{blog.title}</h1>
            <p className='text-center'>
              <span className='author-text'>
                By : {"  "}
                <Link
                  href={`/profile/${blog.author.username}`}
                  className='a-blue'>
                  {blog.author.name}
                </Link>
              </span>
              <span className='description-text'>
                {" "}
                | {moment(blog.createdAt).format("MMMM,DD,YYYY")}
              </span>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
              }}>
              <TagRow tags={blog.tags} />
            </div>
          </section>
        </article>
        <article>
          <div className='article-container'>
            <section>{renderHTML(blog.body)}</section>
          </div>
        </article>
        <div className='container'>
          <h4 className='text-center pt-5  h3'>相关推荐</h4>
          <div className='row'>{showRelatedBlog()}</div>
        </div>
      </main>
    </>
  );
};

SingleBlog.getInitialProps = async ({ query }) => {
  return singleBlog(query.id).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { blog: data, query };
    }
  });
};

export default SingleBlog;
