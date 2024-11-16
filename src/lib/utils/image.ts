import path from "path";
import * as fsSync from "fs";
import * as fsPromises from "fs/promises";

export const uploadImage = async ({
  file,
  uploadDir,
}: {
  file: File;
  uploadDir: string;
}) => {
  const image = file;

  if (!fsSync.existsSync(uploadDir)) {
    fsPromises.mkdir(uploadDir);
  } else [fsPromises.readdir(uploadDir)];

  const buffer = Buffer.from(await image.arrayBuffer());

  const extension = image.name.split(".").pop();

  const nameFile = `${Date.now()}.${extension}`;

  fsPromises.writeFile(path.resolve(uploadDir, nameFile), buffer);

  return nameFile;
};

export const deleteImage = async (pathImage: string) => {
  try {
    await fsPromises.unlink(pathImage);
  } catch (error) {
    console.log(error);
  }
};
