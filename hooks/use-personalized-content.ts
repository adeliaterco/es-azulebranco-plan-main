import { useEffect, useState } from "react"

export function usePersonalizedTechnique() {
  const [technique, setTechnique] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.getPersonalizedTechnique) {
        const result = window.getPersonalizedTechnique()
        setTechnique(result || "")
      }
    } catch (error) {
      console.error("Erro ao carregar técnica personalizada:", error)
      setTechnique("")
    } finally {
      setLoading(false)
    }
  }, [])

  return { technique, loading }
}

export function usePersonalized7DayPlan() {
  const [plan, setPlan] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.getPersonalized7DayPlan) {
        const result = window.getPersonalized7DayPlan()
        setPlan(result || "")
      }
    } catch (error) {
      console.error("Erro ao carregar plano de 7 dias:", error)
      setPlan("")
    } finally {
      setLoading(false)
    }
  }, [])

  return { plan, loading }
}

export function usePersonalizedTestimonial() {
  const [testimonial, setTestimonial] = useState&lt;{ name: string; text: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.getPersonalizedTestimonial) {
        const result = window.getPersonalizedTestimonial()
        setTestimonial(result || null)
      }
    } catch (error) {
      console.error("Erro ao carregar depoimento:", error)
      setTestimonial(null)
    } finally {
      setLoading(false)
    }
  }, [])

  return { testimonial, loading }
}
