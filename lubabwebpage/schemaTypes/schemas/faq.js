// schemas/faq.js
export default {
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'object',
        fields: [
          { name: 'en', type: 'string', title: 'English' },
          { name: 'ar', type: 'string', title: 'Arabic' }
        ]
      },
      {
        name: 'subtitle',
        title: 'Subtitle',
        type: 'object',
        fields: [
          { name: 'en', type: 'string', title: 'English' },
          { name: 'ar', type: 'string', title: 'Arabic' }
        ]
      },
      {
        name: 'faqItems',
        title: 'FAQ Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'question',
                title: 'Question',
                type: 'object',
                fields: [
                  { name: 'en', type: 'string', title: 'English' },
                  { name: 'ar', type: 'string', title: 'Arabic' }
                ]
              },
              {
                name: 'answer',
                title: 'Answer',
                type: 'object',
                fields: [
                  { name: 'en', type: 'text', title: 'English' },
                  { name: 'ar', type: 'text', title: 'Arabic' }
                ]
              },
              {
                name: 'category',
                title: 'Category',
                type: 'object',
                fields: [
                  { name: 'en', type: 'string', title: 'English' },
                  { name: 'ar', type: 'string', title: 'Arabic' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }