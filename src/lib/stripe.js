import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const TIER_PRICE_ID={
    'user_pro' : 'price_1Tmrw0RCtWzO0v5qKLkXOQzY' ,
    'user_premium' : 'price_1TmsRgRCtWzO0v5q8rZC51TI'
}