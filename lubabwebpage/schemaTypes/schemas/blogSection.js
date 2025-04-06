
export default {
    name: 'blogSection',
    title: 'Blog Section',
    type: 'document',
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
        name: 'description_en',
        title: 'Description (English)',
        type: 'text',
      },
      {
        name: 'description_ar',
        title: 'Description (Arabic)',
        type: 'text',
      },
      {
        name: 'articles',
        title: 'Articles',
        type: 'array',
        of: [
          {
            type: 'article',
          },
        ],
      },
    ],
  };