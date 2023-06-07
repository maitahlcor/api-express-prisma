const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getAllContacts() {
  const records = await prisma.Contacts.findMany();
  return (records);
}

async function getContactsById(id) {
  const record = await prisma.Contacts.findUnique({
    where: {
      id
    }
  });
  return record;
}

async function createContact(data) {
  const record = await prisma.Contacts.create({
    data
  });
  return record;
}

async function editContact(id, contact) {
  const record = await prisma.Contacts.update({
    where: { id },
    data: { ...contact }
  });
  return record;
}

async function deleteContact(id) {
  const record = await prisma.Contacts.delete({
    where: { id }
  });
  return record;
}

module.exports = {
  getAllContacts,
  getContactsById,
  createContact,
  editContact,
  deleteContact,
};