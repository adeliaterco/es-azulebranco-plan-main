"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

interface ValueCounterProps {
  value: number
  label?: string
}

export function ValueCounter({ value, label }: ValueCounterProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-blue-100 border border-blue-300 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm"
    >
      <TrendingUp className="w-4 h-4 text-blue-700" />
      <span className="text-blue-800 font-semibold">
        {label ? `${label}: ${value}%` : `Valor Desbloqueado: € ${value}`}
      </span>
    </motion.div>
  )
}
