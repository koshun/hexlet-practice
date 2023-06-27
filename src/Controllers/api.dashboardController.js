import Accaunt from '../Models/accaunt.model.js';

export default async (req, res) => {
  const { id } = req.params;
  try {
    const destroyable = await Accaunt.destroy({
      where: {
        id,
      },
    });
    res.json({ message: destroyable });
  } catch (e) {
    console.error('Cannot delete item', e);
  }
};
