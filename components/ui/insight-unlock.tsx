"use client"

import { motion } from "framer-motion"
import { Brain, Target, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from "react"

interface InsightUnlockProps {
  insight: {
    id: number
    title: string
    accuracy: number
    description: string
    type: "pattern" | "technique" | "analysis"
  }
  onComplete: () => void
}

export function InsightUnlock({ insight, onComplete }: InsightUnlockProps) {
  useEffect(() => {
    // Auto close after 3 seconds
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  // Escolher ícone baseado no tipo
  const getIcon = () => {
    switch (insight.type) {
      case "pattern":
        return <Brain className="w-10 h-10 text-white" />
      case "technique":
        return <Target className="w-10 h-10 text-white" />
      case "analysis":
        return <TrendingUp className="w-10 h-10 text-white" />
      default:
        return <Brain className="w-10 h-10 text-white" />
    }
  }

  // Escolher cor baseado no tipo
  const getGradient = () => {
    switch (insight.type) {
      case "pattern":
        return "from-blue-500 to-purple-600"
      case "technique":
        return "from-green-500 to-teal-600"
      case "analysis":
        return "from-red-500 to-pink-600"
      default:
        return "from-blue-500 to-purple-600"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="bg-white border-2 border-blue-400 shadow-2xl">
          <CardContent className="p-8 text-center relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6"
            >
              <motion.div
                className={`w-20 h-20 bg-gradient-to-br ${getGradient()} rounded-full flex items-center justify-center mx-auto mb-4`}
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  times: [0, 0.2, 0.5, 1],
                  repeat: 0,
                }}
              >
                {getIcon()}
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">🧠 NUEVO INSIGHT REVELADO!</h2>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-6"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{insight.title}</h3>
              <p className="text-gray-700 mb-4">{insight.description}</p>
              <div className="text-3xl font-bold text-green-600">
                Precisión: {insight.accuracy}%
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-gray-600 text-sm bg-gray-100 p-3 rounded-lg">
                Este análisis se incluirá en tu diagnóstico personalizado final.
              </p>

              <div className="flex justify-center">
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-blue-500 rounded-full"
                      animate={{
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
