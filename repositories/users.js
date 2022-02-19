const fs = require("fs");
const crypto = require("crypto");
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
    attrs.id = this.randomId();
    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
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
  // get one by a filter - filters object
  // https://www.w3schools.com/js/js_loop_forof.asp
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
  async getOneBy(filters) {
    //get the current copy of all records
    const records = await this.getAll();
    // for of is for arrays
    for (let record of records) {
      // a temporary variable
      let found = true;
      // iterate over filters object and for ever key value pair look for match on the keys value
      // use for in for an object
      for (let key in filters) {
        // if not the same update found to false
        // look for the value of the object at that particular key looks lke this  filters[key];
        if (record[key] !== filters[key]) {
          // return what is true
          found = false;
        }
      }
      if (found === true) {
        return record;
      }
    }
  }
}

// testing on the fly
const test = async () => {
  const repo = new UsersRepository("users.json");
  // get one using email as a filter
  const user = await repo.getOneBy({
    // this is filter being passed into getOneBy
    email: "test2@test2.com",
  });
  console.log(user);
};
test();
