import { PostGrid, BlogCategory } from "../components/blog";
import { withRouter } from "next/router";
import Head from "next/head";
import { singleCategory } from "../actions/category";
import { mergeStyles } from "../helper/mergeStyles";
import { APP_NAME, DOMAIN } from "../config";
import Carousel from "../components/carousel/Carousel";
import Footer from "../components/Footer";
import Link from "next/link";

const Index = ({ router, recentPost, trending, featured }) => {
  const trendingConfig = {
    0: {
      gridArea: "1/2/3/3",
    },
    3: {
      height: "173px",
    },
  };

  const featuredConfig = {
    0: {
      gridArea: "2/3/5/5",
      height: "635px",
    },
    1: {
      gridArea: "1/1/2/5",
      height: "400px",
    },

    2: {
      height: "300px",
    },
    3: {
      height: "300px",
    },
    4: {
      gridArea: "3/1/4/3",
      height: "300px",
    },
  };

  if (trending) mergeStyles(trending, trendingConfig);
  if (featured) mergeStyles(featured, featuredConfig);

  const head = () => (
    <Head>
      <title>Home | {APP_NAME}</title>
      <meta
        name='description'
        content='Cruel Literature,novels,poemes,and else'
      />
      <link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
      <meta
        property='og:title'
        content={`Cruel Literature,novels,poemes,and else | ${APP_NAME}`}
      />
      <meta
        property='og:description'
        content='Cruel Literature,novels,poemes,and else'
      />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
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
      <main className='home'>
        <Carousel />
        <section className='featured-posts-container'>
          <div>
            <Link href='/categories/featured'>
              <h1>Featured</h1>
            </Link>
            <BlogCategory
              posts={featured.slice(0, 5)}
              columns={4}
              tagsOnTop={true}
            />
          </div>
        </section>

        <section className='bg-white'>
          <div className='recent-container'>
            <Link href='/categories/recent-post'>
              <h1>Reacent Post</h1>
            </Link>
            <PostGrid posts={recentPost} />
          </div>
        </section>

        <section className='trending-posts-container'>
          <div>
            <Link href='/categories/trending'>
              <h1>Trending</h1>
            </Link>
            <BlogCategory
              posts={trending.slice(0, 5)}
              columns={3}
              tagsOnTop={true}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

function initRecent() {
  return new Promise((resolve, reject) => {
    singleCategory("recent-post").then((data) => {
      if (data.error) {
        // console.log(data.error);
        reject(data.error);
      } else {
        // return { recentPost: data.blogs };
        resolve(data.blogs);
      }
    });
  });
}

function initTrending() {
  return new Promise((resolve, reject) => {
    singleCategory("trending").then((data) => {
      if (data.error) {
        // console.log(data.error);
        reject(data.error);
      } else {
        // return { recentPost: data.blogs };
        resolve(data.blogs);
      }
    });
  });
}

function initFeatured() {
  return new Promise((resolve, reject) => {
    singleCategory("featured").then((data) => {
      if (data.error) {
        // console.log(data.error);
        reject(data.error);
      } else {
        // return { recentPost: data.blogs };
        resolve(data.blogs);
      }
    });
  });
}

export async function getStaticProps(context) {
  const recentPost = await initRecent();
  const trending = await initTrending();
  const featured = await initFeatured();
  return { props: { recentPost, trending, featured } };
}

export default withRouter(Index);
