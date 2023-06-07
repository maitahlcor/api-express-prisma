const {
  getAllContacts,
  getContactsById,
  createContact,
  editContact,
  deleteContact,
} = require("./model");

async function handleGetAllContacts(req, res) {
  const records = await getAllContacts();
  res.status(200).json(records);
}

async function handleGetByIdContact(req, res) {
  const { id } = req.params;
  const record = await getContactsById(id);
  if (Object.keys(record).length === 0) {
    return res.status(404).json({ message: "Contact not found" });
  }
  return res.status(200).json(record);
}

async function handleCreateContact(req, res) {
  const data = req.body;
  const { name, phone_number } = data;
  const record = await createContact(data);
  if (!phone_number) {
    return res.status(400).json({ message: "Number is empty" });
  }else if (name === data.name) {
    return res.status(400).json({ message: "Contact already exist" });
  }else{
  return res.status(201).json(record);
  }
}

async function handleEditContact(req, res) {
  const { id } = req.params;
  const contact = req.body;
  const record = await editContact(id, contact);
  if (Object.keys(record).length === 0) {
    return res.status(404).json({ message: "Contact not found" });
  }
  return res.status(202).json(record);
}

async function handleDeleteContact(req, res) {
  const { id } = req.params;
  await deleteContact(id);
  return res.status(204).json({ message: "Contact Deleted" });
}

module.exports = {
  handleGetAllContacts,
  handleGetByIdContact,
  handleCreateContact,
  handleEditContact,
  handleDeleteContact,
};