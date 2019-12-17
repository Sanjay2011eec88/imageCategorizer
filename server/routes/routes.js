var user = require('./routes_user');
var images = require('./routes_images');

module.exports.setRoutes = function(app) {
    user.setRoutes(app);
    images.setRoutes(app);
};