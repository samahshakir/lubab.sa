export default {
  name: "aboutUs",
  type: "document",
  title: "About Us",
  fields: [
    {
      name: "title",
      type: "object",
      title: "Title",
      fields: [
        { name: "en", type: "string", title: "English Title" },
        { name: "ar", type: "string", title: "Arabic Title" },
      ],
    },
    {
      name: "subtitle",
      type: "object",
      title: "Subtitle",
      fields: [
        { name: "en", type: "string", title: "English Subtitle" },
        { name: "ar", type: "string", title: "Arabic Subtitle" },
      ],
    },
    {
      name: "content",
      type: "object",
      title: "Main Content",
      fields: [
        { name: "en", type: "text", title: "English Content" },
        { name: "ar", type: "text", title: "Arabic Content" },
      ],
    },
    {
      name: "values",
      type: "array",
      title: "Our Values",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "object",
              title: "Value Title",
              fields: [
                { name: "en", type: "string", title: "English Value Title" },
                { name: "ar", type: "string", title: "Arabic Value Title" },
              ],
            },
            {
              name: "description",
              type: "object",
              title: "Value Description",
              fields: [
                { name: "en", type: "text", title: "English Value Description" },
                { name: "ar", type: "text", title: "Arabic Value Description" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
