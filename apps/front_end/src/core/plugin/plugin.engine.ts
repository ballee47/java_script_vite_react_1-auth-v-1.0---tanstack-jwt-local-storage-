import { plugins } from "@/app/plugins"

export const getRoutes = () => {
  return plugins.map(p => p.routes?.()).filter(Boolean)
}

export const getProviders = () => {
  return plugins
    .map(p => p.providers)
    .filter(Boolean)
}

export const runSetup = () => {
  plugins.forEach(p => p.setup?.())
}

export const resolveSlot = async (slot: "hero") => {
  for (const plugin of plugins) {
    if (plugin.slots?.[slot]) {
      return await plugin.slots[slot]!()
    }
  }
}