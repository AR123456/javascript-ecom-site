// Class is not an object, it’s like blueprint which can generate objects. So, class helps to set the classification of objects with its properties and capabilities.  Any number of instance can be created from a class, each instance is called Object.  https://codeburst.io/javascript-object-oriented-programming-using-es6-3cd2ac7fbbd8
const fs = require("fs");
class UsersRepository {
  // check to see if we have a file to store the data
  // use a constructor for this
  constructor(filename) {
    //check for file and if none throw error
    if (!filename) {
      throw new Error("Creating a repository requires a file name ");
    }
    // store the file name provided in an instance variable
    this.filename = filename;
    // if the file exits   if not
    // note using fs.accessSync here because it is only being used once, will only make this file when first setting up the users file.  Normaly would not want to use this for performace reasons.  Sync here is waiting vs async which goes on with other stuff while waiting.  A function in a javascript constructor cannot be async in nature so have to use this here.  Alternatively could put an asnc checkForFile() outside of the contructor but in the class.  When doing this would need to  do then const repo = new UsersRepository()  then call the check for file function...

    // if no file exits will throw error so use try catch here
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      // no file so make one- using writeFileSync for reasons above.  Will only do this one time and cannot have async in a constructor so performance not issue.
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async checkForFile() {}
}

// testing on the fly
const repo = new UsersRepository("users.json");
