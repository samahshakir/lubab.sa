// schemas/termsOfUse.js
export default {
    name: 'termsOfUse',
    title: 'Terms of Use',
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
        name: 'content_en',
        title: 'Content (English)',
        type: 'array',
        of: [{ type: 'block' }],
      },
      {
        name: 'content_ar',
        title: 'Content (Arabic)',
        type: 'array',
        of: [{ type: 'block' }],
      },
    ],
  };
  