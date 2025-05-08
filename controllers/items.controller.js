const Item = require("../modules/items.model");

// ------------------- CREATE -------------------
const createItem = async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- DELETE -------------------
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json("Item deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- GET -------------------
const getItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- UPDATE -------------------
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.updateOne(req.body);

    res.status(200).json(await Item.findById(id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getItems, getItem, deleteItem, updateItem, createItem };
