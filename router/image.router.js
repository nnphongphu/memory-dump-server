import { setImageToFavouriteController, deleteImageController, getImagesController, uploadImageController } from '../controller/image.controller.js';
import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.patch("/:id", auth, setImageToFavouriteController);
router.delete("/:id", auth, deleteImageController);
router.get("/", auth, getImagesController);
router.post("/", auth, upload.single('image'), uploadImageController);

export default router;