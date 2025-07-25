const Category = require('../models/Category');

module.exports.addCategory = async (req, res) => {
    return res.render('add_category');
};

module.exports.insertCategory = async (req, res) => {
    try{
        
        req.body.cimage = '';
        
        if(req.file){
            req.body.cimage = Category.caPath+"/"+req.file.filename;
        }
        
        let categoryRecord = await Category.create(req.body);

        if(categoryRecord){
            console.log("Category Inserted");
            req.flash('success',"Category Inserted Successfully....");
            return res.redirect('/category/add_category');
        }
        else{
            console.log("Error in Inserting Category..");
            req.flash('error',"Error in Inserting Category....");
            return res.redirect('/category/add_category');
        }
    }catch(err){
        console.log(err);
        
    }
}

module.exports.viewCategory = async (req, res) => {
    try{
        let categoryRecord = await Category.find({});
        if(categoryRecord){
            return res.render('view_category', {
                categoryRecord
            });
        }else{
            return res.render('view_category');
        } 
    }catch(err){
        console.log(err);        
    }    
};

module.exports.deleteCategory = async (req, res) => {
    try {
        let categoryId = req.params.caId;
        let categoryData = await Category.findById(categoryId);
        
        if (categoryData) {
            if (categoryData.avtar) {
                let imgPath = path.join(__dirname, "..", categoryData.cimage);
                try {
                    await fs.unlinkSync(imgPath);
                    console.log("Category Image deleted successfully");
                } catch (err) {
                    console.log("Error while deleting Category:", err);
                }
            }
            
            let deleteCategoryData = await Category.findByIdAndDelete(categoryId);
            
            if (deleteCategoryData) {
                console.log("Category Deleted Successfully");
                req.flash('success',"Category Deleted Successfully....");
                return res.redirect('/category/view_category');
            } else {
                console.log("Error While Deleting Category...");
                req.flash('success',"Error While Deleting Category....");
                return res.redirect('/category/view_category');
            }
        } else {
            console.log("Category Not Found");
            return res.redirect('/category/view_category');
        }

    } catch (err) {
        console.log(err);
        return res.redirect('/category/view_category');
    }
}