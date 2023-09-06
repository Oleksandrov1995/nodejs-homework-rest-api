const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");

async function getContacts(req, res, next) {
  try {
    const result = await Contact.find({ owner: req.user.id });
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  const { id } = req.params;
  try {
    const result = await Contact.findById(id);
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    if (result.owner.toString() !== req.user.id) {
      return res
        .status(404)
        .send({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function removeContact(req, res, next) {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    if (result.owner.toString() !== req.user.id) {
      return res
        .status(404)
        .send({ message: "Not found" });
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
}

async function addContact(req, res, next) {
  const newContact = { ...req.body, owner: req.user.id };
  try {
    const result = await Contact.create(newContact);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    if (result.owner.toString() !== req.user.id) {
      return res
        .status(404)
        .send({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function updateContactStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    if (result.owner.toString() !== req.user.id) {
      return res
        .status(404)
        .send({ message: "Not found" });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
