import Carousel from "../components/Carousel";
import { useState, useEffect } from "react";
import { PostGrid, BlogCategory } from "../components/blog";
import { withRouter } from "next/router";
import Head from "next/head";
import { singleCategory } from "../actions/category";
import { mergeStyles } from "../helper/mergeStyles";
import { APP_NAME, DOMAIN } from "../config";

const Index = ({ router, recentPost }) => {
  const [trending, setTrending] = useState([]);
  const [featured, setFeatured] = useState([]);

  const initTrending = () => {
    singleCategory("trending").then((tren) => {
      if (tren.error) {
        console.log(tren.error);
      } else {
        console.log(tren.blogs);
        setTrending(tren.blogs);
      }
    });
  };

  const initFeatured = () => {
    singleCategory("featured").then((frea) => {
      if (frea.error) {
        console.log(frea.error);
      } else {
        setFeatured(frea.blogs.slice(0, 5));
      }
    });
  };

  useEffect(() => {
    initFeatured();
    initTrending();
  }, [router]);

  const trendingConfig = {
    0: {
      height: "300px",
      gridArea: "1/1/2/2",
    },
    1: {
      height: "300px",
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
    // 5: {
    //   gridArea: "3/3/4/5",
    //   height: "300px",
    // },
  };

  mergeStyles(trending, trendingConfig);
  mergeStyles(featured, featuredConfig);

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
      <main>
        <Carousel items={recentPost} />
        <section className='container'>
          <div className='row'>
            <a href='/categories/featured'>
              <h1>Featured</h1>
            </a>
            <section className='featured-posts-container'>
              <BlogCategory posts={featured} columns={4} tagsOnTop={true} />
            </section>
          </div>
        </section>

        <section className='bg-white'>
          <section className='container'>
            <div className='row'>
              {" "}
              <a href='/categories/recent-post'>
                <h1 className='mt-5'>Reacent Post</h1>
              </a>
              <PostGrid posts={recentPost} />
            </div>
          </section>
        </section>

        <section className='container'>
          <div className='row pb-5'>
            <a href='/categories/trending'>
              <h1>Trending</h1>
            </a>
            <BlogCategory posts={trending} columns={2} tagsOnTop={true} />
          </div>
        </section>
      </main>
    </>
  );
};

Index.getInitialProps = async (ctx) => {
  return singleCategory("recent-post").then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return { recentPost: data.blogs };
    }
  });
};

export default withRouter(Index);
