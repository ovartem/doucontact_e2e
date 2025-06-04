import { faker } from '@faker-js/faker';
import { UserData } from '../typings/userData';


export function getUserData(): UserData {
    return {
        name: faker.person.fullName(),
        title: faker.person.jobTitle() + ' ' + faker.company.name(),
        link1: faker.internet.url(),
        link2: faker.internet.url(),
        link3: faker.internet.url()
    };
}

    export const userDataWith2Links: UserData = {
    name: 'Test User',
    title: 'Product Manager',
    link1: '+38 050-1112233',
    link2: '@mynik',
  };


    export const userDataAllFields: UserData = {
    name: 'Updated name',
    title: 'New title',
    link1: 'SomeNewContact',
    link2: '@somenewnik',
    link3: '@mysecondnik',
  };

    export const userDataWith1Link: UserData = {
    name: 'Automation',
    title: 'QA',
    link1: 'instagram',
    link2: '',
    link3: '',

  }

