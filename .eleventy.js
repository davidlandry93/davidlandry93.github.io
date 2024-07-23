const Image = require('@11ty/eleventy-img');
const { parse } = require("csv-parse/sync");

const { DateTime } = require('luxon')
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRss);


    eleventyConfig.addDataExtension("csv", (contents) => {
        const parsed = parse(contents, {
            columns: true,
            skip_empty_lines: true,
          });

        return parsed;
    })


    eleventyConfig.addShortcode("image", async function (src, alt, sizes) {
		let metadata = await Image(src, {
			widths: [350, "auto"],
			formats: ["webp", "jpeg"],
		});


		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		};

        let options = {
            outputDir: "/img/",
            urlPath: "/img/"
        }

		// You bet we throw an error on a missing alt (alt="" works okay)
		return Image.generateHTML(metadata, imageAttributes, options);
    })


    eleventyConfig.addShortcode("imageAsFile", async function (src, alt) {
        let options = {
            outputDir: "/img/",
            urlPath: "/img/"
        }

		let metadata = await Image(src, {
			widths: ["auto"],
			formats: ["webp"],
		}, options);


        fullsize = metadata.webp[0]

        return fullsize.outputPath
      })


    eleventyConfig.addShortcode("galleryImage", async function (src, alt) {
        let options = {
            outputDir: "/img/",
            urlPath: "/img/"
        }

		let metadata = await Image(src, {
			widths: [350, "auto"],
			formats: ["webp"],
		}, options);


        thumbnail = metadata['webp'][0]
        fullsize = metadata['webp'][1]

        return `<a href="${fullsize.url}" 
        data-pswp-width="${fullsize.width}" 
        data-pswp-height="${fullsize.height}" 
        target="_blank">
            <img src="${thumbnail.url}" alt="${alt}" />
        </a>`

      })


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


    eleventyConfig.addPassthroughCopy({ 
        "_static/": "/",
        "img": "/img/",
        "node_modules/photoswipe/dist/photoswipe-lightbox.esm.min.js": "assets/photoswipe-lightbox.esm.min.js",
        "node_modules/photoswipe/dist/photoswipe.esm.min.js": "assets/photoswipe.esm.min.js",
        "node_modules/photoswipe/dist/photoswipe.css": "assets/photoswipe.css"
     });

    return {
        dir: {
            input: "content",
            includes: "../_includes",
            data: "../_data"
        }
    }
};