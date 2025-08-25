const exp = require("express");

const app = exp();

const PORT = 7777;

const person_data = {
  name: "Manoj",
  age: 26,
  city: "Mysore"
};

app.get("/user/:id", (req, res) => {
  const {id} = req.params
  console.log("user id : ",id)
  res.send(person_data);
});

app.get("/search", (req, res) => {
  const {a,type} = req.query
  console.log("a value :",a)
  console.log("type value :",type)
  res.send(a);
})

app.post("/user", (req, res) => {
  res.send("POST request to the /user endpoint received.");
});

app.put("/user", (req, res) => {
  res.send("PUT request to the /user endpoint received.");
});

app.delete("/user", (req, res) => {
  res.send("DELETE request to the /user endpoint received.");
});

app.patch("/test", (req, res) => {
  res.send("PATCH request to the /user endpoint received.");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
