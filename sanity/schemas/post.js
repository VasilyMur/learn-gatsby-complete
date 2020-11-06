import { GrDocumentText as icon } from 'react-icons/gr';

export default {
  // Computer Name
  name: 'post',
  // visible title
  title: 'Posts',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Post Title',
      type: 'string',
      description: 'Single blog post',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
      description: 'Tell your story',
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category0: 'category.0.title',
      category1: 'category.1.title',
      category2: 'category.2.title',
      category3: 'category.3.title',
    },
    prepare: ({ title, media, ...categories }) => {
      // 1. Filter undefined toppings out
      const categoriesList = Object.values(categories).filter(Boolean);
      // 2. return the preview object for the pizza
      return {
        title,
        media,
        subtitle: categoriesList.join(', '),
      };
    },
  },
};
