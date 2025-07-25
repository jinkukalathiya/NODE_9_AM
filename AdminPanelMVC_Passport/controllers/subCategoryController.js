const Category = require('../models/Category');

const SubCategory = require('../models/Subcategory');

module.exports.addSubCategory = async (req, res) => {
    try{
        let allCategory = await Category.find({});
        return res.render('add_subcategory',{
            allCategory : allCategory
        });
    }catch(err){
        console.log(err);
        return res.render('login');
    }
};

module.exports.insertSubCategory = async (req, res) => {
    try{
    
        let SubCategoryData = await SubCategory.create(req.body);

        if(SubCategoryData){
            console.log("Subcategory Inserted");
            req.flash('success',"Subcategory Inserted Successfully....");
            return res.redirect('/subcategory/add_subcategory');
        }
        else{
            console.log("Error in Inserting Subcategory..");
            req.flash('error',"Error in Inserting Subcategory....");
            return res.redirect('/subcategory/add_subcategory');
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
        
    }
}

module.exports.viewSubCategory = async (req, res) => {
    try{
        // let subCategoryRecord = await SubCategory.find({});
        let subCategoryRecord = await SubCategory.find({}).populate("categoryId").exec();
        // console.log(subCategoryRecord);
        if(subCategoryRecord){
            return res.render('view_subcategory', {
                subCategoryRecord
            });
        }else{
            return res.render('view_subcategory');
        } 
    }catch(err){
        console.log(err);        
    }    
};