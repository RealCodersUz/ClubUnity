const Food = require("./Food");

const allFood = async (query) => {
  try {
    const { q, sort, page, limit } = query || {};

    const searchQuery = {};
    const sortOptions = {};
    const paginationOptions = {};

    // Search
    if (q) {
      const nameQuery = {
        uz_name: { $regex: new RegExp(q, "i") }, // Case-insensitive regex search for q
        ru_name: { $regex: new RegExp(q, "i") }, // Case-insensitive regex search for ru_name
      };
      searchQuery.$and = [nameQuery];
    }

    // Filtering

    // Sorting
    if (sort && sort.by) {
      sortOptions[sort.by] = sort.order === "desc" ? -1 : 1;
    }

    // Pagination
    const itemsPerPage = parseInt(limit) || 3;
    const currentPage = parseInt(page) || 1;
    const offset = parseInt(page.offset) || 0;
    const requestedLimit = parseInt(page.limit) || itemsPerPage;

    paginationOptions.skip = offset;
    paginationOptions.limit = requestedLimit;

    const data = await Food.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit)
      .lean()
      .exec();

    const totalFood = await Food.countDocuments(searchQuery);

    return {
      data,
      pageInfo: {
        total: totalFood,
        offset: paginationOptions.skip,
        limit: paginationOptions.limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = allFood;
