const Utils = require("./utils");

const args = process.argv.slice(2);
const [type, parentDir, from, to] = args;

const utils = new Utils({
  from: parseInt(from) || 1,
  to: parseInt(to) || 10,
  parentDir: parentDir || "toplist-img",
  type: type || "toplist",
  isPageDir: false,
  cookie: `YOUR_COOKIE` 
});
