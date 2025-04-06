export default {
    name: "service",
    title: "Services",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "object",
        fields: [
          { name: "en", title: "English", type: "string" },
          { name: "ar", title: "Arabic", type: "string" },
        ],
      },
      {
        name: "description",
        title: "Description",
        type: "object",
        fields: [
          { name: "en", title: "English", type: "text" },
          { name: "ar", title: "Arabic", type: "text" },
        ],
      },
      {
        name: "icon",
        title: "Icon",
        type: "string",
        description: "FontAwesome class name (e.g., 'fas fa-cloud-upload-alt')",
      },
      {
        name: "status",
        title: "Status",
        type: "string",
      },
    ],
  };
  