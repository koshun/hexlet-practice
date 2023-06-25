import Collection from '../Models/collection.model.js';

const index = async (req, res) => {
  try {
    const collections = await Collection.findAll({
      attributes: ['id', 'name'],
    });
    res.json({ collections });
  } catch (e) {
    res.json({ collections: 'Не удаётся получить данные' });
  }
};

const updateCollection = async (req, res) => {
  // const { id } = req.params;
  const { name, id } = req.body;
  try {
    const result = await Collection.update({ name }, {
      where: {
        id,
      },
    });
    res.json({ message: result });
  } catch (e) {
    res.json({ message: `Что-то пошло не так ${e}` });
  }
};
const deleteCollection = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Collection.destroy({
      where: {
        id,
      },
    });
    res.json({ message: result });
  } catch (e) {
    res.json({ message: e });
  }
};
export {
  index,
  updateCollection,
  deleteCollection,
};
