const jwt = require('jsonwebtoken');

module.exports.authManager = (req, res, next) => {
    let token = req.header("Authorization");
    console.log(token);
    if(!token){
        return res.status(401).json({msg:"Token is Required..."});
    }
    try{
        const newToken = token.slice(7,token.length);
        let decoded = jwt.verify(newToken,'Manager');
        req.user = decoded;
        next();
    }catch(err){
        return res.status(500).json({msg:"Invalid Token..."});
    }
}
