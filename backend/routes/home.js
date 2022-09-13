const express=require('express');
const User=require('../models/user');
const Expense =require('../models/expense');
const Sequelize=require('sequelize');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const aut=require('../authentication');
const router=express.Router();
let bodyParser = require("body-parser");
//const Razorpay = require("razorpay");
//const Order = require("../models/order");
const {Op}=require('sequelize');

let c=0;
router.use(bodyParser.json());

router.post('/addexpense',aut.authenticate  ,(req,res)=>{
    const {amount,category,description}=req.body.obj;
    console.log(amount,category,description);

    let userId=req.user.id;

    Expense.create({ amount, category, description,userId }).then(result=>{
        res.json(result);
    })
    .catch(err=>{
        res.json(err)
    })
});

router.get('/getuserdata',aut.authenticate,(req,res)=>{
console.log(c++);
    let userid=req.user.id;

    User.findAll({where:{id:userid}})
    .then(result=>{
        res.json({result,suc:'yes'});
    })
    .catch(err=>{
        res.status(404).json(err);
    })

});


router.get("/getexpenses", aut.authenticate, (req, res) => {
  console.log(c++);
  let userid = req.user.id;
   console.log(req.user.id)
  Expense.findAll({ where: { userId: userid } })
    .then((result) => {
      res.json({ result, suc: "yes" });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});




router.delete('/delete/expense/:id',aut.authenticate,(req,res)=>{
  const id=req.params.id;
  Expense.destroy({where:{id:id}})
  .then(result=>{
res.json(result)  })
  .catch(err=>{
res.json(err)  })
});

module.exports=router;


