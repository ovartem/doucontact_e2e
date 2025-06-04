export type UserData = {
  name: string;
  title?: string;
  link1?: string;
  link2?: string;
  link3?: string;
};


export interface ContactCard {
  id: string;
  name: string;
  title: string;
  image?: string;
  note?: string;
  links?: string[];
}

export interface ContactsFile {
  savedContacts: ContactCard[];
}


