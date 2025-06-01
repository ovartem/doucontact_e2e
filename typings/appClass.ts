import { MainPage } from '../pageObjects/Main.page';
import { CreateProfilePage } from '../pageObjects/CreateProfile.page';
import { ContactsPage } from '../pageObjects/Contacts.page';
import { CardPage } from '../pageObjects/Card.page';
import { AddContactPage } from '../pageObjects/AddContact.page';
import { Footer } from '../pageObjects/Footer.fragment';
import { Page } from '@playwright/test';

export class App {
    mainPage: MainPage;
    createProfilePage: CreateProfilePage;
    contactsPage: ContactsPage;
    addContactPage: AddContactPage;
    cardPage: CardPage;
    footer: Footer;

    constructor(page: Page) {
        this.mainPage = new MainPage(page);
        this.createProfilePage = new CreateProfilePage(page);
        this.contactsPage = new ContactsPage(page);
        this.addContactPage = new AddContactPage(page);
        this.cardPage = new CardPage(page);
        this.footer = new Footer(page);

    }

};