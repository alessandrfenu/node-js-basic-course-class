export default function sendEmail(contacts) {
        setInterval(() => {
        const contact = contacts[Math.random() * contacts.length | 0];
        console.log(`sent email to customer: ${contact.email}`);
    }, 10000);
}