import { BlogCategory, BlogPost, PostGrid } from "../../components/blog";
import { withRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { APP_NAME, DOMAIN } from "../../config";
import { mergeStyles } from "../../helper/mergeStyles";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { singleCategory } from "../../actions/category";

const Blogs = ({ posts, categories, tags, totalBlogs, blogSkip, router }) => {
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
      <main className='home' style={{ backgroundColor: " #f8f9fa" }}>
        <section className='bg-white'>
          <section className='container'>
            <div className='row'>
              <h1 className='mt-5'>All Blogs</h1>
              <PostGrid posts={posts} />
            </div>
          </section>
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
