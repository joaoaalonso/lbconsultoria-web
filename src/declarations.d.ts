// sweetalert v2 types are broken — override to callable function
declare module 'sweetalert' {
  function swal(title: string, text?: string, icon?: string): Promise<boolean>
  function swal(options: object): Promise<boolean>
  export = swal
}

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
