import _ICON from './icon.vue'
import type { App, Plugin } from 'vue'

type SFCWithInstall<T> = T & Plugin

const withInstall  = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any).name
    app.component(name, component as SFCWithInstall<T>)
  }
  return component
}

export const IOCN = withInstall(_ICON)
export default IOCN