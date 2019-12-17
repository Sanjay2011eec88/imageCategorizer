var imageTaggingService = require('../service/imageTaggingService');
var utils = require('../utils/authUtils');
/* GET home page. */
module.exports.setRoutes = function(app) {
    app.get('/imageTags', async function (req,res) {
        let tagObjs = await imageTaggingService.getDistinctTags(req.user);
        return res.status(201).send(tagObjs);
    });

    app.post('/imageList', utils.loginRequired, async function (req, res) {
        try {
            let imageObj = await imageTaggingService.getListOfTaggedImages(req.user, req.body);
            return res.status(200).send(imageObj)
        }catch{
            return res.status(400).send({err: "Error in getting the data"});
        }

    })
};