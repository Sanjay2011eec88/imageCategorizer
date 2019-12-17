var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    imageUrl: {
        type:String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags:{
        type: Array
    }
});

ImageSchema.statics.insertArray = function (img){
    return new Promise((resolve, reject) => {
        this.insertMany(img, function (err, res) {
            if(err){
                reject(err)
            }else{
                resolve(res);
            }
        })
    })
}

ImageSchema.statics.findQuery = function (query,project) {
    return new Promise((resolve, reject) => {
        this.find(query,project ,function (err, res) {
            if(err){
                reject(err);
            }else {
                resolve(res);
            }
        })
    })
};

ImageSchema.statics.getDistinctData = function (query, where) {
    return new Promise((resolve, reject) => {
        this.distinct(query,where, function (err, res) {
            if(err){
                reject(err);
            }else{
                resolve(res)
            }
        })
    })
}

module.exports = mongoose.model('images', ImageSchema);