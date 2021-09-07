var User = require('../../models/users');
const bcrypt = require('bcrypt');
module.exports = {
    SignUpValidate: async (req, res, next) => {
        const db_user = await User.findOne({ username: req.body.username });
        const db_email = await User.findOne({ email: req.body.email });
        if (db_user && db_email) {
            res.json({ status: 'Username and Email already exist!' })
        } else if (db_user) {
            res.json({ status: 'Username already exist!' })
        } else if (db_email) {
            res.json({ status: 'Email already exist!' })
        } else {
            next();
        }
    },
    CheckLogin: (req, res, next) => {
        User.findOne({ username: req.body.username },(err,result)=>{
            if(result){
                bcrypt.compare(req.body.password, result.p_validate , (err, result2)=>{
                    if(!result2){
                        res.json({ status: 'Please check your details and try again' })
                    }else{
                        next();
                    }
                });
            }else{
                res.json({ status: 'Please check your details and try again' })
            }
        });
        
    }
}