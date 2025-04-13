export default {
  name: 'job',
  title: 'Job Position',
  type: 'document',
  fields: [
    // Title - English & Arabic
    {
      name: 'titleEn',
      title: 'Job Title (English)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'titleAr',
      title: 'Job Title (Arabic)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    // Slug (from English title, since URLs are usually in English)
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'titleEn',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },

    // Location and Job Type (optional: make these multilanguage too if needed)
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'jobType',
      title: 'Job Type',
      type: 'string', // Could use a dropdown or localized object if needed
    },

    // Full Description - English & Arabic
    {
      name: 'descriptionEn',
      title: 'Full Description (English)',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'descriptionAr',
      title: 'Full Description (Arabic)',
      type: 'array',
      of: [{type: 'block'}],
    },

    // Requirements - English & Arabic
    {
      name: 'requirementsEn',
      title: 'Requirements (English)',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'requirementsAr',
      title: 'Requirements (Arabic)',
      type: 'array',
      of: [{type: 'block'}],
    },

    // Active flag
    {
      name: 'active',
      title: 'Is Active?',
      type: 'boolean',
      description: 'Only active jobs will be shown on the website.',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'titleEn',
      subtitle: 'location',
    },
  },
}
