const fs = require("fs");
const path = require("path");
const render = require("./render");

class Runner {
  constructor() {
    this.testfiles = [];
  }

  async collectFiles(targetPath) {
    const files = await fs.promises.readdir(targetPath);

    for (let file of files) {
      const filepath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filepath);

      if (stats.isFile() && file.includes(".test.js")) {
        this.testfiles.push({ name: filepath });
      } else if (stats.isDirectory()) {
        const childfiles = await fs.promises.readdir(filepath);
        files.push(...childfiles.map((f) => path.join(file, f)));
      }
    }

    return files;
  }

  async runTests() {
    for (let file of this.testfiles) {
      const beforeEaches = [];
      global.render = render;
      global.beforeEach = (fn) => {
        beforeEaches.push(fn);
      };

      global.it = (desc, fn) => {
        try {
          beforeEaches.forEach((func) => func());
          fn();
          console.log(`OK - ${desc}`);
        } catch (err) {
          console.log(`X - ${desc}`);
          console.log(("\t", err.message));
        }
      };
      try {
        require(file.name);
        console.log(`OK Test Execution performed on ${file.name}`);
      } catch (err) {
        console.log((`X - Error Loading File`, file.name));
        console.log(("\t", err.message));
      }
    }
  }
}

module.exports = Runner;
