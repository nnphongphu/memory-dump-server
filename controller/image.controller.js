import {
  setImageToFavourite,
  getImages,
  uploadImage,
  deleteImage,
} from "../use-case/image.use-case.js";

export const uploadImageController = async (req, res) => {
  const { file, userId } = req;
  const { caption } = req.body;
  try {
    await uploadImage(file, caption, userId);
    res.status(200).send("Image uploaded successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteImageController = async (req, res) => {
  try {
    await deleteImage(req.params.id, req.userId);
    res.status(200).send("Image deleted successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getImagesController = async (req, res) => {
  try {
    const result = await getImages(req.userId);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const setImageToFavouriteController = async (req, res) => {
  try {
    await setImageToFavourite(req.params.id, req.userId, req.body.isFavourite);
    res.status(200).send("Set favourite image successfully!");
  } catch (error) {
    res.status(500).send(error);
  }
};
