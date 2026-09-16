/// <reference types="vite/client" />

declare module "*.pdf" {
  const src: string;
  export default src;
}

declare module "*.docx" {
  const src: string;
  export default src;
}
