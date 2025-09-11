export interface IFilesRes{
    id?: number,
    originalName: string,
    extension: string,
    size: number,
    type: 'image' | 'document' | 'other',
    url?: string
  }