import Head from "next/head";
import { singleCategory } from "../../actions/category";
import { APP_NAME, DOMAIN } from "../../config";
import { BlogCategory, BlogPost } from "../../components/blog";
import { mergeStyles } from "../../helper/mergeStyles";

const Category = ({ category, blogs, query }) => {
  const normalConfig = {
    0: {
      gridArea: "1/1/2/2",
    },
    1: {
      height: "400px",
    },
    2: {
      height: "400px",
    },
    3: {
      height: "400px",
    },
    4: {
      height: "400px",
    },
  };

  const lastCategoryBlog = blogs.pop();
  mergeStyles(blogs, normalConfig);

  const head = () => (
    <Head>
      <title>
        {category.name} | {APP_NAME}
      </title>
      <meta name='description' content={`${category.name} articles`} />
      <link rel='canonical' href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property='og:title' content={`${category.name}| ${APP_NAME}`} />
      <meta property='og:description' content={`${category.name} articles`} />
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
      <main className='home p-5' style={{ backgroundColor: " #f8f9fa" }}>
        <section className='container bg-white p-3'>
          <h1 className='m-5'>{category.name}</h1>
          <section className='latest-posts-container'>
            <BlogPost post={lastCategoryBlog} />
          </section>
          <div className='row '>
            <section className='featured-posts-container'>
              <BlogCategory posts={blogs} columns={2} tagsOnTop={true} />
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { category: data.category, blogs: data.blogs, query };
    }
  });
};

export default Category;
