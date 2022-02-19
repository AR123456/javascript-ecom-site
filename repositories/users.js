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
    // get records
    const records = await this.getAll();
    // use find array method find first record with an id property === the value that was passed in
    return records.find((record) => record.id === id);
  }
  async delete(id) {
    const records = await this.getAll();
    //filter retains elements that return true, filters out false
    const filteredRecords = records.filter((record) => record.id !== id);
    // pass filteredRecords into the write all funciton to store in the file on the local computer
    await this.writeAll(filteredRecords);
  }
}

// testing on the fly
const test = async () => {
  const repo = new UsersRepository("users.json");
  // await repo.create({ email: "test@test.com", password: "password" });
  // const users = await repo.getAll();
  // test delete
  await repo.delete("2c592313");
};
test();
