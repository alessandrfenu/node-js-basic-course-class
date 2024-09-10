import { faker } from '@faker-js/faker';

export default function generateRandomContacts() {
    return Array(10).fill(null).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
    }));
} 