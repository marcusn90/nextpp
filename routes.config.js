function default_resolve_uri(filepath, preparedData) {
  const filename = filepath.split("/").slice(-1)[0];
  return filename.split(".")[0].toLowerCase();
}

const cfg = {
  output_dir: "./static",
  routes: [
    {
      prepare: () => {
        return ["how-we-work", "what-we-offer", "contacts"];
      }, // returns data passed to resolve_uri for each file

      resolve_uri: (filepath, preparedData) =>
        preparedData.map((slug) => `articles/${slug}`),

      path: "./sandbox/pages/articles/", // could be folder or single file
    },
    {
      prepare: () => null,
      resolve_uri: default_resolve_uri,
      path: "./sandbox/pages/",
    },
    {
      prepare: () => {},
      resolve_uri: () => "non-existent",
      path: "./sandbox/non-existent/App.js",
    },
  ],
};

export default cfg;
