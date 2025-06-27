"use client"

import { useState, useCallback } from "react"
import { ArrowRight, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

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

  // Função de início ultra-otimizada
  const handleStart = useCallback(() => {
    if (isLoading) return

    setIsLoading(true)
    enviarEvento("quiz_start")

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

    // Navegação imediata
    setTimeout(() => router.push(url), 100)
  }, [isLoading, router])

  return (
    <div className="min-h-screen bg-black text-white p-4 relative">
      <style jsx>{`
        /* CSS CRÍTICO MINIFICADO */
        .container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          padding: 20px;
          background: #111;
          border: 1px solid #333;
          border-radius: 20px;
        }
        
        .logo {
          width: 140px;
          height: 85px;
          border: 3px solid #dc2626;
          border-radius: 12px;
          margin: 0 auto 25px;
          display: block;
        }
        
        .title {
          font-size: 22px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 15px;
          color: #fff;
        }
        
        .subtitle {
          font-size: 14px;
          color: #e5e5e5;
          margin-bottom: 20px;
          line-height: 1.3;
        }
        
        .progress {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 25px;
          color: #dc2626;
          font-size: 12px;
          font-weight: 600;
        }
        
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #dc2626;
        }
        
        .dot-inactive {
          background: #333;
        }
        
        .btn {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          border: none;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 50px;
          text-transform: uppercase;
          cursor: pointer;
          width: 100%;
          max-width: 300px;
          transition: transform 0.2s;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .btn:hover {
          transform: scale(1.05);
        }
        
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .guarantee {
          color: #a3a3a3;
          font-size: 12px;
          margin-top: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        
        .testimonial {
          background: #111;
          border: 1px solid #444;
          border-radius: 15px;
          padding: 15px;
          margin: 25px auto;
          max-width: 350px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: url('https://comprarplanseguro.shop/wp-content/uploads/2025/06/06.png') center/cover;
          border: 2px solid #FFD700;
          flex-shrink: 0;
        }
        
        .stars {
          color: #FFD700;
          font-size: 11px;
        }
        
        .username {
          color: #FFD700;
          font-weight: bold;
          font-size: 11px;
        }
        
        .review {
          color: #fff;
          font-size: 11px;
          line-height: 1.3;
          font-style: italic;
        }
        
        .copyright {
          text-align: center;
          color: #888;
          font-size: 10px;
          margin-top: 20px;
          padding: 10px;
        }
        
        .loading {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* MOBILE OTIMIZADO */
        @media (min-width: 768px) {
          .container {
            padding: 40px;
          }
          
          .logo {
            width: 180px;
            height: 110px;
          }
          
          .title {
            font-size: 28px;
            margin-bottom: 20px;
          }
          
          .subtitle {
            font-size: 16px;
            margin-bottom: 25px;
          }
          
          .btn {
            padding: 18px 36px;
            font-size: 18px;
            max-width: 320px;
          }
          
          .testimonial {
            padding: 18px;
            max-width: 400px;
          }
          
          .avatar {
            width: 50px;
            height: 50px;
          }
          
          .stars, .username, .review {
            font-size: 12px;
          }
        }
      `}</style>

      {/* Loading overlay */}
      {isLoading && (
        <div className="loading">
          <div style={{ textAlign: "center", color: "white" }}>
            <div style={{ fontSize: "16px", fontWeight: "600", marginBottom: "15px" }}>Preparando tu quiz...</div>
            <div className="spinner" />
          </div>
        </div>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <div className="container">
        {/* LOGO OTIMIZADA */}
        <Image
          src="https://comprarplanseguro.shop/wp-content/uploads/2025/06/imagem_gerada-2025-06-26T205059.582.png"
          alt="Logo Plan A"
          width={140}
          height={85}
          className="logo"
          priority
          quality={75}
          sizes="(max-width: 768px) 140px, 180px"
        />

        {/* TÍTULO PRINCIPAL */}
        <h1 className="title">
          Haz que tu amor regrese a ti 100% en piloto automático, incluso en las situaciones más complicadas.
        </h1>

        {/* SUBTÍTULO */}
        <p className="subtitle">Sin juegos mentales. Solo el poder del método probado por más de 3.847 personas.</p>

        {/* INDICADOR DE PROGRESSO */}
        <div className="progress">
          <div className="dot"></div>
          <div className="dot dot-inactive"></div>
          <div className="dot dot-inactive"></div>
          <div className="dot dot-inactive"></div>
          <span>Paso 1</span>
        </div>

        {/* BOTÃO CTA */}
        <button onClick={handleStart} disabled={isLoading} className="btn">
          {isLoading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              PREPARANDO...
              <div className="spinner" style={{ width: "16px", height: "16px" }} />
            </span>
          ) : (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              COMENZAR QUIZ AHORA
              <ArrowRight size={18} />
            </span>
          )}
        </button>

        {/* TEXTO DE GARANTIA */}
        <div className="guarantee">
          <Shield size={14} />
          <span>Confidencial y personalizado. En solo 2 minutos tendrás tu plan de acción.</span>
        </div>
      </div>

      {/* DEPOIMENTO */}
      <div className="testimonial">
        <div className="avatar"></div>
        <div>
          <div className="stars">★★★★★</div>
          <div className="username">Pablo Alvez (@Plaboalvezs)</div>
          <div className="review">
            "Apliqué tu Método de los 3 Pasos y en 2 semanas ella regresó. Sin juegos mentales, ¡simplemente funciona!"
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">Plan A™ Todos los Derechos Reservados.</div>
    </div>
  )
}
