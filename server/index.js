require("dotenv").config({
    path: ".env",
    override: true,
    debug: true,
});

const app = require("./src/app");

const PORT = process.env.PORT || 3000;




app.listen(port, ()=> {
  console.log(`Server is running on port ${PORT}`);
})