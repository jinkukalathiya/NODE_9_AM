// const CategoryCtl = require('../controllers/categoryController');

const Category = require('../models/Category');

module.exports.userpage = async (req, res) => {
    try{
        let categoryRecord = await Category.find({});
        if(categoryRecord){
            return res.render('blog', {
                categoryRecord
            });
        }else{
            return res.render('blog');
        } 
    }catch(err){
        console.log(err);        
        return res.redirect('/'); 
    }
};