import Head from "next/head";
import Link from "next/link";
import { API } from "../../config";
import { withRouter } from "next/router";
import { useState } from "react";

const SingleBlog = ({ blog, router }) => {
  return (
    <>
      <main>
        <article>
          <div className='container-fluid'>
            <section>{JSON.stringify(blog.body)}</section>
          </div>
        </article>
      </main>
    </>
  );
};

SingleBlog.getInitialProps = async ({ query }) => {
  const res = await fetch(`${API}/blog/${query.id}`);
  const json = await res.json();
  return { blog: json };
};

export default withRouter(SingleBlog);
