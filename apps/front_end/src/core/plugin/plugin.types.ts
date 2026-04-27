import React from "react"

export type AppPlugin = {
  name: string

  routes?: () => React.ReactNode

  providers?: React.FC<{ children: React.ReactNode }>

 slots?: {
  hero?: () => Promise<any>
}

  setup?: () => void
}