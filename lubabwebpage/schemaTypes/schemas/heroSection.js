export default {
  name: 'heroSection',
  type: 'document',
  title: 'Hero Section Content',
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
      name: 'title2',
      type: 'object',
      title: 'Title2',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'ar', type: 'string', title: 'Arabic'},
      ],
    },
    {
      name: 'title3',
      type: 'object',
      title: 'Title3',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'ar', type: 'string', title: 'Arabic'},
      ],
    },
    {
      name: 'subTitle',
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
    {
      name: 'splineSceneUrl',
      type: 'url',
      title: 'Spline Scene URL',
    },
  ],
}
