import { addImageToFavouriteController, deleteImageController, getImagesController, uploadImageController } from '../controller/image.controller';
import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/:id", auth, addImageToFavouriteController);
router.delete("/:id", auth, deleteImageController);
router.get("/", auth, getImagesController);
router.post("/", auth, upload.single('image'), uploadImageController);

export default router;