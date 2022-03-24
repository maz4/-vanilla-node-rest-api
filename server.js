const http = require("http");
const products = require("./data/products.json");

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === 'GET') {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(JSON.stringify(products));
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
