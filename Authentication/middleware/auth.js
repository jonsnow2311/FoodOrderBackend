module.exports = function(req,res,next) {
    const token = req.header('x-auth-token');

    if(token.status != 'loggedInSuccessfully') return res.send('Access Denied. Token Invalid');

    req.user = token.id;
    next();

    
}