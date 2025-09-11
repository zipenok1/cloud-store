export interface IFilesClientRes{
    id?: number,
    originalName: string,
    extension?: string,
    size?: number,
    type?: 'images' | 'document' | 'other',
    url?: string
  }

export interface IDashboardClient{
    filesData: IFilesClientRes[]
}