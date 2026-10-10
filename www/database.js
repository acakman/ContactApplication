import {open} from '@op-engineering/op-sqlite';

// Same file name and (Android) location as the previous react-native-sqlite-storage database,
// so existing contacts are preserved after the upgrade.
const db = open({name: 'database.db'});

const ready = db.execute('CREATE TABLE IF NOT EXISTS Contacts ('
  + ' id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
  + ' firstname text NOT NULL,'
  + ' lastname text,'
  + ' email text,'
  + ' number text NOT NULL,'
  + ' notes text,'
  + ' image text);');

const execute = async (query, params = []) => {
  await ready;
  return db.execute(query, params);
};

export class ContactObj {
  constructor({firstname, lastname, number, email, id, notes, image}) {
    this.firstname = firstname ?? '';
    this.lastname = lastname ?? '';
    this.number = number == null ? '' : String(number);
    this.email = email ?? '';
    this.id = id;
    this.notes = notes ?? '';
    this.image = image ?? '';
  }
}

export const deleteTable = () => execute('DROP TABLE Contacts;');

export const update = (firstname, lastname, number, email, id, notes, image) => execute(
  'UPDATE Contacts SET firstname = ?, lastname = ?, number = ?, email = ?, notes = ?, image = ? WHERE id = ?;',
  [firstname, lastname, number, email, notes, image, id],
);

export const insert = (firstname, lastname, number, email, notes, image) => execute(
  'INSERT INTO Contacts (firstname, lastname, number, email, notes, image) VALUES (?,?,?,?,?,?);',
  [firstname, lastname, number, email, notes, image],
);

export const remove = id => execute('DELETE FROM Contacts WHERE id = ?;', [id]);

export const getArray = async () => {
  const {rows} = await execute('SELECT * FROM Contacts ORDER BY firstname ASC;');
  return rows.map(row => new ContactObj(row));
};
