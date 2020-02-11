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
    // attach an id propterty to the attrs object
    // call randomId on it
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
  // this function will create a random ID to assign to items ( users or products) that are saved to the file
  // using nodes crypto to generate the random number
  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }
}

// testing on the fly
const test = async () => {
  const repo = new UsersRepository("users.json");
  await repo.create({ email: "test@test.com", password: "password" });
  const users = await repo.getAll();
  console.log(users);
};
test();
