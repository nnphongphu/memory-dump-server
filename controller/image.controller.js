import { uploadImage, deleteImage } from "../use-case/image"
import { addImageToFavourite, getImages } from "../use-case/image.use-case";

export const uploadImageController = async (req, res) => {
    const { file, userId } = req;
    const { caption } = req.body;
    try {
        await uploadImage(file, caption, userId);
        res.status(200).send("Image uploaded successfully!");
    } catch (error) {
        res.status(500).send(error);
    }
}

export const deleteImageController = async (req, res) => {
    try {
        await deleteImage(req.params.id, req.userId);
        res.status(200).send("Image uploaded successfully!");
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getImagesController = async (req, res) => {
    try {
        const result = await getImages(req.userId);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const addImageToFavouriteController = async (req, res) => {
    try {
        await addImageToFavourite(req.params.id, req.userId);
        res.send(200).send("Add favourite image successfully!");
    } catch (error) {
        res.status(500).send(error);
    }
}