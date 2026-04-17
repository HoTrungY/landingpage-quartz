const fs = require("fs");
const path = require("path");

// 👉 THAY đường dẫn này thành folder bạn clone
const ROOT_DIR = ".";

// lưu kết quả
let results = [];

// regex lấy <a ... href="..."> + tên sản phẩm
const linkRegex = /<a[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gis;

// lấy text trong <h3>
const titleRegex = /<h3[^>]*>(.*?)<\/h3>/is;

// clean HTML tag
function cleanText(text) {
  return text.replace(/<[^>]+>/g, "").trim();
}

// convert link ../ → /san-pham/...
function normalizeLink(link) {
  if (link.includes("/san-pham/")) {
    const idx = link.indexOf("/san-pham/");
    return link.substring(idx);
  }
  return null;
}

// đọc file HTML
function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");

  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const href = match[1];
    const innerHTML = match[2];

    const titleMatch = innerHTML.match(titleRegex);
    if (!titleMatch) continue;

    const name = cleanText(titleMatch[1]);
    const link = normalizeLink(href);

    if (name && link) {
      results.push({
        name,
        link,
      });
    }
  }
}

// duyệt folder
function walkDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith(".html")) {
      processFile(fullPath);
    }
  }
}

// chạy
walkDir(ROOT_DIR);

// remove duplicate
const unique = Array.from(
  new Map(results.map((item) => [item.link, item])).values(),
);

// xuất CSV
let csv = "name,link\n";
unique.forEach((p) => {
  csv += `"${p.name}","${p.link}"\n`;
});

fs.writeFileSync("products.csv", csv, "utf-8");

console.log("✅ Done! Đã tạo products.csv với", unique.length, "sản phẩm");
