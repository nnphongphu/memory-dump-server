import ImageBucket from "../data-access/image.bucket.js";
import sharp from "sharp";
import crypto from "crypto";
import UserDb from "../data-access/user.db.js";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export const uploadImage = async (file, caption, userId) => {
  const imageId = generateFileName();

  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 200, width: 200, fit: "cover" })
    .toBuffer();

  await ImageBucket.uploadImage(fileBuffer, imageId, file.mimetype);
  await UserDb.update(
    { _id: userId },
    { $push: { images: { imageId, caption, isFavourite: false } } }
  );
};

export const deleteImage = async (id, userId) => {
  await ImageBucket.deleteImage(id);
  await UserDb.update({ _id: userId }, { $pull: { images: { imageId: id } } });
};

export const getImages = async (userId) => {
  const user = await UserDb.findOne({ _id: userId });
  const result = [];
  for (let image of user.images) {
    const url = await ImageBucket.getImageSignedUrl(image.imageId);
    result.push({
      url,
      caption: image.caption,
      isFavourite: image.isFavourite,
      imageId: image.imageId,
    });
  }
  return result;
};

export const setImageToFavourite = async (imageId, userId, value) => {
  await UserDb.update(
    { _id: userId, "images.imageId": imageId },
    { $set: { "images.$.isFavourite": value } }
  );
};
