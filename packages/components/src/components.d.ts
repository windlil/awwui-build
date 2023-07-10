import * as components from './index'

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    AwwButton: typeof components.Button
  }
}

export {}