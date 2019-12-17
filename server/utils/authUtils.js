var authHelpers = module.exports = {};

authHelpers.loginRedirect = function (req, res, next) {
    if (req.user) return res.status(401).json(
        {status: 'You are already logged in'});
    return next();
};

authHelpers.loginRequired = function(req, res, next) {
    if (!req.user) return res.status(401).json({status: 'Please log in'});
    return next();
};