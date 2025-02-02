const { smd, prefix, Config } = require("../lib");
const axios = require("axios");

// Function to fetch random images for any category
const fetchRandomImage = async (cld, { Void, smd: cmdName, category }) => {
  try {
    // Fetch data from the random images API based on the category
    const response = await axios.get(`https://random-images-6flf.onrender.com/api/images/${category}`);
    
    // Log the response for debugging (you can remove this later)
    console.log(response.data);

    // Extract images from the response
    const images = response.data.images;
    if (!images || images.length === 0) {
      throw `No ${category} images found`;
    }

    // Pick a random image
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // Send the image to the user
    cld.send(randomImage, { caption: `Here is a random ${category} image for you!\n\nPOWERED BY NARUTO` }, "img", cld);
  } catch (err) {
    console.log(err);
    cld.send(`An error occurred: ${err}`);
  }
};

// Commands for different categories
const categories = ["dog", "cat", "cars", "animal", "animepic", "naruto"];

for (let i = 0; i < categories.length; i++) {
  smd(
    {
      cmdname: categories[i], // Dynamically use category name
      infocmd: `get a random ${categories[i]} image`,
      type: categories[i],
    },
    async (cld, text, { smd: cmdName, Void }) => {
      try {
        fetchRandomImage(cld, { Void, smd: cmdName, category: categories[i] });
      } catch (err) {
        console.log(err);
      }
    }
  );
}

// Example for dog category specifically
smd(
  {
    cmdname: "dog",
    infocmd: "get a random dog image",
    type: "dog",
  },
  async (cld, text, { smd: cmdName, Void }) => {
    try {
      fetchRandomImage(cld, { Void, smd: cmdName, category: "dog" });
    } catch (err) {
      cld.error(`${err}\n\nCommand: ${cmdName}`, err, false);
    }
  }
);