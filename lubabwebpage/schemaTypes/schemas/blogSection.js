export default {
  name: 'blogSection',
  title: 'Blog Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Section Title (English)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'titleAr',
      title: 'Section Title (Arabic)',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Section Description (English)',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'descriptionAr',
      title: 'Section Description (Arabic)',
      type: 'text',
      validation: Rule => Rule.required()
    }
  ]
}