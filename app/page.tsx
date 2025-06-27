"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Imports específicos para reduzir bundle
import { ArrowRight, Shield } from "lucide-react"

// GA ultra-otimizado
const trackEvent = useCallback((event, props = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, props)
  }
}, [])

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isOnline, setIsOnline] = useState(true)

  // Memoizar detecção de dispositivo
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false
    return window.innerWidth < 768
  }, [])

  // Event listeners otimizados
  useEffect(() => {
    if (typeof window === "undefined") return

    const updateOnlineStatus = () => setIsOnline(navigator.onLine)
    
    window.addEventListener("online", updateOnlineStatus, { passive: true })
    window.addEventListener("offline", updateOnlineStatus, { passive: true })

    // Track page view uma única vez
    const timer = setTimeout(() => trackEvent("page_view", { device: isMobile ? "mobile" : "desktop" }), 2000)

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      clearTimeout(timer)
    }
  }, [isMobile, trackEvent])

  // Handler ultra-otimizado
  const handleStart = useCallback(() => {
    if (isLoading || !isOnline) return

    setIsLoading(true)
    trackEvent("quiz_start")

    let progress = 0
    const interval = setInterval(() => {
      progress += 25
      setLoadingProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        
        // Preservar UTMs otimizado
        const params = new URLSearchParams(window.location.search)
        const utmEntries = [...params.entries()].filter(([key]) => key.startsWith("utm_"))
        const utmString = utmEntries.length ? `?${new URLSearchParams(utmEntries).toString()}` : ""
        
        router.push(`/quiz/1${utmString}`)
      }
    }, 150)
  }, [isLoading, isOnline, router, trackEvent])

  return (
    <>
      {/* CSS CRÍTICO INLINE - MÍNIMO NECESSÁRIO */}
      <style jsx>{`
        .page-root {
          background: #000;
          min-height: 100vh;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .container-main {
          background: linear-gradient(145deg, #000 0%, #111 100%);
          border: 2px solid #333;
          border-radius: 25px;
          padding: 45px;
          max-width: 650px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
          margin-bottom: 30px;
        }

        .logo-img {
          border-radius: 15px;
          border: 4px solid #dc2626;
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.4);
          margin-bottom: 45px;
          transition: transform 0.3s ease;
        }

        .logo-img:hover {
          transform: scale(1.05);
        }

        .title-main {
          color: #fff;
          font-size: 34px;
          font-weight: 800;
          margin: 0 0 25px 0;
          line-height: 1.3;
        }

        .subtitle-main {
          color: #e5e5e5;
          font-size: 19px;
          margin: 0 0 35px 0;
          font-weight: 500;
          line-height: 1.4;
        }

        .progress-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 30px;
          color: #dc2626;
          font-size: 14px;
          font-weight: 600;
        }

        .progress-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #dc2626;
          box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
        }

        .progress-dot-inactive {
          background: #333;
          box-shadow: none;
        }

        .cta-button {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          border: none;
          padding: 18px 36px;
          font-size: 19px;
          font-weight: 700;
          border-radius: 50px;
          text-transform: uppercase;
          cursor: pointer;
          width: 100%;
          max-width: 320px;
          box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          transition: all 0.2s ease;
          animation: pulse-effect 2s infinite;
        }

        @keyframes pulse-effect {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .cta-button:hover {
          background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
          transform: scale(1.05);
          animation: none;
        }

        .cta-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          animation: none;
        }

        .guarantee-text {
          color: #a3a3a3;
          font-size: 14px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 500;
        }

        .testimonial {
          background: linear-gradient(145deg, #111 0%, #000 100%);
          border: 1px solid #444;
          border-radius: 18px;
          padding: 18px;
          max-width: 400px;
          margin: 0 auto 30px auto;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
        }

        .avatar {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: url('https://comprarplanseguro.shop/wp-content/uploads/2025/06/06.png') center/cover;
          border: 3px solid #FFD700;
          flex-shrink: 0;
        }

        .stars {
          color: #FFD700;
          font-size: 13px;
        }

        .user-name {
          color: #FFD700;
          font-weight: bold;
          font-size: 13px;
        }

        .testimonial-text {
          color: #fff;
          font-size: 12px;
          line-height: 1.4;
          font-style: italic;
        }

        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .loading-text {
          color: white;
          font-size: 18px;
          font-weight: 600;
          text-align: center;
        }

        .progress-bar {
          width: 250px;
          height: 6px;
          background: #333;
          border-radius: 3px;
          overflow: hidden;
          margin-top: 25px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #dc2626, #f87171);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-left: 10px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .offline-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #f59e0b;
          color: white;
          text-align: center;
          padding: 10px;
          z-index: 1000;
        }

        .copyright {
          color: #888;
          font-size: 12px;
          text-align: center;
          padding: 20px;
        }

        /* RESPONSIVO OTIMIZADO */
        @media (max-width: 768px) {
          .container-main {
            padding: 25px;
            margin: 10px 10px 20px 10px;
          }
          
          .title-main {
            font-size: 26px;
            margin-bottom: 18px;
          }
          
          .subtitle-main {
            font-size: 16px;
            margin-bottom: 25px;
          }
          
          .cta-button {
            padding: 16px 32px;
            font-size: 16px;
            max-width: 95%;
          }
          
          .testimonial {
            padding: 15px;
            max-width: 95%;
          }
        }

        @media (max-width: 480px) {
          .page-root {
            padding: 15px;
          }
          
          .container-main {
            padding: 20px;
            margin: 5px 5px 15px 5px;
          }
          
          .title-main {
            font-size: 22px;
          }
          
          .subtitle-main {
            font-size: 14px;
          }
          
          .cta-button {
            padding: 14px 28px;
            font-size: 14px;
          }
          
          .avatar {
            width: 35px;
            height: 35px;
          }
          
          .testimonial {
            padding: 12px;
            gap: 10px;
          }
        }
      `}</style>

      <div className="page-root">
        {/* Loading overlay */}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-text">
              Preparando tu quiz personalizado...
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${loadingProgress}%` }} />
              </div>
            </div>
          </div>
        )}

        {/* Offline indicator */}
        {!isOnline && (
          <div className="offline-banner">
            ⚠️ Sem conexão com a internet
          </div>
        )}

        {/* CONTEÚDO PRINCIPAL */}
        <main className="container-main">
          {/* LOGO OTIMIZADA */}
          <Image
            src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-26T205059.582.webp"
            alt="Logo Plan A"
            width={200}
            height={120}
            className="logo-img"
            priority
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
            sizes="(max-width: 480px) 140px, (max-width: 768px) 160px, 200px"
            onError={(e) => {
              e.target.src = "https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-26T205059.582.png"
            }}
          />

          {/* TÍTULO PRINCIPAL */}
          <h1 className="title-main">
            Haz que tu amor regrese a ti 100% en piloto automático, incluso en las situaciones más complicadas.
          </h1>

          {/* SUBTÍTULO */}
          <p className="subtitle-main">
            Sin juegos mentales. Solo el poder del método probado por más de 3.847 personas.
          </p>

          {/* INDICADOR DE PROGRESSO */}
          <div className="progress-indicator">
            <div className="progress-dot"></div>
            <div className="progress-dot progress-dot-inactive"></div>
            <div className="progress-dot progress-dot-inactive"></div>
            <div className="progress-dot progress-dot-inactive"></div>
            <span>Paso 1</span>
          </div>

          {/* BOTÃO CTA */}
          <button 
            onClick={handleStart} 
            disabled={isLoading || !isOnline} 
            className="cta-button"
            aria-label="Comenzar quiz personalizado"
          >
            {isLoading ? (
              <>
                PREPARANDO...
                <div className="spinner" />
              </>
            ) : (
              <>
                COMENZAR QUIZ AHORA
                <ArrowRight style={{ marginLeft: "12px", width: "22px", height: "22px" }} />
              </>
            )}
          </button>

          {/* TEXTO DE GARANTIA */}
          <div className="guarantee-text">
            <Shield size={16} />
            <span>Confidencial y personalizado. En solo 2 minutos tendrás tu plan de acción.</span>
          </div>
        </main>

        {/* DEPOIMENTO */}
        <aside className="testimonial">
          <div className="avatar"></div>
          <div>
            <div className="stars">★★★★★</div>
            <div className="user-name">Pablo Alvez (@Plaboalvezs)</div>
            <div className="testimonial-text">
              "Apliqué tu Método de los 3 Pasos y en 2 semanas ella regresó. Sin juegos mentales, ¡simplemente funciona!"
            </div>
          </div>
        </aside>

        {/* Copyright */}
        <footer className="copyright">
          Plan A™ Todos los Derechos Reservados.
        </footer>
      </div>
    </>
  )
}