// /api/create-subscription
import Razorpay from 'razorpay'
import { NextResponse } from 'next/server'

export async function POST(req, res) {
  let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });

  const result = await instance.subscriptions.create({
    plan_id: process.env.SUBSCRIPTION_PLAN_ID,
    customer_notify: 1,
    total_count: 1,
    quantity: 1,
    addons: [],
    notes: {
      key: 'value'
    },
  });

  return NextResponse.json(result);
}