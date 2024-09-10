import  generateRandomContacts  from './contacts.mjs';
import  sendEmail from './sender.mjs';
import  callToCustomer from './caller.mjs';

function run() {
    const retirevedContacts = generateRandomContacts();
    callToCustomer(retirevedContacts);
    sendEmail(retirevedContacts);
}

run();