//Internal Lib Import
const { categoryService } = require("../../../../services");

const findSingle = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  const expand = req.query.expand || "";
  try {
    const category = await categoryService.findSingle({ userId, id, expand });
    const response = {
      statusCode: 200,
      data: category,
    };
    res.json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = findSingle;
