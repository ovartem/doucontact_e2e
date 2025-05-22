import { faker } from '@faker-js/faker';

export function getUserData() {
    return {
        name: faker.person.fullName(),
        title: faker.person.jobTitle() + ' ' + faker.company.name(),
        link1: faker.internet.url(),
        link2: faker.internet.url(),
        link3: faker.internet.url()
    };
}