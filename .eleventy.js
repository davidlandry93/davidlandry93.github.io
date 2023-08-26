const { DateTime } = require('luxon')
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {

    eleventyConfig.addPlugin(pluginRss);

    // Filters

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addFilter("readableDate", (dateObj, format) => {
        // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format || "yyyy-LL-dd");
    });

    eleventyConfig.addFilter("limit", function (input_array, limit) {
        return input_array.slice(0, limit);
    });


    eleventyConfig.addPassthroughCopy({ "_static/": "/" });

    return {
        dir: {
            input: "content",
            includes: "../_includes",
            data: "../_data"
        }
    }
};