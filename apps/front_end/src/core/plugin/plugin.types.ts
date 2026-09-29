import type { ComponentType, ReactNode } from "react";

export type AppPlugin = {
  name: string

  routes?: () => ReactNode

  providers?: ComponentType<{ children: ReactNode }>

  slots?: {
    hero?: () => Promise<unknown>
  }

  setup?: () => void
}
