const { program } = require('commander');
const contacts = require('./src/contacts')

program
    .option("-a, --action [type]", 'choose action: list | get | remove | add')
    .option("-i, --id [type]", 'contact id')
    .option("-n, --name [type]", 'contact name')
    .option("-e, --email [type]", 'contact email')
    .option("-p, --phone [type]", 'contact phone');

program.parse();
const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.table(allContacts);
            break;

        case "get":
            const contactById = await contacts.getContactById(id)
            console.table(contactById);
            break;

        case "add":
            const contactAdd = await contacts.addContact(name, email, phone)
            console.table(contactAdd);
            break;

        case "remove":
            const contactDeleteById = await contacts.removeContact(id);
            console.table(contactDeleteById);
            break;

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);

// invokeAction({ action: 'list' })
// invokeAction({ action: 'get', id: 'Z5sbDlS7pCzNsnAHLtDJd' })
// invokeAction({ action: 'get', id: 'Z5sbDlS7pCzNHLtDJd' })
// invokeAction({ action: 'remove', id: 'AeHIrLTr6JkxGE6SN-0Rw' })
// invokeAction({ action: "add", name: "Allen Raymond", email: "nulla.ante@vestibul.co.uk", phone: '(992) 914-3792' });