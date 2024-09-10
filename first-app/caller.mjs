export default function callToCustomer(contacts) {
    setInterval(() => {
        const contact = contacts[Math.random() * contacts.length | 0];
        console.log(`called customer: ${contact.name}`);
    }, 5000);
}