const fs = require("fs");
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
    // create takes in attributes the new user record will have.
    // attributes will be an object with email ect
    // need to add this object to the array of users
    // need to write that update to users
    //  password is temporaraly being stored with plain text
    // load up the JSON file
    const records = await this.getAll();
    // push in the new user
    records.push(attrs);
    // write the updated records array back to this.filename - take data, make json and write to the file
    await fs.promises.writeFile(this.filename, JSON.stringify(records));
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
