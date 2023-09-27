const Room = require("./Room");

const allRoom = async (query) => {
  try {
    const { q, sort, filters, page, limit } = query || {};

    const searchQuery = {};
    const sortOptions = {};
    const paginationOptions = {};

    // Search
    if (q) {
      const nameQuery = {
        $or: [{ type_name: { $regex: q, $options: "i" } }],
      };
      searchQuery.$and = [nameQuery];
    }

    // Filtering
    if (filters && filters.room_active) {
      searchQuery.room_active = filters.room_active;
    }

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

    const data = await Room.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit)
      .lean()
      .exec();

    const totalRoom = await Room.countDocuments(searchQuery);

    return {
      data,
      pageInfo: {
        total: totalRoom,
        offset: paginationOptions.skip,
        limit: paginationOptions.limit,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = allRoom;
