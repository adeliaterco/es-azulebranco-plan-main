"use client"

import { useState, useCallback, memo } from "react"
import { ArrowRight, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

// GA otimizado com debounce
const trackEvent = (() => {
  let timeout
  return (event, props = {}) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", event, props)
      }
    }, 300)
  }
})()

// Componente do botão memoizado
const QuizButton = memo(({ onClick, isLoading, isOnline }) => (
  <button 
    onClick={onClick} 
    disabled={isLoading || !isOnline} 
    className="btn-quiz-pulsante"
    aria-label="Comenzar quiz personalizado"
  >
    {isLoading ? (
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        PREPARANDO...
        <div className="spinner" />
      </span>
    ) : (
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        COMENZAR QUIZ AHORA
        <ArrowRight style={{ marginLeft: "12px", width: "22px", height: "22px" }} />
      </span>
    )}
  </button>
))

// Componente de progresso memoizado
const ProgressIndicator = memo(() => (
  <div className="indicador-progresso">
    <div className="circulo-progresso active"></div>
    <div className="circulo-progresso"></div>
    <div className="circulo-progresso"></div>
    <div className="circulo-progresso"></div>
    <span>Paso 1</span>
  </div>
))

// Loading overlay otimizado
const LoadingOverlay = memo(({ progress }) => (
  <div className="loading-overlay">
    <div className="loading-content">
      <div style={{ fontSize: "18px", fontWeight: "600" }}>Preparando tu quiz personalizado...</div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ transform: `translateX(${progress - 100}%)` }}
        />
      </div>
    </div>
  </div>
))

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isOnline, setIsOnline] = useState(true)

  // Handler otimizado com useCallback
  const handleStart = useCallback(() => {
    if (isLoading || !isOnline) return

    setIsLoading(true)
    setLoadingProgress(20)
    trackEvent("quiz_start")

    let progress = 20
    const interval = setInterval(() => {
      progress += 15
      setLoadingProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        
        // Preservar UTMs de forma otimizada
        let url = "/quiz/1"
        if (typeof window !== "undefined" && window.location.search) {
          const params = new URLSearchParams(window.location.search)
          const utms = new URLSearchParams()

          for (const [key, value] of params) {
            if (key.startsWith("utm_")) utms.set(key, value)
          }

          if (utms.toString()) url += `?${utms.toString()}`
        }

        router.push(url)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [isLoading, isOnline, router])

  return (
    <>
      {/* CSS CRÍTICO INLINE OTIMIZADO */}
      <style jsx>{`
        /* RESET E BASE */
        * {
          box-sizing: border-box;
        }
        
        .page-container {
          background: linear-gradient(145deg, #000000 0%, #111111 100%);
          min-height: 100vh;
          padding: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* CONTAINER PRINCIPAL OTIMIZADO */
        .container-preto {
          background: linear-gradient(145deg, #000000 0%, #111111 100%);
          border: 2px solid #333333;
          border-radius: 25px;
          padding: 45px;
          max-width: 650px;
          margin: 0 auto;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          will-change: transform;
        }

        /* BOTÃO OTIMIZADO PARA PERFORMANCE */
        .btn-quiz-pulsante {
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
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          will-change: transform;
          position: relative;
          overflow: hidden;
        }

        .btn-quiz-pulsante::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .btn-quiz-pulsante:hover::before {
          left: 100%;
        }

        .btn-quiz-pulsante:hover {
          transform: scale(1.02);
          background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
          box-shadow: 0 15px 40px rgba(220, 38, 38, 0.7);
        }

        .btn-quiz-pulsante:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* ANIMAÇÃO DE PULSO OTIMIZADA */
        @keyframes pulso {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
          }
          50% { 
            transform: scale(1.02);
            box-shadow: 0 12px 35px rgba(220, 38, 38, 0.6);
          }
        }

        .btn-quiz-pulsante:not(:hover):not(:disabled) {
          animation: pulso 2s ease-in-out infinite;
        }

        /* SPINNER OTIMIZADO */
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

        /* TEXTOS OTIMIZADOS */
        .titulo-principal {
          color: #ffffff;
          font-size: 34px;
          font-weight: 800;
          margin-bottom: 25px;
          line-height: 1.3;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .subtitulo {
          color: #e5e5e5;
          font-size: 19px;
          margin-bottom: 35px;
          font-weight: 500;
          line-height: 1.4;
        }

        /* INDICADOR DE PROGRESSO OTIMIZADO */
        .indicador-progresso {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 30px;
          color: #dc2626;
          font-size: 14px;
          font-weight: 600;
        }

        .circulo-progresso {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #333333;
          transition: all 0.3s ease;
        }

        .circulo-progresso.active {
          background: #dc2626;
          box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
        }

        /* LOGO OTIMIZADA */
        .logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 45px;
        }

        .logo-arredondada {
          border-radius: 15px;
          width: 200px;
          height: 120px;
          object-fit: cover;
          border: 4px solid #dc2626;
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.4);
          transition: all 0.4s ease;
          will-change: transform;
        }

        .logo-arredondada:hover {
          transform: scale(1.05);
          box-shadow: 0 0 40px rgba(220, 38, 38, 0.6);
          border-color: #b91c1c;
        }

        /* TEXTO DE GARANTIA */
        .texto-garantia {
          color: #a3a3a3;
          font-size: 14px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 500;
        }

        /* DEPOIMENTO OTIMIZADO */
        .depoimento {
          background: linear-gradient(145deg, #111111 0%, #000000 100%);
          border: 1px solid #444;
          border-radius: 18px;
          padding: 18px;
          max-width: 400px;
          margin: 30px auto;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
        }

        .avatar {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background-image: url('https://comprarplanseguro.shop/wp-content/uploads/2025/06/06.png');
          background-size: cover;
          background-position: center;
          border: 3px solid #FFD700;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
        }

        .estrelas {
          color: #FFD700;
          font-size: 13px;
          text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
        }

        .nome-usuario {
          color: #FFD700;
          font-weight: bold;
          font-size: 13px;
        }

        .texto-depoimento {
          color: #ffffff;
          font-size: 12px;
          line-height: 1.4;
          font-style: italic;
        }

        /* LOADING OTIMIZADO */
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
          backdrop-filter: blur(5px);
        }

        .loading-content {
          text-align: center;
          color: white;
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
          width: 100%;
          background: linear-gradient(90deg, #dc2626, #f87171);
          border-radius: 3px;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        /* OFFLINE INDICATOR */
        .offline-indicator {
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

        /* COPYRIGHT */
        .copyright {
          position: relative;
          margin-top: 40px;
          padding: 20px;
          color: #888888;
          font-size: 12px;
          text-align: center;
        }

        /* ANIMAÇÕES LAZY LOADING */
        @media (prefers-reduced-motion: no-preference) {
          .titulo-principal {
            animation: fadeInUp 0.8s ease-out;
          }
          
          .subtitulo {
            animation: fadeInUp 0.8s ease-out 0.2s both;
          }
          
          .indicador-progresso {
            animation: fadeInUp 0.8s ease-out 0.4s both;
          }
          
          .logo-container {
            animation: fadeInDown 0.8s ease-out;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -30px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        /* RESPONSIVO MOBILE-FIRST OTIMIZADO */
        @media (max-width: 768px) {
          .page-container {
            padding: 15px;
          }
          
          .container-preto {
            padding: 25px;
            margin: 10px;
            border-radius: 20px;
          }
          
          .logo-container {
            margin-bottom: 30px;
          }
          
          .logo-arredondada {
            width: 160px;
            height: 100px;
            border: 3px solid #dc2626;
          }
          
          .titulo-principal {
            font-size: 26px;
            margin-bottom: 18px;
            line-height: 1.2;
          }
          
          .subtitulo {
            font-size: 16px;
            margin-bottom: 25px;
          }
          
          .depoimento {
            padding: 15px;
            margin: 20px auto;
            max-width: 95%;
          }
          
          .btn-quiz-pulsante {
            padding: 16px 32px;
            font-size: 16px;
            max-width: 95%;
          }
          
          .copyright {
            margin-top: 30px;
            padding: 15px;
          }
        }

        @media (max-width: 480px) {
          .container-preto {
            padding: 20px;
            margin: 5px;
          }
          
          .logo-arredondada {
            width: 140px;
            height: 85px;
            border: 2px solid #dc2626;
          }
          
          .titulo-principal {
            font-size: 22px;
            line-height: 1.1;
          }
          
          .subtitulo {
            font-size: 14px;
          }
          
          .depoimento {
            padding: 12px;
            gap: 10px;
            margin: 15px auto;
          }
          
          .avatar {
            width: 35px;
            height: 35px;
          }
          
          .btn-quiz-pulsante {
            padding: 14px 28px;
            font-size: 14px;
          }
          
          .copyright {
            margin-top: 25px;
            padding: 10px;
            font-size: 11px;
          }
        }

        /* OTIMIZAÇÕES DE PERFORMANCE */
        .page-container * {
          will-change: auto;
        }
        
        .btn-quiz-pulsante,
        .logo-arredondada,
        .container-preto {
          will-change: transform;
        }
      `}</style>

      <div className="page-container">
        {/* Loading overlay */}
        {isLoading && <LoadingOverlay progress={loadingProgress} />}

        {/* Offline indicator */}
        {!isOnline && (
          <div className="offline-indicator">
            ⚠️ Sem conexão com a internet
          </div>
        )}

        {/* CONTEÚDO PRINCIPAL */}
        <main className="container-preto">
          {/* LOGO CENTRALIZADA COM WEBP */}
          <div className="logo-container">
            <Image
              src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-26T205059.582.webp"
              alt="Logo Plan A"
              width={200}
              height={120}
              className="logo-arredondada"
              priority
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="
              sizes="(max-width: 480px) 140px, (max-width: 768px) 160px, 200px"
              onError={(e) => {
                e.target.style.display = "none"
              }}
            />
          </div>

          {/* TÍTULO PRINCIPAL OTIMIZADO */}
          <h1 className="titulo-principal">
            Haz que tu amor regrese a ti 100% en piloto automático, incluso en las situaciones más complicadas.
          </h1>

          {/* SUBTÍTULO OTIMIZADO */}
          <p className="subtitulo">
            Sin juegos mentales. Solo el poder del método probado por más de 3.847 personas.
          </p>

          {/* INDICADOR DE PROGRESSO */}
          <ProgressIndicator />

          {/* BOTÃO CTA OTIMIZADO */}
          <QuizButton 
            onClick={handleStart}
            isLoading={isLoading}
            isOnline={isOnline}
          />

          {/* TEXTO DE GARANTIA */}
          <div className="texto-garantia">
            <Shield size={16} />
            <span>Confidencial y personalizado. En solo 2 minutos tendrás tu plan de acción.</span>
          </div>
        </main>

        {/* DEPOIMENTO MELHORADO */}
        <aside className="depoimento">
          <div className="avatar"></div>
          <div>
            <div className="estrelas">★★★★★</div>
            <div className="nome-usuario">Pablo Alvez (@Plaboalvezs)</div>
            <div className="texto-depoimento">
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