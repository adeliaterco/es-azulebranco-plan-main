// ✅ HOOK MOBILE-SAFE CORRIGIDO
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // ✅ INICIALIZAR com valor padrão baseado no SSR
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    // ✅ Marcar como hidratado
    setIsHydrated(true)
    
    // ✅ Função unificada para verificar mobile
    const checkIsMobile = () => {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    
    // ✅ Definir valor inicial uma vez
    setIsMobile(checkIsMobile())

    // ✅ Usar apenas matchMedia para evitar inconsistências
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = (e: MediaQueryListEvent) => {
      // ✅ Usar o resultado do matchMedia diretamente
      setIsMobile(e.matches)
    }

    // ✅ Listener mais estável
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange)
    } else {
      // ✅ Fallback para browsers antigos
      mql.addListener(onChange)
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", onChange)
      } else {
        mql.removeListener(onChange)
      }
    }
  }, [])

  // ✅ Retornar valor estável antes da hidratação
  return isHydrated ? isMobile : false
}
