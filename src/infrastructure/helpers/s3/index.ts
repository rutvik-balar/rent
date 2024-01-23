import AWS from 'aws-sdk'

import { CONSTANTS } from '../../configs/constants/constants'
import { env } from '../../env'
import { randomNameGenerator } from '../utils/random-name'

AWS.config.update({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.S3_REGION,
})

const s3 = new AWS.S3()
const bucketName = env.S3_BUCKET

export const uploadImage = async (file: Express.Multer.File) => {
  const { originalname } = file
  const fileName = `${
    CONSTANTS.DEFAULT_VALUES.CATEGORY_IMAGE_FOLDER
  }/${randomNameGenerator(32)}.${originalname.split('.')[1]}`
  // Upload the image to the specified folder
  const { buffer, mimetype } = file
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    ContentType: mimetype,
  }
  const s3Res = await s3.upload(params).promise()
  return { fileName, s3Res }
}
export const removeImage = async (fileName: string) => {
  return await s3.deleteObject({ Bucket: bucketName, Key: fileName }).promise()
}
