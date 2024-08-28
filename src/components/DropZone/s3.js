import dotenv from 'dotenv';

import aws from 'aws-sdk';

dotenv.config();

const region = 'us-east-1';
const bucketName = 'digitalsolutionsroofs';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: '4'
});

export async function generateUploadURL() {
    // const = processNumber = 'me2004000011'
    const fileName = 'fileName-me2004000011';

    const params = {
        Bucket: bucketName,
        Key: filename,
        Expires: 60
    };

    const uploadURL = await s2.getSignedUrlPromise('putObject', params);
    return uploadURL;
}
