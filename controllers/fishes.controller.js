const Fish = require("../modules/fishes.model");

// ------------------- CREATE -------------------
const createFish = async (req, res) => {
  try {
    const fish = await Fish.create(req.body);
    res.status(200).json({ fish });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- DELETE -------------------
const deleteFish = async (req, res) => {
  try {
    const { id } = req.params;
    const fish = await Fish.findByIdAndDelete(id);

    if (!fish) {
      return res.status(404).json({ message: "Fish not found" });
    }

    res.status(200).json("Fish deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- GET -------------------
const getFishes = async (req, res) => {
  try {
    const fishes = await Fish.find({});
    res.status(200).json({ fishes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFish = async (req, res) => {
  try {
    const { id } = req.params;

    const fish = await Fish.findById(id);
    res.status(200).json(fish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------- UPDATE -------------------
const updateFish = async (req, res) => {
  try {
    const { id } = req.params;
    const fish = await Fish.findById(id);

    if (!fish) {
      return res.status(404).json({ message: "Fish not found" });
    }

    await fish.updateOne(req.body);

    res.status(200).json(await Fish.findById(id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFishes, getFish, deleteFish, updateFish, createFish };
