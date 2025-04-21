// schemas/blog.js
export default {
    name: 'blog',
    title: 'Blog Posts',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title (English)',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'titleAr',
        title: 'Title (Arabic)',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'excerpt',
        title: 'Excerpt (English)',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'excerptAr',
        title: 'Excerpt (Arabic)',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'readTime',
        title: 'Read Time (English)',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'readTimeAr',
        title: 'Read Time (Arabic)',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'author',
        title: 'Author (English)',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'authorAr',
        title: 'Author (Arabic)',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
        validation: Rule => Rule.required()
      },
      {
        name: 'tags',
        title: 'Tags (English)',
        type: 'array',
        of: [{type: 'string'}]
      },
      {
        name: 'tagsAr',
        title: 'Tags (Arabic)',
        type: 'array',
        of: [{type: 'string'}]
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'content',
        title: 'Content (English)',
        type: 'array',
        of: [
          {
            type: 'block'
          },
          {
            type: 'image',
            fields: [
              {
                name: 'alt',
                title: 'Alternative Text',
                type: 'string'
              }
            ]
          }
        ]
      },
      {
        name: 'contentAr',
        title: 'Content (Arabic)',
        type: 'array',
        of: [
          {
            type: 'block'
          },
          {
            type: 'image',
            fields: [
              {
                name: 'alt',
                title: 'Alternative Text',
                type: 'string'
              }
            ]
          }
        ]
      },
      {
        name: 'active',
        title: 'Is Active?',
        type: 'boolean',
        description: 'Active blogs will be highlighted.',
        initialValue: true,
      },
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'publishedAt'
      },
      prepare({title, subtitle}) {
        return {
          title,
          subtitle: new Date(subtitle).toLocaleDateString()
        }
      }
    }
  }