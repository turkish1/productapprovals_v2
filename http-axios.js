import axios from "axios";

export default axios.create({
  baseURL: `https://us-east-1.aws.data.mongodb-api.com/app/data-aquwo/endpoint`,
  // withCredentials: false,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    "apiKey": "LduI7j9z7Iwppo1AbxE9TBz2z2lJFZZFF3MU5ZFCbfxHU8wMlyCjvz0pWMByVH5n",
    // 'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
   
  }
});

