export interface IFilesRes{
  id?: number,
  originalName: string,
  extension: string,
  size: number,
  type: 'images' | 'document' | 'other',
  url?: string
}

export interface IFileUpload{
  file: IFilesRes
}