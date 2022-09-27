const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const getAll = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error.massage);
  }
};
async function getContactById(id) {
  try {
    const contacts = await getAll();
    const contactToFind = contacts.find((item) => item.id === id);
    return contactToFind ? contactToFind : null;
  } catch (error) {
    console.error(error.massage);
  }
}

async function removeContact(id) {
  try {
    const contacts = await getAll();
    const contactToFind = await getContactById(id);
    if (!contactToFind) {
      return null;
    }
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactToFind.id
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return contactToFind;
  } catch (error) {
    console.error(error.massage);
  }
}

async function addContact(data) {
  try {
    const contacts = await getAll();
    const newContact = { id: nanoid(), ...data };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.massage);
  }
}

module.exports = {
  getAll,
  getContactById,
  addContact,
  removeContact,
};
