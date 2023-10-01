const express = require("express");
const cors = require("cors");
const db = require("./db");
const config = require("./shared/config");
const handleError = require("./shared/errors/handle");
//
const UserRoute = require("./modules/users/_api");
const RoomRoute = require("./modules/rooms/_api");
const FoodCategories = require("./modules/food_categories/_api");
const Foods = require("./modules/foods/_api");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());

app.use(RoomRoute);
app.use(UserRoute);
app.use(FoodCategories);
app.use(Foods);
// app.use(UserGuideRoute);

app.use(handleError);

db();
app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti.`);
});
