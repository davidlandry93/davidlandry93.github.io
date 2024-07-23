
const Image = require('@11ty/eleventy-img');

const options = {
    outputDir: "/img/",
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
                "formats": ["avif"]
            }, options)

            return {
                "fullsize": img.avif[1].url,
                "thumbnail": img.avif[0].url,
            }
        }
    }
};