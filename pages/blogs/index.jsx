import fetch from "isomorphic-fetch";
import { BlogCategory, BlogPost, PostGrid } from "../../components/blog";
import { withRouter } from "next/router";
import Head from "next/head";
import { APP_NAME, DOMAIN } from "../../config";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const Blogs = ({ posts, router }) => {
  const head = () => (
    <Head>
      <title>All Blogs | BOT THINK</title>
      <meta
        name='description'
        content='Cruel Literature,novels,poemes,and else'
      />
      <link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
      <meta property='og:title' content={`cruel literature | BOT THINK`} />
      <meta
        property='og:description'
        content='Cruel Literature,novels,poemes,and else'
      />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />
    </Head>
  );
  return (
    <>
      {head()}
      <main className='home'>
        <section className='container'>
          <div className='row'>
            <section className='featured-posts-container'>
              <BlogCategory posts={posts} columns={2} tagsOnTop={true} />
              <BlogPost post={posts[3]} />
            </section>
          </div>
        </section>
        <section className='bg-white'>
          <section className='container'>
            <div className='row'>
              <h1>Reacent Post</h1>
              <PostGrid posts={posts} />
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

Blogs.getInitialProps = async (ctx) => {
  const res = await fetch(`${process.env.API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  const json = await res.json();

  return {
    posts: json.blogs,
    tags: json.tags,
    categories: json.categories,
    size: json.size,
  };
};

export default withRouter(Blogs);
