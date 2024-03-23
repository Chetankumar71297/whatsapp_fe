import axios from "axios";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;

export const uploadFilesOnCloudinary = async (files) => {
  let formData = new FormData();
  formData.append("upload_preset", cloud_secret);
  let uploadedFilesInfo = [];
  for (const item of files) {
    const { file, type } = item;
    formData.append("file", file);
    let res = await uploadToCloudinary(formData);
    uploadedFilesInfo.push({
      file: res,
      type,
    });
  }
  return uploadedFilesInfo;
};

const uploadToCloudinary = async (formData, type) => {
  return new Promise(async (resolve) => {
    return await axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/raw/upload`,
        formData
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
