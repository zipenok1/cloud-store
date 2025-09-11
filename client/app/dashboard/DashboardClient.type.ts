export interface IFilesClientRes{
    id: number,
    originalName: string,
    extension?: string,
    size?: number,
    type?: 'image' | 'document' | 'other',
    url?: string
  }

export interface IDashboardClient{
    filesData: IFilesClientRes[]
}