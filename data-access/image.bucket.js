
import { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { s3Client } from "../bucket";
import { bucketName } from "../config";

function uploadImage(fileBuffer, fileName, mimetype) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
    }
  
    return s3Client.send(new PutObjectCommand(uploadParams));
}

function deleteImage(fileName) {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    }
  
    return s3Client.send(new DeleteObjectCommand(deleteParams));
}

async function getImageSignedUrl(key) {
    const params = {
        Bucket: bucketName,
        Key: key
    }
  
    const command = new GetObjectCommand(params);
    const seconds = 60
    const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
  
    return url;
}

export const ImageBucket = {
    uploadImage,
    deleteImage,
    getImageSignedUrl
};

export default ImageBucket;