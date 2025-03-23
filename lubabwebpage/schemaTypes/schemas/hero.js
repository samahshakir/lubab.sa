export default {
  name: 'hero',
  type: 'document',
  title: 'Hero Section',
  fields: [
    {
      name: 'title',
      type: 'object',
      title: 'Title',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'ar', type: 'string', title: 'Arabic'},
      ],
    },
    {
      name: 'subtitle',
      type: 'object',
      title: 'Subtitle',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'ar', type: 'string', title: 'Arabic'},
      ],
    },
    {
      name: 'description',
      type: 'object',
      title: 'Description',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'ar', type: 'text', title: 'Arabic'},
      ],
    },
    {
      name: 'buttonText',
      type: 'object',
      title: 'Button Text',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'ar', type: 'string', title: 'Arabic'},
      ],
    },
  ],
}
