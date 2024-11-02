export default function (eleventyConfig) {
  eleventyConfig.setInputDirectory("src");
  eleventyConfig.setOutputDirectory("_site");
  //passthrough is relative to the config file, NOT the input dir.
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addFilter("iso_date", function (value) {
    return value instanceof Date
      ? value.toISOString().substring(0, 10)
      : "ERROR: Not a date: " + value;
  });
  
	eleventyConfig.addFilter("iso_time", function (value) {
    return value instanceof Date
      ? value.toISOString().substring(11)
      : "ERROR: Not a date: " + value;
  });

	//handy in the copyright notice, for example.
	eleventyConfig.addGlobalData("year", new Date().getFullYear());
}
