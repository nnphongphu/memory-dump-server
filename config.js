import dotenv from 'dotenv'

dotenv.config()

export const bucketName = process.env.AWS_BUCKET_NAME
export const region = process.env.AWS_BUCKET_REGION
export const accessKeyId = process.env.AWS_ACCESS_KEY
export const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;