import { Request } from "express";
import fileUpload from "express-fileupload";

export interface FileTypeRequest extends Request {
  fileType?: string; 
  fileExtension?: string;
}

export interface FileUploadRequest extends FileTypeRequest {
  files?: fileUpload.FileArray | null;
}

