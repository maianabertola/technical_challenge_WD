const router = require("express").Router();
const Phones = "./phones.routes.js";

//   phones	GET	Show all phones (use the phones.json) as fake data

router.get("/phones", async (req, res, next) => {
  try {
    await Phones.find();
    res.status(201).json({ message: "this all the phones" });
  } catch (error) {
    console.log("error when retrieving all the phones data", error);
  }
});

// /phones/:id	GET	Show a phone details
router.get("/phones/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Phones.findByID(id);
    res.status(201).json({ message: "this one phone found by ID" });
  } catch (error) {
    console.log("error when retrieving one phone by ID", error);
  }
});

module.exports = router;
