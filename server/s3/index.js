const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY
});

module.exports = s3;
