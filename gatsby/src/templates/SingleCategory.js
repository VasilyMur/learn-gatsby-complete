import React from 'react';
import BlogPosts from '../components/BlogPosts';
import Meta from '../components/Meta';
import Layout from '../components/Layout';

const SingleCategory = props => {
  const { pageContext, location } = props;
  const { posts, categoryTitle } = pageContext;

  const postsForCategory = posts.nodes.filter(post =>
    post.categories.some(category => category.title === categoryTitle)
  );

  return (
    <Layout>
      <Meta
        title={categoryTitle}
        description={`Все о путешествиях в ${categoryTitle}`}
      >
        <link rel="canonical" href={location.href} />
      </Meta>
      <BlogPosts posts={postsForCategory} />
    </Layout>
  );
};

export default SingleCategory;
