import ImageBucket from "../data-access/image.bucket";
import sharp from "sharp";
import UserDb from "../data-access/user.db";
import { ReplicationRuleStatus, RestoreRequestFilterSensitiveLog } from "@aws-sdk/client-s3";

// export async function  (req, res) => {
//     const posts = await prisma.posts.findMany({orderBy: [{ created: 'desc'}]})
//     for (let post of posts) {
//       post.imageUrl = await getObjectSignedUrl(post.imageName)
//     }
//     res.send(posts)
// })

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const uploadImage = async (file, caption, userId) => {
    const imageId = generateFileName();

    const fileBuffer = await sharp(file.buffer)
        .resize({ height: 1920, width: 1080, fit: "cover" })
        .toBuffer();

    await ImageBucket.uploadImage(fileBuffer, imageId, file.mimetype);
    await UserDb.update({ _id: userId }, { $push: { images: { imageId, caption, isFavourite: false } } });
}

export const deleteImage =  async (id, userId) => {
    await ImageBucket.deleteImage(id);
    await UserDb.update({ _id: userId }, { $pull: { "images.image": id } });
}

export const getImages = async (userId) => {
    const user = await UserDb.findOne({ _id: userId });
    const result = []
    for (let image of user.images) {
        const url = await getObjectSignedUrl(image.imageId)
        result.push({ url, caption: image.caption });
    }
    return result;
}

export const addImageToFavourite = async (imageId, userId) => {
    await UserDb.update({ _id: userId, images: { imageId } }, { $set: { "images.$.isFavourite": true } });
}