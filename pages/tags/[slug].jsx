import Head from "next/head";
import { singleTag } from "../../actions/tag";
import { APP_NAME, DOMAIN } from "../../config";
import { PostGrid } from "../../components/blog";

const BlogsWithTag = ({ tag, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {tag.name} | {APP_NAME}
      </title>
      <meta name='description' content={`${tag.name} articles`} />
      <link rel='canonical' href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property='og:title' content={`${tag.name}| ${APP_NAME}`} />
      <meta property='og:description' content={`${tag.name} articles`} />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}/categories/${query.slug}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta
        property='og:image'
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property='og:image:secure_url'
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta property='og:image:type' content='image/jpg' />
    </Head>
  );

  return (
    <>
      {head()}
      <main className='home p-5'>
        <section className='container p-3'>
          <h1 className='mt-5 mb-4 mx-5'>{tag.name.toUpperCase()}</h1>
          <div className='row '>
            <PostGrid posts={blogs} />
          </div>
        </section>
      </main>
    </>
  );
};

BlogsWithTag.getInitialProps = ({ query }) => {
  return singleTag(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { tag: data.tag, blogs: data.blogs, query };
    }
  });
};

export default BlogsWithTag;
