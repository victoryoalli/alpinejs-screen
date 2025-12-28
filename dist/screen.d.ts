import type { Alpine as AlpineType } from 'alpinejs'

declare const screen: (Alpine: AlpineType) => void

export default screen

declare module 'alpinejs' {
    interface Magics<T> {
        /** Returns window.outerWidth */
        $width: number
        /** Returns window.outerHeight */
        $height: number
    }
}
