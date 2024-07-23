import { v2 as cloudinary } from 'cloudinary';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: 'cloudinary.env' });
export const CloudinaryConfig = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: process.env.CLOUDNIARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_URL,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
