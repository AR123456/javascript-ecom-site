// home of the base class with all of the methods that will be shared between
//users and products and any other future repository

const fs = require("fs");
const crypto = require("crypto");
module.exports = class Repository {
  //move most in stuff from the user class here except the create and comparePasswords since it is so specific to users
  //this reop will have a genric create for other things

  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repository requires a file name ");
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  /// this is important and is needed because the create that was here is now in users and products
  /// the create in products and users are slightly difrent.
  async create(attrs) {
    /// this is a generic create method that can be used for different non user records
    attrs.id = this.randomId();
    const records = await this.getAll();
    records.push(record);
    // if this was a db would be writing to it.
    await this.writeAll(records);
    return atters;
  }
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }
  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }
  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }
  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }
  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);
    if (!record) {
      throw new Error(`No record found with id of ${id}`);
    }
    Object.assign(record, attrs);
    await this.writeAll(records);
  }
  async getOneBy(filters) {
    const records = await this.getAll();
    for (let record of records) {
      let found = true;
      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found === true) {
        return record;
      }
    }
  }
};
