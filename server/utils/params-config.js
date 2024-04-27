const { v4: uuidv4 } = require('uuid');

const params = (fileName) => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];
    const imageParams = {
      // Replace the <My_Bucket_Name> with the name of your own S3 bucket
      Bucket: 'user-images-4bf05929-26b1-4756-bc68-f5762db6b020',
      Key: `${uuidv4()}.${fileType}`,
      Body: fileName.buffer,
    };
    return imageParams;
  };


  module.exports = params;