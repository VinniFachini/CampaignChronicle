export interface Feature {
    icon: Component
    title: string
    description: string
}

export interface Step {
    icon: Component
    number: string
    title: string
    description: string
}

export interface Testimonial {
    name: string
    role: string
    avatar: string
    text: string
    rating: number
}

export interface PricingPlan {
    name: string
    price: string
    period: string
    description: string
    features: string[]
    cta: string
    highlighted: boolean
}

export interface NavLink {
    label: string
    href: string
}