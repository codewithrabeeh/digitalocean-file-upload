require('dotenv').config()
const AWS = require('aws-sdk');
const fs = require('fs');

// Set your DigitalOcean Spaces keys
const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT); 
const spacesAccessKeyId = process.env.DO_SPACES_KEY; // Space Access Key
const spacesSecretAccessKey = process.env.DO_SPACES_SECRET; // Secret Key of Space Access Key
const bucketName = process.env.DO_SPACES_NAME; // Bucket Name

// Set up AWS configuration
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: spacesAccessKeyId,
  secretAccessKey: spacesSecretAccessKey,
});

// File path of the image you want to upload
const filePath = 'test.jpg'; // Replace with the actual file path

// Read the file data
const fileContent = fs.readFileSync(filePath);

// Set the parameters for the object upload
const params = {
  Bucket: bucketName,
  Key: 'test.jpg', // The name you want to give to the object in the bucket
  Body: fileContent,
  ACL: 'public-read', // Make the uploaded file publicly accessible
};

// Upload the object to the bucket
s3.upload(params, (err, data) => {
  if (err) {
    console.error('Error uploading the file:', err);
  } else {
    console.log('File uploaded successfully. Public URL:', data.Location);
  }
});
