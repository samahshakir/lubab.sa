import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "fxcxkkd8", // Replace with your Sanity Project ID
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-03-22",
});

export default client;
