const { Contact } = require("./contact");

async function listContacts() {
  const data = await Contact.find();
  return data;
}

async function getContactById(id) {
  const result = await Contact.findById(id);
  return result || null;
}

async function removeContact(id) {
  const result = await Contact.findByIdAndRemove(id);
  return result;
}

async function addContact(data) {
  const result = await Contact.create(data);
  return result;
}

const updateContact = async (id, data) => {
  const result = await Contact.findByIdAndUpdate(id, data, { new: true });
  return result;
};

const updateStatusContact = async (id, favorite) => {
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
