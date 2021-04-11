import { PostGrid } from "../../components/blog";
import { withRouter } from "next/router";
import Head from "next/head";

import { APP_NAME, DOMAIN } from "../../config";

import { listBlogsWithCategoriesAndTags } from "../../actions/blog";

const Blogs = ({ posts, router }) => {
  const head = () => (
    <Head>
      <title>All Blogs | {APP_NAME}</title>
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
      <main className='tagBlogs'>
        <section className='tagBlogs-container'>
          <h1>All Blogs</h1>
          <div className='tag-blog-cards'>
            <PostGrid posts={posts} />
          </div>
        </section>
      </main>
    </>
  );
};

Blogs.getInitialProps = async (ctx) => {
  let skip = 0;
  let limit = 9;
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        posts: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip,
      };
    }
  });
};

export default withRouter(Blogs);
