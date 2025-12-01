"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Zap, Trophy, Users } from "lucide-react"

interface PersonalizedTechniqueProps {
  content?: string
  plan?: string
  testimonial?: { name: string; text: string } | null
}

export function PersonalizedTechnique({ 
  content, 
  plan,
  testimonial
}: PersonalizedTechniqueProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("technique")

  // Não renderizar se não houver conteúdo
  if (!content && !plan && !testimonial) {
    return null
  }

  return (
    <div className="w-full space-y-4">
      {/* 🎯 TÉCNICA PERSONALIZADA */}
      {content && content.trim() !== "" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-blue-500/50 rounded-lg overflow-hidden bg-blue-900/20"
        >
          <button
            onClick={() => setExpandedSection(expandedSection === "technique" ? null : "technique")}
            className="w-full p-4 flex items-center justify-between hover:bg-blue-900/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span className="font-bold text-blue-300 text-sm sm:text-base">🎯 Tu Técnica</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-blue-400 transition-transform flex-shrink-0 ${
                expandedSection === "technique" ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {expandedSection === "technique" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-blue-900/30 border-t border-blue-500/30">
                  <div className="text-blue-200 text-xs sm:text-sm whitespace-pre-wrap font-medium leading-relaxed max-h-80 overflow-y-auto">
                    {content}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* 📋 PLANO DE 7 DIAS */}
      {plan && plan.trim() !== "" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="border border-green-500/50 rounded-lg overflow-hidden bg-green-900/20"
        >
          <button
            onClick={() => setExpandedSection(expandedSection === "plan" ? null : "plan")}
            className="w-full p-4 flex items-center justify-between hover:bg-green-900/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="font-bold text-green-300 text-sm sm:text-base">📋 Plan de 7 Días</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-green-400 transition-transform flex-shrink-0 ${
                expandedSection === "plan" ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {expandedSection === "plan" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-green-900/30 border-t border-green-500/30">
                  <div className="text-green-200 text-xs sm:text-sm whitespace-pre-wrap font-medium leading-relaxed max-h-80 overflow-y-auto">
                    {plan}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* 💬 DEPOIMENTO */}
      {testimonial && testimonial.name && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="border border-purple-500/50 rounded-lg overflow-hidden bg-purple-900/20"
        >
          <button
            onClick={() => setExpandedSection(expandedSection === "testimonial" ? null : "testimonial")}
            className="w-full p-4 flex items-center justify-between hover:bg-purple-900/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span className="font-bold text-purple-300 text-sm sm:text-base">💬 Testimonio</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-purple-400 transition-transform flex-shrink-0 ${
                expandedSection === "testimonial" ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {expandedSection === "testimonial" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-purple-900/30 border-t border-purple-500/30">
                  <p className="text-purple-300 font-bold text-xs sm:text-sm mb-2">{testimonial.name}</p>
                  <p className="text-purple-200 text-xs sm:text-sm italic">"{testimonial.text}"</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
