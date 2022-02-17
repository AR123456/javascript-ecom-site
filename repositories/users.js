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
  // get all method
  async getAll() {
    // open  this.filename
    const contents = await fs.promises.readFile(this.filename, {
      encoding: "utf8"
    });
    // read contetns
    console.log(contents);
    // parse the json
    // return parsed data
  }
}

// testing on the fly
const test = async () => {
  const repo = new UsersRepository("users.json");
  await repo.getAll();
};
test();
