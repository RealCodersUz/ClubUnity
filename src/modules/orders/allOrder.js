const Order = require("./Order");

const allOrder = async (query) => {
  try {
    const { sort, page, limit } = query || {};

    const searchQuery = {};
    const sortOptions = {};
    const paginationOptions = {};

    // Search
    // if (q) {
    //   const nameQuery = {
    //     $or: [{ : { $regex: q, $options: "i" } }],
    //   };
    //   searchQuery.$and = [nameQuery];
    // }

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

    const data = await Order.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit)
      .lean()
      .exec();

    const totalOrder = await Order.countDocuments(searchQuery);

    return {
      data,
      pageInfo: {
        total: totalOrder,
        offset: paginationOptions.skip,
        limit: paginationOptions.limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = allOrder;
