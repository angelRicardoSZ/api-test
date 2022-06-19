const express = require("express");
const cors = require("cors")
const routerApi = require("./routes")
const { logErrors,errorHandler } = require("./middlewares/errorHandle")
const app = express();
const port = process.env.PORT || 3000;
// const port =  3000;

app.use(express.json());

// const whitelist = ["http://127.0.0.1:5500/index.html"]
// const options = {
//   origin: (origin, callback) => {
//     if(whitelist.includes(origin)){
//       callback(null, true)
//     } else {
//       callback(new Error("no permitido"))
//     }
//   }
// }

// app.use(cors(options))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);
// app.get("/", (req,res)=>{
//   res.send("Working")
// })

app.use(logErrors);
app.use(errorHandler)




app.listen(port, ()=>{
  console.log("Puerto " + port)
})
