// const express = require("express");
// const app = express();

// app.use(express.json());
// // Dữ liệu mẫu (được lưu trữ trong bộ nhớ, không phải là cách lưu trữ thực tế trong ứng dụng thực tế)
// let users = [
//   { id: 1, name: "John" },
//   { id: 2, name: "Jane" },
//   { id: 3, name: "Doe" },
// ];

// // GET route để lấy tất cả người dùng
// app.get("/api/users", (req, res) => {
//   res.json(users);
// });

// // POST route để thêm một người dùng mới
// app.post("/api/users", (req, res) => {
//   const newUser = req.body;
//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// // PUT route để cập nhật thông tin một người dùng
// app.put("/api/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const updatedUser = req.body;
//   users = users.map((user) => {
//     if (user.id === userId) {
//       return { ...user, ...updatedUser };
//     }
//     return user;
//   });
//   res.json(updatedUser);
// });

// // DELETE route để xóa một người dùng
// app.delete("/api/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   users = users.filter((user) => user.id !== userId);
//   res.sendStatus(204);
// });

// // Khởi động server
// app.listen(3000, () => {
//   console.log("Server đang lắng nghe ở cổng 3000...");
// });

// module.exports = app; // Dùng cho các bài kiểm thử
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Sử dụng bodyParser để parse JSON body
app.use(bodyParser.json());

// Middleware để ghi log thông tin request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Dữ liệu mẫu (được lưu trữ trong bộ nhớ)
let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Doe" },
];

// Route để hiển thị tất cả người dùng
app.get("/users", (req, res) => {
  res.json(users);
});

// Route để thêm một người dùng mới
app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
});

// Route để cập nhật thông tin một người dùng
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;
  users = users.map((user) => {
    if (user.id === userId) {
      return { ...user, ...updatedUser };
    }
    return user;
  });
  res.json(updatedUser);
});

// Route để xóa một người dùng
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter((user) => user.id !== userId);
  res.sendStatus(204);
});

// Middleware để xử lý lỗi 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Middleware để xử lý các lỗi khác
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang lắng nghe ở cổng ${PORT}...`);
});
