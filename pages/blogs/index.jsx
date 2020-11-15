import fetch from "isomorphic-fetch";
import { BlogCategory, BlogPost, PostGrid } from "../../components/blog";
import { withRouter } from "next/router";
import Head from "next/head";
import { APP_NAME, DOMAIN } from "../../config";
import { mergeStyles } from "../../helper/mergeStyles";

const Blogs = ({ posts, router }) => {
  const trendingConfig = {
    0: {
      gridArea: "1/1/2/2",
    },
  };

  const featuredConfig = {
    0: {
      gridArea: "1/1/2/3",
      height: "300px",
    },
    1: {
      height: "300px",
    },
    3: {
      height: "630px",
      marginLeft: "30px",
      width: "635px",
    },
  };

  const trending = posts.filter((p) =>
    p.categories.filter((c) => c.name !== "Trending")
  );
  const featured = posts.filter((p) =>
    p.categories.filter((c) => c.name !== "Featured")
  );

  console.log("trending :", trending, "featured :", featured);

  mergeStyles(trending, trendingConfig);
  mergeStyles(featured, featuredConfig);

  const lastFeatured = featured.pop();

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
              <BlogCategory posts={featured} columns={2} tagsOnTop={true} />
              <BlogPost post={lastFeatured} tagsOnTop={true} />
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

        <section className='container'>
          <div className='row'>
            <BlogCategory posts={trending} columns={3} />
          </div>
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
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
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
