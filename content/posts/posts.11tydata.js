
const Image = require('@11ty/eleventy-img');

const options = {
    outputDir: "./_site/img",
    urlPath: "/img/"
}


module.exports = {
    tags: [
        "post"
    ],
    layout: "post.njk",
    eleventyComputed: {
        images: async (data) => {
            const img = await Image(data.image, {
                "widths": ["auto", 300],
                "formats": ["webp"]
            }, options)

            return {
                "fullsize": img.webp[1].url,
                "thumbnail": img.webp[0].url,
            }
        }
    }
};