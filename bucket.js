import { S3Client } from "@aws-sdk/client-s3";
import { region, accessKeyId, secretAccessKey } from "./config";

export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

