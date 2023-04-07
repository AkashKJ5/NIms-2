import { addRxPlugin, createRxDatabase } from "rxdb";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { wrappedKeyEncryptionCryptoJsStorage } from "rxdb/plugins/encryption-crypto-js";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import { wrappedKeyCompressionStorage } from "rxdb/plugins/key-compression";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";

import { collections } from "../schemas";


const prepareRxDB = () => {
  if (process.env.DEBUG) {
    addRxPlugin(RxDBDevModePlugin);
  }
  addRxPlugin(RxDBJsonDumpPlugin);
  addRxPlugin(RxDBMigrationPlugin);
  addRxPlugin(RxDBQueryBuilderPlugin);
  addRxPlugin(RxDBUpdatePlugin);
};

const getStorage = () => {
  const storageDexie = getRxStorageDexie();
  const storageCompressed = wrappedKeyCompressionStorage({
    storage: storageDexie,
  });
  const storageEncrypted = wrappedKeyEncryptionCryptoJsStorage({
    storage: storageCompressed,
  });

  return storageEncrypted;
};

/**
 * Initialize RxDB database.
 * @async
 * @returns An array of two elements:
 *  - the first one is the possible error,
 *  - the second one is the database
 *
 * @example
 *  const [database, setDatabase] = React.useState();
 *  const [error, setError] = React.useState();
 *
 *  const initDB = async () => {
 *    setError(null);
 *    setDatabase(null);
 *
 *    const { err, db } = await initializeDb();
 *
 *    setDatabase(db);
 *    setError(err);
 *  };
 */
const initializeDb = async () => {
  try {
    prepareRxDB();

    const db = await createRxDatabase({
      name: "nemmadi-mobile",
      storage: getStorage(),
      password: "wwwdotnemmadidotcom",
      multiInstance: false,
      ignoreDuplicate: true,
    });

    try {
      // --------------------------- Adding Collections ----------------------->
      await db.addCollections({ ...collections });
    } catch (err) {
      console.error("Error while adding collections");
      console.error(err);
      return { err };
    }

    return { db };
  } catch (err) {
    console.error("Error while connecting to database");
    console.error(err);
    return { err };
  }
};

export default initializeDb;
