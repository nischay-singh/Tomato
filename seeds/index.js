const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Restaurant = require("../models/restaurant");

const dbUrl = process.env.DB_URL || "mongodb://0.0.0.0:27017/tomato";
console.log(dbUrl);
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Restaurant.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const restaurant = new Restaurant({
      author: "649ef19885fa5cd70e80291d",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dyzokyko2/image/upload/v1684677715/Tomato/t9io4rojflvj1ovhpy4a.jpg",
          filename: "Tomato/t9io4rojflvj1ovhpy4a",
        },
        {
          url: "https://res.cloudinary.com/dyzokyko2/image/upload/v1684677717/Tomato/s5omr1s2fdhsffgux0n4.jpg",
          filename: "Tomato/s5omr1s2fdhsffgux0n4",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quod veritatis dolores rem magnam culpa doloremque rerum sed, odio voluptatem repudiandae consectetur accusantium nam exercitationem dignissimos, corporis ipsa aliquid distinctio?",
      price,
    });
    await restaurant.save();
  }
};

seedDB().then(() => {
  db.close();
});
