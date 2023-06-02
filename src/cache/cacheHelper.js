const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const { access, constants, writeFile } = require("node:fs/promises");
const { apiDataTable } = require("./apiDataSchema");

let database;

//Create database connection to existing db-file or create it first and then connect
const initDatabase = async function (filepath) {
  try {
    await access(filepath, constants.R_OK | constants.W_OK);
    await openDatabase(filepath);
  } catch (err) {
    console.info("CACHE NOT FOUND - Creating a new cache database");
    await writeFile(filepath, "");
    await openDatabase(filepath);
    await createCacheTable();
  }
};

const createCacheTable = async () => {
  const sqlQuery = `CREATE TABLE ${apiDataTable}`;
  await database.exec(sqlQuery);
};

const openDatabase = async function (filepath) {
  database = await open({
    filename: filepath,
    driver: sqlite3.cached.Database,
  });
};

const checkCache = async (req, res, next) => {
  const sqlQuery = `SELECT * FROM apiData WHERE id = ?`;
  const result = await database.get(sqlQuery, req.params.id);
  if (result) {
    //SQLite does not support boolean type so we turn it back to boolean when fetching from db
    result.completed = !!result.completed;
    const { id, ...newObject } = result;
    req.cached = newObject;
  }
  next();
};

const saveToCache = async (apiData) => {
  const apiDataArray = [
    apiData.id,
    apiData.name,
    apiData.username,
    apiData.title,
    apiData.completed,
    apiData.description,
  ];
  const sqlQuery = `INSERT INTO apiData(
    id, name, username, title, completed, description) VALUES (?,?,?,?,?,?);`;
  return await database.run(sqlQuery, apiDataArray);
};

const clearCache = async () => {
  const sqlQuery = `DELETE FROM apiData;`;
  return await database.run(sqlQuery);
};

const closeDatabase = async function () {
  await database.close();
};

module.exports = {
  initDatabase,
  checkCache,
  saveToCache,
  clearCache,
  closeDatabase,
};
