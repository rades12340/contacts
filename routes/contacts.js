const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const Contact = require("../models/Contact");

//@route   GET api/contacts
//desc     Get all users contacts
//@access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//@route   POST api/contacts
//desc     Add a contact
//@access  Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("email", "Please include a valid email").isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route   PUT api/contacts/:id
//desc     Update contact
//@access  Private
router.put(
  "/:id",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("email", "Please include a valid email").isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;
    const { id } = req.params;

    try {
      // const contact = await Contact.findById(id);

      const newContact = new Contact({
        _id: id,
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const cont = await Contact.findByIdAndUpdate(id, newContact);
      res.json(cont);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

//@route   DELETE api/contacts/:id
//desc     Delete contact
//@access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const cont = await Contact.findByIdAndDelete(id);
    if (!cont) {
      return res.status(404).json({ msg: "There is no contact" });
    }
    res.json({ msg: "Contact deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
