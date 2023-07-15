const Utils = require("./utils");

const args = process.argv.slice(2);
const [type, parentDir, from, to] = args;

const utils = new Utils({
  from: parseInt(from) || 1,
  to: parseInt(to) || 100,
  parentDir: parentDir || "img-toplist",
  type: type || "toplist",
  isPageDir: false,
  cookie: `_pk_id.1.01b8=fef645663855b245.1684581857.; remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6IndYNkROYllXWUxTbncycHBtRkZhVlE9PSIsInZhbHVlIjoiR3FmNWJ6VG9jckRIUlR1N2s2VjBaSkJ2UTFGc1ZPOUxjb2l4VVBcL1VtS0NRNmlDcVhhZkpzZ05CWno5VGIwekxZbzZjOFRjUjNRMG9Caml1dDVKanNKVWFaQXo4dVdvT0U4RlFTVHd0d0VhUXlyT3JTYzIrWVI4Y0g5dTd4dG16Y3VRQ3YxUzA4MFJHa1hEVE5XXC94d3B1MnE1dDFLQm43RG1IekRvUG5OZStmTjFWczFqTG1iZzVMVlJFMGVVeG4iLCJtYWMiOiJjY2FjOTJmM2I0YWZhOGY3NWI5MzVmYjc5MzE4ZDY2NDFiMGM3ZmUzNzlmMTA4ZTc2OGZlMWUxMDE5YzQ5YmM1In0%3D; _pk_ref.1.01b8=%5B%22%22%2C%22%22%2C1687181916%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D; _pk_ses.1.01b8=1; XSRF-TOKEN=eyJpdiI6IjV5OU9YTkhtbzJTQ3JxbkhPUnBiOXc9PSIsInZhbHVlIjoibGsyVGYrbzZlYjhReWJnSzVpVW51dGljT1p5Slh1d1h5MzdzNzVXa1wvaVpGS0xKQTdZWVpkXC9BSmNVSEZyTjByIiwibWFjIjoiNjM1YmM5YjIyMTdmNTVlZmM5MjU4MDk4ZWYzMWIzYTRjYmM0MmVhNTBlZjI4NGI0ZTlkMmY3MGJmMTg5ZTBhNCJ9; wallhaven_session=eyJpdiI6IldVNFwvVmFLTzBteGVWVitXcGkrZVJBPT0iLCJ2YWx1ZSI6InA4MXo0RjQxelBjRGRPRVpDMENtWVdnZFFBQ2RFTlJaSWZjYkF5TDlGQ1dJT1dmcUNaZHZMZmgzR0oyRm16MmwiLCJtYWMiOiI4NjM0ZDZmN2MzNjhlYTdjNmZlMjc5ZDhhZDdmMjg3YjA0ZmUxOTgxNGEzNjdmNzk0NDRmZWE0Yzg4ODc5MzQ3In0%3D`,
});
