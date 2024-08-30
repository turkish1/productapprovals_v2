const AWS = require('aws-sdk');

//  import aws from 'aws-sdk';

const region = 'us-east-1';
const bucketName = 'digitalsolutionsroofs';
const accessKeyId = '';
// process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = '';
// process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey
});

(async () => {
    await s3
        .putObject({
            Body: 'new info',
            Bucket: bucketName,
            Key: 'filename',
            Expires: 60
        })
        .promise();
})();

// const s3 = new aws.S3({
//     region,
//     accessKeyId,
//     secretAccessKey,
//     signatureVersion: '4'
// });

// export async function generateUploadURL() {
//     // const = processNumber = 'me2004000011'
//     const fileName = 'fileName-me2004000011';

//     const params = {
//         Body: "new info"
//         Bucket: bucketName,
//         Key: filename,
//         Expires: 60
//     };

//     const uploadURL = await s2.getSignedUrlPromise('putObject', params);
//     return uploadURL;
// }
