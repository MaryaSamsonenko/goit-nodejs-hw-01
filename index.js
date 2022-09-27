const contacts = require("./contacts");
// const { program } = require("commander");
const { Command } = require("commander");
const program = new Command();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.getAll();
      console.table(allContacts);
      break;
    case "get":
      const contactById = await contacts.getContactById(id);
      console.table(contactById);
      break;

    case "add":
      const newContact = await contacts.addContact({
        name,
        email,
        phone,
      });
      console.table(newContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
