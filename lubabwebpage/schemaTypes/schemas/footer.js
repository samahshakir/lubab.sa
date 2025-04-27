// schemas/footer.js
export default {
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
      {
        name: 'description',
        title: 'Company Description',
        type: 'object',
        fields: [
          { name: 'en', title: 'English', type: 'text' },
          { name: 'ar', title: 'Arabic', type: 'text' },
        ],
      },
      {
        name: 'nationalAddress',
        title: 'National Address',
        type: 'object',
        fields: [
          { name: 'en', title: 'English', type: 'text' },
          { name: 'ar', title: 'Arabic', type: 'text' },
        ],
      },
      {
        name: 'navLinks',
        title: 'Navigation Links',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'name',
                title: 'Name',
                type: 'object',
                fields: [
                  { name: 'en', title: 'English', type: 'string' },
                  { name: 'ar', title: 'Arabic', type: 'string' },
                ],
              },
              { name: 'to', title: 'Path', type: 'string' },
              { name: 'isExternal', title: 'Is External?', type: 'boolean' },
            ],
          },
        ],
      },
      {
        name: 'services',
        title: 'Services',
        type: 'object',
        fields: [
          {
            name: 'en',
            title: 'English Services',
            type: 'array',
            of: [{ type: 'string' }],
          },
          {
            name: 'ar',
            title: 'Arabic Services',
            type: 'array',
            of: [{ type: 'string' }],
          },
        ],
      },
      {
        name: 'socialLinks',
        title: 'Social Media Links',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'platform', title: 'Platform', type: 'string' },
              { name: 'url', title: 'URL', type: 'url' },
            ],
          },
        ],
      },
    ],
  };
  