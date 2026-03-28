declare module 'compress.js' {
  interface CompressOptions {
    size?: number
    quality?: number
    maxWidth?: number
    maxHeight?: number
    resize?: boolean
    rotate?: boolean
  }

  interface CompressResult {
    photo: string
    alt: string
  }

  class Compress {
    compress(files: File[], options: CompressOptions): Promise<CompressResult[]>
  }

  export default Compress
}
