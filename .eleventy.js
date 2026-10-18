const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

// Reads a YAML content file from src/content. If the file has a mistake,
// the build stops and says which file and line.
function loadContent(file) {
  const fullPath = path.join(__dirname, "src", "content", file);
  return yaml.load(fs.readFileSync(fullPath, "utf8"));
}

module.exports = function (eleventyConfig) {
  // Content: all visible text and settings live in src/content/*.yaml
  eleventyConfig.addGlobalData("site", () => loadContent("site.yaml"));
  eleventyConfig.addGlobalData("copy", () => loadContent("copy.yaml"));
  eleventyConfig.addWatchTarget("src/content/");

  // Files copied as-is into the built site
  eleventyConfig.addPassthroughCopy("src/style.css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("CNAME"); // custom domain, from the project root

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
};