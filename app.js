const Utils = require("./utils");

const args = process.argv.slice(2);
const [type, parentDir, from, to] = args;

const utils = new Utils({
  from: parseInt(from) || 1,
  to: parseInt(to) || 100,
  parentDir: parentDir || "toplist-img",
  type: type || "toplist",
  isPageDir: false,
  cookie: `_pk_id.1.01b8=fef645663855b245.1684581857.; remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6IndYNkROYllXWUxTbncycHBtRkZhVlE9PSIsInZhbHVlIjoiR3FmNWJ6VG9jckRIUlR1N2s2VjBaSkJ2UTFGc1ZPOUxjb2l4VVBcL1VtS0NRNmlDcVhhZkpzZ05CWno5VGIwekxZbzZjOFRjUjNRMG9Caml1dDVKanNKVWFaQXo4dVdvT0U4RlFTVHd0d0VhUXlyT3JTYzIrWVI4Y0g5dTd4dG16Y3VRQ3YxUzA4MFJHa1hEVE5XXC94d3B1MnE1dDFLQm43RG1IekRvUG5OZStmTjFWczFqTG1iZzVMVlJFMGVVeG4iLCJtYWMiOiJjY2FjOTJmM2I0YWZhOGY3NWI5MzVmYjc5MzE4ZDY2NDFiMGM3ZmUzNzlmMTA4ZTc2OGZlMWUxMDE5YzQ5YmM1In0%3D; _pk_ref.1.01b8=%5B%22%22%2C%22%22%2C1712497371%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D; _pk_ses.1.01b8=1; XSRF-TOKEN=eyJpdiI6ImRjcjhlZ1NiaVI4dXdJOGxwdU1CXC9BPT0iLCJ2YWx1ZSI6IjE0emloTllCUm9rQzY5ZEFiQXhqQzkyWmZIUlwveTk5b3VtTU1nUUdxcWNpRjJ3NVlSSWhmeUo2WHNLeTlrK3NZIiwibWFjIjoiYTA3MGJhYWFmODk2OGUzNjZmYzIyMjY0ZTQwNzdmZTBmMDA3OGY5YzRlODg2ODJjYjJiNTU5OGI1NTQwZDEyOCJ9; wallhaven_session=eyJpdiI6Ikh1bGhqZXZwb1VoaEZpblo3UEVsYmc9PSIsInZhbHVlIjoieEc0bWNqaW5lQ05lXC9yKzBGVkdYdEtxb0pNemp0R3ZrXC9tVzBhTkY4bnF6a0NzVlZLSWxGQ3BYUGQ0bHFKMXh1IiwibWFjIjoiZDQzYzZjYmEwYjMzNjE3N2NkZDRmMmQ4YTVjYWQ0NDM2YzA1ZTBlZTNlNTFjZWE0MGZjNDM5ZjIzNGM3MDc1NSJ9` 
});
