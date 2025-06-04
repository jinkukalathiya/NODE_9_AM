module.exports.homepage = (req,res) => {
    return res.render('home');
}

module.exports.aboutpage = (req,res) => {
    return res.render('about');
}

module.exports.servicepage = (req,res) => {
    return res.render('service');
}

module.exports.blogpage = (req,res) => {
    return res.render('blog');
}

module.exports.contactpage = (req,res) => {
    return res.render('contact');
}

module.exports.errorpage = (req,res) => {
    return res.render('404');
}