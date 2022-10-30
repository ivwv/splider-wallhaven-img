const Utils = require("./utils");
// const utils = new Utils(1, 10, "imgs", "toplist", false);
const utils = new Utils({
  from: 1,
  to: 20,
  parentDir: "imgs",
  type: "hot",
  isPageDir: false,
  cookie: "YOUR_COOKIE",
});
