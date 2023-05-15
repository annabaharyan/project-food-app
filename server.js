import express from "express";
import fs from "fs";
import path from "path";
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/data", (req, res) => {
  fs.promises
    .readFile(path.resolve("data.json"), "utf8")
    .then((data) => res.send(data));
});
app.get("/categories", (req, res) => {
  fs.promises
    .readFile(path.resolve("data.json"), "utf8")
    .then((data) => res.send(JSON.parse(data).categories));
});
app.get("/products/category", (req, res) => {
  const categoryId = +req.query.categoryId;
  fs.promises
    .readFile(path.resolve("data.json"), "utf8")
    .then((data) =>
      JSON.parse(data).products.filter((elem) => elem.categoryId === categoryId)
    )
    .then((result) => res.send(result));
});
app.get("/products/subcategory", (req, res) => {
  const filters = req.query.subCategory;

  fs.promises
    .readFile(path.resolve("data.json"), "utf8")
    .then((data) =>
      JSON.parse(data).products.filter((elem) => elem.subCategory === filters)
    )
    .then((result) => res.send(result));
});
app.get("/products/search/:searchedText", (req, res) => {
  const searchText = req.params.searchedText;

  fs.promises
    .readFile(path.resolve("data.json"), "utf8")
    .then((data) =>
      JSON.parse(data).products.filter(
        (elem) =>
          elem.name.toLowerCase().includes(searchText.toLowerCase()) ||
          elem.desc.toLowerCase().includes(searchText.toLowerCase())
      )
    )
    .then((result) => res.send(result));
});
app.get("/orders", (req, res) =>
  fs.promises
    .readFile(path.resolve("data.json"), "utf8")
    .then((data) => JSON.parse(data).orders)
    .then((orders) => res.send(JSON.stringify(orders)))
);
app.post("/orders", (req, res) => {
  const newOrder = req.body;
  fs.promises
    .readFile(path.resolve("data.json"), "utf8")
    .then((data) => JSON.parse(data))
    .then((data) => {
      if (data.orders) {
        const index = data.orders.findIndex(
          (elem) => elem.itemId === newOrder.itemId
        );
        if (index === -1) {
          data.orders.push(newOrder);
        } else {
          data.orders[index].count += newOrder.count;
        }
        fs.promises
          .writeFile(
            path.resolve("data.json"),
            JSON.stringify(data, undefined, 2)
          )
          .then((data) => res.send({ data, success: "done" }));
      }
    });
});

app.delete("/orders/:id", (req, res) => {
  const { id } = req.params;
  fs.promises
    .readFile(path.resolve("data.json"), "utf8")
    .then((data) => JSON.parse(data))
    .then((data) => {
      const deleteItemIndex = data.orders.findIndex(
        (order) => order.itemId === id
      );
      data.orders.splice(deleteItemIndex, 1);
      fs.promises
        .writeFile(
          path.resolve("data.json"),
          JSON.stringify(data, undefined, 2)
        )
        .then((data) => res.send({ data, success: "done" }));
    });
});
app.put("/orders/dec/:id", (req, res) => {
  const { id } = req.params;

  fs.promises
    .readFile(path.resolve("data.json"), "utf8")
    .then((data) => JSON.parse(data))
    .then((data) => {
      const decrementItemIndex = data.orders.findIndex(
        (order) => order.itemId === +id
      );

      if (data.orders[decrementItemIndex].count > 1) {
        data.orders[decrementItemIndex].count--;
      } else {
        data.orders.splice(decrementItemIndex, 1);
      }
      fs.promises
        .writeFile(
          path.resolve("data.json"),
          JSON.stringify(data, undefined, 2)
        )
        .then((data) => res.send({ data, success: "done" }));
    });
});
app.put("/orders/inc/:id", (req, res) => {
  const { id } = req.params;

  fs.promises
    .readFile(path.resolve("data.json"), "utf8")
    .then((data) => JSON.parse(data))
    .then((data) => {
      const decrementItemIndex = data.orders.findIndex(
        (order) => order.itemId === +id
      );
      data.orders[decrementItemIndex].count++;

      fs.promises
        .writeFile(
          path.resolve("data.json"),
          JSON.stringify(data, undefined, 2)
        )
        .then((data) => res.send({ data, success: "done" }));
    });
});
app.listen(process.env.PORT || 8080);
