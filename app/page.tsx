"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Head from "next/head"

// GA otimizado - só envia quando necessário
const enviarEvento = (() => {
  let queue = []
  let timeout

  return (evento, props = {}) => {
    queue.push({ evento, props })
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      if (typeof window !== "undefined" && window.gtag && queue.length) {
        queue.forEach(({ evento, props }) => {
          window.gtag("event", evento, props)
        })
        queue = []
      }
    }, 500)
  }
})()

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const [isOnline, setIsOnline] = useState(true)

  // Detecção de conexão otimizada
  useEffect(() => {
    if (typeof window === "undefined") return

    const updateOnlineStatus = () => setIsOnline(navigator.onLine)
    setIsOnline(navigator.onLine)

    window.addEventListener("online", updateOnlineStatus, { passive: true })
    window.addEventListener("offline", updateOnlineStatus, { passive: true })

    return () => {
      window.removeEventListener("online", updateOnlineStatus)
      window.removeEventListener("offline", updateOnlineStatus)
    }
  }, [])

  // Tracking otimizado - só o essencial
  useEffect(() => {
    if (typeof window === "undefined") return

    const timer = setTimeout(() => {
      enviarEvento("page_view", {
        device: window.innerWidth < 768 ? "mobile" : "desktop",
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Função de início ultra-otimizada
  const handleStart = useCallback(() => {
    if (isLoading || !isOnline) return

    setIsLoading(true)
    setLoadingProgress(20)

    enviarEvento("quiz_start")

    let progress = 20
    const interval = setInterval(() => {
      progress += 15
      setLoadingProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)

        // Preservar UTMs
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
  }, [isLoading, isOnline, router])

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://comprarplanseguro.shop" />
        <link rel="dns-prefetch" href="https://comprarplanseguro.shop" />
      </Head>

      <div
        style={{
          backgroundColor: "#000000",
          minHeight: "100vh",
          padding: "20px",
          position: "relative",
        }}
      >
        <style jsx>{`
          /* CSS CRÍTICO OTIMIZADO */
          .btn-quiz-pulsante {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            border: none;
            padding: 18px 36px;
            font-size: 19px;
            font-weight: bold;
            border-radius: 50px;
            text-transform: uppercase;
            cursor: pointer;
            transition: transform 0.3s ease;
            animation: pulsar 2s infinite;
            width: 100%;
            max-width: 320px;
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4);
            letter-spacing: 0.5px;
            will-change: transform;
          }
          
          @keyframes pulsar {
            0% { transform: scale(1); box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4), 0 0 0 0 rgba(220, 38, 38, 0.7); }
            70% { transform: scale(1.03); box-shadow: 0 12px 35px rgba(220, 38, 38, 0.6), 0 0 0 15px rgba(220, 38, 38, 0); }
            100% { transform: scale(1); box-shadow: 0 8px 25px rgba(220, 38, 38, 0.4), 0 0 0 0 rgba(220, 38, 38, 0); }
          }
          
          .btn-quiz-pulsante:hover {
            background: linear-gradient(135deg, #b91c1c 0%, #991b1b 100%);
            transform: scale(1.05);
            box-shadow: 0 15px 40px rgba(220, 38, 38, 0.7);
          }
          
          .container-preto {
            background: linear-gradient(145deg, #000000 0%, #111111 100%);
            border: 2px solid #333333;
            border-radius: 25px;
            padding: 45px;
            max-width: 650px;
            margin: 0 auto;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
          }
          
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
            background: #dc2626;
            box-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
          }
          
          .circulo-inativo {
            background: #333333;
            box-shadow: none;
          }
          
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
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.4), 0 0 0 2px #dc2626;
            transition: all 0.4s ease;
            display: block;
            will-change: transform;
          }
          
          .logo-arredondada:hover {
            transform: scale(1.05);
            box-shadow: 0 0 40px rgba(220, 38, 38, 0.6), 0 0 0 3px #b91c1c;
            border-color: #b91c1c;
          }
          
          .main-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding-top: 100px;
          }
          
          /* MOBILE FIRST */
          @media (max-width: 768px) {
            .container-preto { padding: 25px; margin: 10px; border-radius: 20px; }
            .logo-container { margin-bottom: 30px; }
            .logo-arredondada { width: 160px; height: 100px; border: 3px solid #dc2626; }
            .titulo-principal { font-size: 26px; margin-bottom: 18px; line-height: 1.2; }
            .subtitulo { font-size: 16px; margin-bottom: 25px; }
            .btn-quiz-pulsante { padding: 16px 32px; font-size: 16px; max-width: 95%; }
            .main-content { padding-top: 20px; min-height: calc(100vh - 40px); }
          }

          @media (max-width: 480px) {
            .container-preto { padding: 20px; margin: 5px; }
            .logo-arredondada { width: 140px; height: 85px; border: 2px solid #dc2626; }
            .titulo-principal { font-size: 22px; line-height: 1.1; }
            .subtitulo { font-size: 14px; }
            .btn-quiz-pulsante { padding: 14px 28px; font-size: 14px; }
          }
        `}</style>

        {/* Loading overlay */}
        {isLoading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <div style={{ textAlign: "center", color: "white" }}>
              <div style={{ fontSize: "18px", fontWeight: "600" }}>Preparando tu quiz personalizado...</div>
              <div
                style={{
                  width: "250px",
                  height: "6px",
                  background: "#333",
                  borderRadius: "3px",
                  overflow: "hidden",
                  marginTop: "25px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, #dc2626, #f87171)",
                    transition: "width 0.3s ease",
                    borderRadius: "3px",
                    width: `${loadingProgress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div
            style={{
              position: "fixed",
              top: "20px",
              left: "20px",
              right: "20px",
              background: "#dc2626",
              color: "white",
              padding: "15px",
              borderRadius: "10px",
              zIndex: 1000,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage("")}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Offline indicator */}
        {!isOnline && (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              right: "0",
              background: "#f59e0b",
              color: "white",
              textAlign: "center",
              padding: "10px",
              zIndex: 1000,
            }}
          >
            ⚠️ Sem conexão com a internet
          </div>
        )}

        {/* CONTEÚDO PRINCIPAL */}
        <div className="main-content">
          <div className="container-preto">
            {/* LOGO OTIMIZADA */}
            <div className="logo-container">
              <Image
                src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-26T205059.582.webp"
                alt="Logo Plan A"
                width={200}
                height={120}
                className="logo-arredondada"
                priority
                quality={80}
                sizes="(max-width: 480px) 140px, (max-width: 768px) 160px, 200px"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                onError={(e) => {
                  e.target.style.display = "none"
                }}
              />
            </div>

            {/* TÍTULO PRINCIPAL */}
            <h1 className="titulo-principal">
              Haz que tu amor regrese a ti 100% en piloto automático, incluso en las situaciones más complicadas.
            </h1>

            {/* SUBTÍTULO */}
            <p className="subtitulo">
              Sin juegos mentales. Solo el poder del método probado por más de 3.847 personas.
            </p>

            {/* INDICADOR DE PROGRESSO */}
            <div className="indicador-progresso">
              <div className="circulo-progresso"></div>
              <div className="circulo-progresso circulo-inativo"></div>
              <div className="circulo-progresso circulo-inativo"></div>
              <div className="circulo-progresso circulo-inativo"></div>
              <span>Paso 1</span>
            </div>

            {/* BOTÃO CTA */}
            <button onClick={handleStart} disabled={isLoading || !isOnline} className="btn-quiz-pulsante">
              {isLoading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  PREPARANDO...
                  <div
                    style={{
                      marginLeft: "10px",
                      width: "18px",
                      height: "18px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  COMENZAR QUIZ AHORA
                  <ArrowRight style={{ marginLeft: "12px", width: "22px", height: "22px" }} />
                </span>
              )}
            </button>

            {/* TEXTO DE GARANTIA */}
            <div className="texto-garantia">
              <Shield size={16} />
              <span>Confidencial y personalizado. En solo 2 minutos tendrás tu plan de acción.</span>
            </div>
          </div>
        </div>

        {/* DEPOIMENTO LAZY LOADED */}
        <div
          style={{
            background: "linear-gradient(145deg, #111111 0%, #000000 100%)",
            border: "1px solid #444",
            borderRadius: "18px",
            padding: "18px",
            maxWidth: "400px",
            margin: "30px auto",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
          }}
        >
          <div
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              backgroundImage: "url('https://comprarplanseguro.shop/wp-content/uploads/2025/06/06.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              border: "3px solid #FFD700",
              flexShrink: 0,
              boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
            }}
          />
          <div>
            <div style={{ color: "#FFD700", fontSize: "13px", textShadow: "0 0 5px rgba(255, 215, 0, 0.5)" }}>
              ★★★★★
            </div>
            <div style={{ color: "#FFD700", fontWeight: "bold", fontSize: "13px" }}>Pablo Alvez (@Plaboalvezs)</div>
            <div style={{ color: "#ffffff", fontSize: "12px", lineHeight: 1.4, fontStyle: "italic" }}>
              "Apliqué tu Método de los 3 Pasos y en 2 semanas ella regresó. Sin juegos mentales, ¡simplemente
              funciona!"
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            position: "relative",
            marginTop: "40px",
            padding: "20px",
            color: "#888888",
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          Plan A™ Todos los Derechos Reservados.
        </div>

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .depoimento { padding: 15px; margin: 20px auto; max-width: 95%; }
            .avatar { width: 35px; height: 35px; }
          }
        `}</style>
      </div>
    </>
  )
}
