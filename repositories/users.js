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
        encoding: "utf8"
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
    // get records
    const records = await this.getAll();
    // use find array method find first record with an id property === the value that was passed in
    return records.find(record => record.id === id);
  }
  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter(record => record.id !== id);
    // pass filteredRecords into the write all funciton to store in the file
    await this.writeAll(filteredRecords);
  }
  async update(id, attrs) {
    // get all records then find the one we care about
    const records = await this.getAll();
    const record = records.find(record => record.id === id);
    if (!record) {
      throw new Error(`No record found with id of ${id}`);
    }

    // https://www.geeksforgeeks.org/object-assign-javascript/
    // will take all of the differrend properties and key value paris insde the attrs object and copy thme one by one into the records object .   IE take all the properties from adders and assing them or copy them over to record
    // record ==={email:"test@test.com"}
    // attrs ==={password:"mypassword"}
    Object.assign(record, attrs);
    // record = {email:"test@test.com", password: "mypassword"}
    /////
    //write back to ile
    await this.writeAll(records);
  }
}

// testing on the fly
const test = async () => {
  const repo = new UsersRepository("users.json");
  // create a user
  // await repo.create({ email: "test2@test2.com" });
  // call update and add password
  await repo.update("cdbdf6f6", { password: "password2" });
};
test();
