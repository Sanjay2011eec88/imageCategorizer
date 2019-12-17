var async = require('async');
var imageApi = require('../config/image');
var request = require('request');
var imageModel = require('../models/images/image');
var imageCategorizer = module.exports = {};

function getUserImages(){
    return new Promise((resolve, reject) =>{
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        request.get(imageApi.imageSource+`page=${randomNumber}&limit=10`, function(err, res){
            var imageLinks = [];
            if(err){
                reject(err);
            }else{
                const response = JSON.parse(res.body);
                if(response.length > 0){
                    for(let i=0; i<response.length;i++){
                        imageLinks.push(response[i].download_url)
                    }
                }
            }
            resolve(imageLinks);
        })
    })
};


function getTags(imageurl) {
    return new Promise((resolve, reject) => {
        request.get(imageApi.imageCategoryApi+encodeURIComponent(imageurl), function (error, response, body) {
            if(error){
                reject(error);
            }else{
                let parsedBody = JSON.parse(body);
                let category = [];
                if(parsedBody.status.type !== 'error'){
                    let tags = parsedBody.result.tags;
                    if(tags.length > 0){
                        tags.forEach(function(catgoryObj){
                            if(catgoryObj.confidence > 30){
                                category.push(catgoryObj.tag.en);
                            }
                        })
                    }
                }
                resolve(category)
            }
        }).auth(imageApi.apiKey, imageApi.apiSecret, true);
    })

}

imageCategorizer.categorizeImage = async function(user) {
   let imageUrls = await getUserImages();
   let imageObj = [];
    for(let i=0; i<imageUrls.length; i++){
        let tags = await getTags(imageUrls[i]);
        let obj ={
            imageUrl:imageUrls[i],
            owner: user._id,
            tags: tags
        }
        imageObj.push(obj);
    }
    await imageModel.insertArray(imageObj);
};

imageCategorizer.getListOfTaggedImages = async function (owner, body) {
    let query = {
        owner: owner._id,
    };
    if(body.length > 0){
        query.tags = {$in:body};
    }
    let project = {
        owner:0,
        _id:0,
        tags:0
    };
    let listOfImages = await imageModel.findQuery(query, project);
    return listOfImages;
};

imageCategorizer.getDistinctTags = async function (owner) {
    let where = {owner: owner._id};
    let list =await imageModel.getDistinctData("tags", where);
    return {tagList: list};
};