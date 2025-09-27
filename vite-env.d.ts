// <reference types="vite/client" />

export {}; // Ensure this file is treated as a module

declare module '*.glsl' {
  const value: string
  export default value
}

declare module '*.vs' {
  const value: string
  export default value
}

declare module '*.fs' {
  const value: string
  export default value
}

declare module '*.vert' {
  const value: string
  export default value
}

declare module '*.frag' {
  const value: string
  export default value
}

// Extend JSX for custom shader materials
declare global {
  namespace JSX {
    interface IntrinsicElements {
      customShaderMaterial: {
        time?: number
        color?: number[]
        [key: string]: unknown
      }
    }
  }
}