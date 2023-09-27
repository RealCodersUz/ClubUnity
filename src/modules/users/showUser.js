const { NotFoundError } = require("../../shared/errors");
const User = require("./User");

const showUser = async ({ id }) => {
  try {
    const data = await User.findById(id);
    if (!data) {
      throw new NotFoundError("User Not Found.");
    }

    console.log(data);

    const result = {
      // _id: data._id,
      full_name: data.full_name,
      email: data.email,
      phone_number: data.phone_number,
      is_super: data.is_super,
      username: data.username,
      password: data.password,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = showUser;
