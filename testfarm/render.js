const jsdom = require("jsdom");
const path = require("path");
const { JSDOM } = jsdom;

const render = async (filename) => {
  const filepath = path.join(process.cwd(), filename);
  const dom = await JSDOM.fromFile(filepath, {
    runScripts: "dangerously",
    resources: "usable",
  });
  return dom;
};

module.exports = render;
