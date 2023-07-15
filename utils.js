const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const path = require("path");

class Utils {
  constructor(options) {
    //  起始页
    this.from = options.from;
    this.page = options.from;
    // 保存的父目录
    this.parentDir = options.parentDir;
    // 目标页 根据具体情况设置
    this.to = options.to;
    // 爬取的类型 有： latest, toplist, hot
    this.type = options.type;
    // 是否需要添加页数在文件路径中
    this.isPageDir = options.isPageDir;
    // 请求的 cookie 建议填写，不填写可能会请求不到数据，填写了可以提高请求成功率，并且是自己网页上看到的内容
    this.cookie = options.cookie;
    this.init();
  }
  // 初始化方法
  async init() {
    const res = await this.getPageHTML(this.page);
    // 将页面的html传入解析方法 使用cheerio解析
    const info = await this.parseHTML(res);
    this.writeImgInfo(info);
  }

  /**
   * 动态返回请求的 headers
   * @param {*} page
   * @returns
   */
  headers(page) {
    return {
      accept: "text/html, */*; q=0.01",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-ch-ua": '"Google Chrome";v="107", "Chromium";v="108", "Not=A?Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      cookie: `${this.cookie}`,
      Referer: page
        ? `https://wallhaven.cc/${this.type}?page=${page - 1}`
        : `https://wallhaven.cc/${this.type}`,
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "user-agent": this.userAgent
        ? this.userAgent
        : `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36`,
    };
  }

  /**
   * 获取第 page 页的 html
   * @param {*} page
   * @returns
   */
  getPageHTML = async (page) => {
    return new Promise(async (resolve) => {
      try {
        // await this.sleep(10);
        // 获取页面的html元素
        const { data: res } = await axios(`https://wallhaven.cc/${this.type}?page=${page}`, {
          headers: this.headers(page),
        });
        // 将返回的html返回
        resolve(res);
      } catch (error) {
        // 在HTTP 协议中，响应状态码429 Too Many Requests 表示在一定的时间内用户发送了太多的请求，即超出了“频次限制”
        // 做出相应的处理 即等待5秒或自己设定的时间
        console.log(error.message);
        console.log("出错了，正在重试");
        await this.sleep(2000);
        // 递归调用getPageHTML方法
        const res = await this.getPageHTML(page);
        resolve(res);
      }
    });
  };

  /**
   * 解析 html 获取图片地址和相关信息 ，将第几页、第几张图片、图片地址、图片尺寸对象信息存入数组
   * @param {*} html
   */
  async parseHTML(html) {
    return new Promise((resolve, reject) => {
      const $ = cheerio.load(html);
      // 图片信息数组
      const imgInfoList = [];
      // 找到所有的相应元素
      const figure = $("section.thumb-listing-page >ul >li >figure");
      const thumb_info = $("section.thumb-listing-page >ul >li >figure>.thumb-info");
      // 处理每个元素 获取图片地址和相关信息保存起来，用于后面文件命令
      figure.each((index, item) => {
        // 判断每一个 thumb_info 子元素 是否有 .png
        // 如果有则说明是 png 格式的图片
        if ($(thumb_info[index]).find(".png").html() != null) {
          // 通过判断 表示该图片是png图片
          // 获取图片地址
          const imgSrc = $(item).find("img").attr("data-src");
          // 获取图片尺寸
          const imgSize = $(item).find(".wall-res").text();
          // 获取图片ID
          const imgId = imgSrc.split("/").slice(-1)[0].split(".")[0];
          const imgInfo = {
            page: this.page,
            index: index + 1,
            isPng: true,
            imgId,
            imgSize,
            url: this.handleImgUrl(imgSrc, true),
          };
          //   console.log(imgInfo);
          imgInfoList.push(imgInfo);
        } else if ($(thumb_info[index]).find(".png").html() === null) {
          // 表示图片是 jpg 格式的图片
          this.handleImgUrl($(item).find("img").attr("data-src"), false);
          //   获取图片地址;
          const imgSrc = this.handleImgUrl($(item).find("img").attr("data-src"));
          // 获取图片ID
          const imgId = imgSrc.split("/").slice(-1)[0].split(".")[0];
          // 获取图片尺寸
          const imgSize = $(item).find(".wall-res").text();
          const imgInfo = {
            page: this.page,
            index: index + 1,
            isPng: false,
            imgSize,
            imgId,
            url: imgSrc,
          };
          imgInfoList.push(imgInfo);
        }
      });
      // 将图片信息数组返回
      resolve(imgInfoList);
    });
  }

  /**
   * 处理图片预览链接 	https://th.wallhaven.cc/small/e7/e7d3vw.jpg 转化为原图链接  https://w.wallhaven.cc/full/e7/wallhaven-e7d3vw.jpg
   * @param {*} url   图片预览链接
   * @param {boolean} isPng   是否是png格式的图片
   */
  handleImgUrl(url, isPng) {
    // 简单处理预览地址
    let url1 = url.replace("th", "w").replace("small", "full");
    // 在后面的图片 id.jpg 前面加上 wallhaven-
    let url2before = url1.split("/").slice(0, 5).join("/");
    let url2after = "/wallhaven-" + url1.split("/").slice(5);
    // console.log(url2before + url2after);
    let finallyUrl = url2before + url2after;
    // 如果是png格式的图片 则需要将jpg替换为png
    if (isPng) {
      finallyUrl = finallyUrl.replace("jpg", "png");
    }
    // 返回处理好的图片地址字符串
    return finallyUrl;
  }
  /**
   * 将图片信息写入txt文件 按照 aria2c 下载格式
   * 保存的格式如下
   * https://w.wallhaven.cc/full/5g/wallhaven-5gdjg5.jpg
   *        out=p1-1-[1920 x 2696]-wallhaven-5gdjg5.jpg
   *        dir=imgs
   *        user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36
   * @param {*} imgInfoList
   */
  async writeImgInfo(imgInfoList) {
    return new Promise((resolve, reject) => {
      let text = ``;
      imgInfoList.forEach((item) => {
        text += `${item.url} 
            out=p${item.page}-${item.index}-[${item.imgSize}]-${item.imgId}.${
          item.isPng ? "png" : "jpg"
        }
            dir=${this.isPageDir ? `${this.parentDir}/${item.page}` : this.parentDir}
            user-agent=${
              this.userAgent
                ? this.userAgent
                : `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36`
            }\r\n`;
      });
      // 调用fs模块写入文件
      fs.writeFileSync(`./${this.type}-${this.from}-${this.to}.txt`, text, {
        flag: "a",
      });
      console.log(`第${this.page}页图片信息写入成功`);
      //   判断是否是最后一页
      if (this.page === this.to) {
        console.log("写入完成");
        resolve();
      } else {
        this.page++;
        this.init();
      }
    });
  }
  /**
   * 自定义异步延迟函数
   * sleep
   * @param {*} time
   */
  async sleep(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }
}
// 导出

module.exports = Utils;
