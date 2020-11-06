const path = require(`path`);

// 1. Создаем путь к  шаблонам
const postTemplate = path.resolve('./src/templates/SinglePost.js');
const categoryTemplate = path.resolve('./src/templates/SingleCategory.js');
const frontTemplate = path.resolve('./src/templates/FrontPage.js');

// Posts pagination
const createPostsPagination = (createPage, posts) => {
  const { nodes } = posts;

  // Create blog post list pages
  const postsPerPage = 4;
  const numPages = Math.ceil(nodes.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: frontTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    {
      posts: allSanityPost {
        nodes {
          title
          id
          _updatedAt(formatString: "DD-MM-YYYY")
          body
          slug {
            current
          }
          image {
            asset {
              id
              fluid(maxWidth: 400) {
                base64
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
            }
          }
          categories {
            title
            id
          }
        }
      }
      categories: allSanityCategory {
        nodes {
          title
          id
        }
      }
    }
  `).then(results => {
    if (results.errors) {
      throw results.errors;
    }
    const { posts, categories } = results.data;

    // 2. Создаем страницу для каждого поста
    posts.nodes.forEach((post, index) => {
      const previous =
        index === posts.nodes.length - 1 ? null : posts.nodes[index + 1];
      const next = index === 0 ? null : posts.nodes[index - 1];

      createPage({
        // URL каждого поста
        path: `${post.slug.current}`,
        component: postTemplate,
        context: {
          slug: post.slug.current,
          next,
          previous,
        },
      });
    });

    // 3. Pagination Posts
    createPostsPagination(createPage, posts);

    // 3. Создаем страницу для каждой категории + передаем все посты внутри "контекста"
    categories.nodes.forEach(category => {
      createPage({
        // URL каждой категории
        path: `/categories/${category.title.toLowerCase()}`,
        component: categoryTemplate,
        context: {
          categoryTitle: category.title,
          posts,
        },
      });
    });
  });
};
