export default {
    name: 'article',
    title: 'Article',
    type: 'object',
    fields: [
      {
        name: 'title_en',
        title: 'Title (English)',
        type: 'string',
      },
      {
        name: 'title_ar',
        title: 'Title (Arabic)',
        type: 'string',
      },
      {
        name: 'excerpt_en',
        title: 'Excerpt (English)',
        type: 'text',
      },
      {
        name: 'excerpt_ar',
        title: 'Excerpt (Arabic)',
        type: 'text',
      },
      {
        name: 'readTime_en',
        title: 'Read Time (English)',
        type: 'string',
      },
      {
        name: 'readTime_ar',
        title: 'Read Time (Arabic)',
        type: 'string',
      },
    ],
  };