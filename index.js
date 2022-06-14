const operations = require('./contacts');
const argv = require('yargs').argv;
const { program } = require('commander');
const { option } = require('yargs');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await operations.listContacts();
      console.log("All contacts:", contacts);
      break;
    case 'get':
      const contact = await operations.getContactById(id);
      if (!contact) {
        console.log(`The contact with id ${id} not found !`);
        return
      }
      console.log(contact);
      break;
    case 'remove':
      const removedContact = await operations.removeContact(id);
      if (removedContact === null) {
        console.log(`The contact with id ${id} not found !`);
        return
      }
      console.log(`Contact id=${id} have been removed`);
      console.log(removedContact);
      break;
    case 'add':
      const newContact = await operations.addContact(name, email, phone);
      console.log(`new contact was added:`);
      console.log(newContact);
      break;
    default:
      console.log('\x1B[31m Unknown action type!');
      break;
  }   
}

program
  .option('-a, --action <type>', 'operation')
  .option('-i, --id <type>', 'id')
  .option('-n, --name <type>', 'name')
  .option('-e, --email <type>', 'type')
  .option('-p, --phone <type>', 'phone')

program.parse(process.argv);
const options = program.opts();
invokeAction(options);