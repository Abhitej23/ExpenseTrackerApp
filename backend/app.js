let express=require('express');

let bodyParser=require('body-parser');
let jwt =require('jsonwebtoken')
let bcrypt=require('bcrypt');
let cors=require('cors');
const sequelize = require("./models/database");
const User=require('./models/user');
const Expense=require('./models/expense');

let app = express();

app.use(bodyParser.json());
app.use(cors());

let auth=require('./routes/auth');
let expenses=require('./routes/expense');
User.hasMany(Expense);
Expense.belongsTo(User);

app.use(auth);
app.use(expenses);



sequelize
  .sync()
  .then((result) => {
    
    app.listen(8400, () => {
      console.log(" listening to 8400 port ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
 
 




