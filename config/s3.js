const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `products/${Date.now()}_${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read",
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error("Failed to upload file");
  }
};

const deleteFile = async (fileUrl) => {
  try {
    const bucketName = process.env.AWS_BUCKET_NAME;

    const fileKey = fileUrl.split(`${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/`)[1];

    if (!fileKey) {
      throw new Error("Invalid file URL");
    }

    const params = {
      Bucket: bucketName,
      Key: fileKey,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    return { success: true, message: "File deleted successfully" };
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw new Error("Failed to delete file");
  }
};

module.exports = { uploadFile, deleteFile };