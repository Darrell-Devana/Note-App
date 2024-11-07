/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ADD_URL: string
    readonly VITE_LIST_URL: string
    readonly VITE_OPEN_URL: string
    readonly VITE_UPDATE_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}