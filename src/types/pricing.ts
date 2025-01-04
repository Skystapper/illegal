export interface PricingPlan {
  id: number
  name: string
  price: number
  features: string[] | string
  version: number
  orderIndex: number
}

export interface PricingPlanHistory {
  id: number
  planId: number
  name: string
  price: number
  features: string[] | string
  version: number
  changedAt: Date
} 

export function historyToPlan(history: PricingPlanHistory, orderIndex: number): PricingPlan {
    return {
      id: history.planId,
      name: history.name,
      price: history.price,
      features: Array.isArray(history.features) ? history.features : JSON.parse(history.features),
      version: history.version,
      orderIndex: orderIndex
    }
  }

  export function parseFeatures(features: string | string[]): string[] {
    if (Array.isArray(features)) {
      return features
    }
    try {
      return JSON.parse(features)
    } catch {
      return []
    }
  }