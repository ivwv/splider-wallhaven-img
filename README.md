> 爬取 wallhaven 壁纸网站图片链接，配合 aria2c 达到满速下载图片

### 使用

```sh
git clone https://github.com/ivwv/splider-wallhaven-img.git
npm i
```

修改`app.js` 配置

```js
const utils = new Utils({
  // 开始页
  from: 1,
  // 结束页
  to: 20,
  // 图片保存的路径
  parentDir: "imgs",
  // 类型: hot,latest,toplist 三选一, 具体页数根据实际情况修改 `to`
  type: "hot",
  // aria2c 文本格式是否需要追加以页数为路径
  isPageDir: false,
  // 填写你的cookie,具体图片会根据你的喜好推荐，不填会导致内容写不进去
  cookie:
    "YOUR_COOKIE",
});
```

### 启动

```sh
node app.js
```

