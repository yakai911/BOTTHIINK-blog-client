import fetch from "isomorphic-fetch";
import { BlogCategory, BlogPost, PostGrid } from "../../components/blog";
import { withRouter } from "next/router";
import { API } from "../../config";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";

const Blogs = ({ posts, router, tags }) => {
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
  const res = await fetch(`${API}/blogs-categories-tags`, {
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
