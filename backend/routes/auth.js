let express=require('express');
let router = express.Router();
let Controllers=require('../controllers/auth');


router.post('/signup',Controllers.signup);
router.post('/signin',Controllers.signin);



module.exports=router;