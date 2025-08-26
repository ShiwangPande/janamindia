import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Build a UPI deep link per NPCI specification
export function buildUpiDeepLink(params: {
  payeeVpa: string
  payeeName: string
  amountInRupees: number
  txnNote?: string
  txnRef?: string
  currency?: string
}): string {
  const { payeeVpa, payeeName, amountInRupees, txnNote, txnRef, currency = "INR" } = params
  const query = new URLSearchParams({
    pa: payeeVpa,
    pn: payeeName,
    am: amountInRupees.toFixed(2),
    cu: currency,
  })
  if (txnNote) query.set("tn", txnNote)
  if (txnRef) query.set("tr", txnRef)
  return `upi://pay?${query.toString()}`
}
