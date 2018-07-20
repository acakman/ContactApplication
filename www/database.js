import SQLite from 'react-native-sqlite-storage';
/* eslint-disable */
var db = SQLite.openDatabase({
  name: 'database.db',
  location: 'default'});
/* eslint-enable */
// TODO store images in the database in BLOB form
export const deleteTable = () => {
  db.transaction((tx) => {
    tx.executeSql('DROP TABLE Contacts;');
  }, (error) => {
    // console.log(`Table delete error: ${error.message}`);
  }, () => {
    // console.log('Table deletion succesful');
  });
};
export const update = (firstname, lastname, number, email, id, notes, image) => {
  db.transaction((tx) => {
    tx.executeSql(`UPDATE Contacts
                  SET firstname= '${firstname}', lastname= '${lastname}', number= ${number}, email= '${email}', notes= '${notes}', image= '${image}'
                  WHERE id= ${id};`, []);
  }, (error) => {
    // console.log(`Update transaction error: ${error.message}`);
  }, () => {
    // console.log('Update transaction is succesful.');
  });
};
export class ContactObj {
  constructor({firstname, lastname, number, email, id, notes, image}) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.number = number;
    this.email = email;
    this.id = id;
    this.notes = notes;
    this.image = image;
  }
}

export const insert = (firstname, lastname, number, email, notes, image) => {
  db.transaction((tx) => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS Contacts ('
      + ' id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'
      + ' firstname text NOT NULL,'
      + ' lastname text,'
      + ' email text,'
      + ' number text NOT NULL,'
      + ' notes text,'
      + ' image text);');
    tx.executeSql('INSERT INTO Contacts '
      + '(firstname, lastname, number, email, notes, image)'
      + 'VALUES (?,?,?,?,?,?)', [firstname, lastname, number, email, notes, image]);
  }, (error) => {
    console.log(`Insert transaction error: ${error.message}`);
  }, () => {
    console.log('Insert transaction is succesful');
  });
};
export const remove = (id) => {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM Contacts WHERE id=?;', [id]);
  }, (error) => {
    console.log(`Remove from DB error: ${error.message}`);
  }, () => {
    console.log('Remove is succesful');
  });
};
export const getArray = () => new Promise((resolve, reject) => {
  const array = [];
  db.transaction((tx) => {
    tx.executeSql('SELECT * FROM Contacts ORDER BY firstname ASC ', [], (tx, resultSet) => {
      for (let i = 0; i < resultSet.rows.length; i++) {
        const row = resultSet.rows.item(i);
        const obj = new ContactObj(row);
        array.push(obj);
      }
    });
  }, (error) => {
    // console.log(`Reading from DB error: ${error.message}`);
    reject(error);
    console.log(`GetArray error => ${error}`);
  },
  () => {
    // console.log('Reading from DB is succesful');
    resolve(array);
    console.log('GetArray is succesful.');
  });
});
/* eslint-enable */
