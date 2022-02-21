const fs = require("fs");
// crypto is part of node.js  so no extra package needed
const crypto = require("crypto");
// use promisify function from the library to store the hashed const with the user in the DB
//turn the callback based version of this into a promise based version so we can use the async await syntax
const util = require("util");
// scrypt come from node.js, hashing system, running through promisify so we can use async await
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
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

  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }
  async create(attrs) {
    // asume attrs ==={email: "", password:""}
    //generate salt and append to paswword, then hash it
    // nodejs crypto.randomeBytes to salt and crypto.scrypt to hash
    attrs.id = this.randomId();
    const salt = crypto.randomBytes(8).toString("hex");
    // scrypt(attrs.password, salt, 64, (err, buf) => {
    //   const hashed = buf.toString("hex");
    //   // use promisify fuction from the library to store the hassed const with the user in the DB
    //   //turn the callback based version of this into a promise based version so we can use the async await syntax
    // });
    //// promisify version
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString("hex")}.${salt}`,
    };
    // no longer using the atters object which has the raw password
    // records.push(attrs);
    // records.push({
    //   // take properties out of the attrs object
    //   ...attrs,
    //   // overwrite the password with this
    //   password: `${buf.toString("hex")}.${salt}`
    // });
    records.push(record);
    await this.writeAll(records);
    // return attrs;
    return record;
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
}
module.exports = new UsersRepository("users.json");
