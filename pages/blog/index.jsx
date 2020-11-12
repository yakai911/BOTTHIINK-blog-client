import fetch from "isomorphic-fetch";
import { BlogCategory, BlogPost } from "../../components/blog";
import { withRouter } from "next/router";

const Blogs = ({ posts, router, tags }) => {
  // const trendingConfig = {
  //   0: {
  //     gridArea: "1/2/3/3",
  //   },
  // };

  // const featuredConfig = {
  //   0: {
  //     girdArea: "1/2/3/3",
  //   },
  //   1: {
  //     height: "300px",
  //   },
  //   3: {
  //     height: "630px",
  //     marginLeft: "30px",
  //     width: "635px",
  //   },
  // };

  // const recentPost = [...trending, ...featured];

  // mergeStyles(trending, trendingConfig);
  // mergeStyles(featured, featuredConfig);

  // const lastFeatured = featured.pop();

  return (
    <main className='home'>
      <section className='container'>
        <div className='row'>
          <section className='featured-posts-container'>
            <BlogCategory posts={posts} columns={2} tags={tags} />
            {/* <BlogPost post={lastFeatured} /> */}
          </section>
        </div>
      </section>
    </main>
  );
};

Blogs.getInitialProps = async (ctx) => {
  const res = await fetch(
    "https://myseo-blog-backend.herokuapp.com/api/blogs-categories-tags",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    }
  );

  const json = await res.json();
  return {
    posts: json.blogs,
    tags: json.tags,
    categories: json.categories,
    size: json.size,
  };
};

export default withRouter(Blogs);
