const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, "db/contacts.json")
const { v4 } = require('uuid');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const contact = data.find(contact => contact.id === contactId);
  if (!contact) { return null };
  return contact;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const idx = data.findIndex(contact => contact.id === contactId);
  if (idx === -1) { return null }
  const [removedContact] = data.splice(idx, 1);
  fs.writeFile(contactsPath, JSON.stringify(data));
  return removedContact;
}

async function addContact(name, email, phone) {
  newContact = { id: v4(), name, email, phone };
  const data = await listContacts();
  data.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(data));
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};