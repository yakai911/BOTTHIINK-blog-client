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
        setFeatured(frea.blogs);
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
      gridArea: "1/1/2/3",
      height: "300px",
    },
    1: {
      height: "300px",
    },
    3: {
      gridArea: "2/2/3/4",
      height: "300px",
    },
    4: {
      gridArea: "3/1/4/4",
      height: "400px",
    },
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
        <section className='container' style={{ backgroundColor: " #f8f9fa" }}>
          <div className='row'>
            <h1>Featured</h1>
            <section className='featured-posts-container'>
              <BlogCategory posts={featured} columns={3} tagsOnTop={true} />
              {/* <BlogPost post={lastFeatured} tagsOnTop={true} />  */}
            </section>
          </div>
        </section>
        <section className='bg-white'>
          <section className='container'>
            <div className='row'>
              <h1 className='mt-5'>Reacent Post</h1>
              <PostGrid posts={recentPost} />
            </div>
          </section>
        </section>

        <section className='container'>
          <div className='row pb-5'>
            <h1>Trending</h1>
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
