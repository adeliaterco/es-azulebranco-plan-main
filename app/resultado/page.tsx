"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Gift,
  Star,
  Shield,
  ArrowRight,
  Check,
  Clock,
  AlertTriangle,
  BookOpen,
  Users,
  Zap,
  Target,
  Heart,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CountdownTimer } from "@/components/countdown-timer"
import { enviarEvento } from "../../lib/analytics"

export default function ResultPageOptimized() {
  const [unlockedBonuses, setUnlockedBonuses] = useState<number[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [recentBuyers, setRecentBuyers] = useState(3)
  const [userGender, setUserGender] = useState<string>("")
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedBonuses = localStorage.getItem("unlockedBonuses")
    const savedValue = localStorage.getItem("totalValue")
    const savedGender = localStorage.getItem("userGender")

    if (savedBonuses) setUnlockedBonuses(JSON.parse(savedBonuses))
    if (savedValue) setTotalValue(Number.parseInt(savedValue))
    if (savedGender) setUserGender(savedGender)

    setTimeout(() => {
      setIsLoaded(true)
    }, 300)

    // Simulate recent buyers with more dynamic behavior
    const interval = setInterval(() => {
      setRecentBuyers((prev) => {
        const increase = Math.floor(Math.random() * 3) + 1
        return Math.min(prev + increase, 17)
      })
    }, 30000)

    // Registra visualización de la página de resultado
    try {
      enviarEvento("visualizou_resultado")
      console.log("Evento de visualización registrado con éxito")
    } catch (error) {
      console.error("Error al registrar evento de visualización:", error)
    }

    return () => clearInterval(interval)
  }, [])

  const handlePurchase = () => {
    try {
      enviarEvento("clicou_comprar", {
        posicao: "principal",
      })
    } catch (error) {
      console.error("Error al registrar evento de clic:", error)
    }
    window.open("https://pay.hotmart.com/F100142422S?off=qqcmu6vg&checkoutMode=10", "_blank")
  }

  const getPersonalizedPronoun = () => {
    return userGender === "FEMININO" ? "él" : "ella"
  }

  // Función para feedback táctil en dispositivos móviles
  const handleTouchFeedback = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black" ref={contentRef}>
      {/* HERO SECTION - RESULTADO IMPACTANTE */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 animate-pulse"></div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          className="relative z-10 px-4 py-8 text-center"
        >
          {/* Badge de Urgência */}
          <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 animate-bounce">
            <Zap className="w-4 h-4 mr-2" />
            RESULTADO DISPONÍVEL POR TEMPO LIMITADO
          </div>

          {/* Headline Principal - Mobile Optimized */}
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            🎯 <span className="text-orange-400">PARABÉNS!</span>
            <br />
            TU CASO TEM <span className="text-green-400">90,5%</span>
            <br />
            DE PROBABILIDADE DE ÉXITO
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto font-semibold">
            Baseado nas tuas respostas,{" "}
            <span className="text-orange-300 font-bold">{getPersonalizedPronoun()} ainda sente algo por ti</span> e
            podes recuperar a relação em apenas 21 dias.
          </p>

          {/* Resultado Visual Impactante */}
          <div className="max-w-md mx-auto mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 border-4 border-yellow-400 shadow-2xl">
              <CardContent className="p-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
                  <div className="relative z-10 w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-4 border-white mb-4">
                    <div className="text-center">
                      <span className="text-3xl font-extrabold text-black">90,5%</span>
                      <p className="text-xs font-bold text-black">COMPATÍVEL</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">O TEU DIAGNÓSTICO:</h3>
                <div className="text-left space-y-2 text-white">
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">
                      Tipo de rutura: <strong>Altamente recuperável</strong>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">
                      Tempo estimado: <strong>14-21 dias</strong>
                    </span>
                  </div>
                  <div className="flex items-start">
                    <Check className="w-5 h-5 text-yellow-300 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">
                      Estratégia recomendada: <strong>Plano A</strong>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Principal - Mobile Optimized */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="mb-6"
          >
            <Button
              onClick={handlePurchase}
              size="lg"
              className="w-full max-w-sm mx-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black py-6 px-8 rounded-full text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-yellow-400"
              onTouchStart={handleTouchFeedback}
            >
              <Heart className="w-6 h-6 mr-2" />
              RECUPERAR AGORA POR $9
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </motion.div>

          {/* Social Proof Dinâmico */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-4 text-sm text-white">
              <div className="flex items-center">
                <Users className="w-4 h-4 text-orange-400 mr-1" />
                <span>
                  <strong className="text-orange-400">{recentBuyers}</strong> pessoas compraram hoje
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-red-400 mr-1" />
                <span>
                  Expira em: <CountdownTimer minutes={15} seconds={0} />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SEÇÃO DE URGÊNCIA E ESCASSEZ */}
      <div className="px-4 py-8 bg-gradient-to-r from-red-900/30 to-orange-900/30">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-red-600 border-4 border-yellow-400 shadow-2xl">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">⚠️ ATENÇÃO: JANELA DE OPORTUNIDADE LIMITADA</h2>
              <p className="text-white text-lg mb-4">
                <strong>Apenas hoje</strong> tens acesso ao sistema completo por $9 (valor normal $97). Depois desta
                oferta, o preço volta ao normal e os bónus deixam de estar disponíveis.
              </p>
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-yellow-300 font-bold text-xl mb-2">A OFERTA EXPIRA EM:</p>
                <div className="text-3xl font-black text-white">
                  <CountdownTimer minutes={15} seconds={0} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* TRANSFORMAÇÃO ANTES/DEPOIS - MOBILE OPTIMIZED */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            A TUA VIDA EM <span className="text-red-400">21 DIAS</span>
          </h2>

          <div className="grid gap-6">
            {/* ANTES */}
            <Card className="bg-gradient-to-r from-red-900 to-red-800 border-2 border-red-500">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-red-300 mb-4 text-center">😢 AGORA (SEM O PLANO A)</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">✗</span>
                    </div>
                    <span className="text-red-100">Sofrendo com a dor da separação todos os dias</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">✗</span>
                    </div>
                    <span className="text-red-100">Tentando estratégias que só pioram a situação</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <span className="text-white font-bold">✗</span>
                    </div>
                    <span className="text-red-100">Vendo {getPersonalizedPronoun()} afastar-se cada vez mais</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* DEPOIS */}
            <Card className="bg-gradient-to-r from-green-600 to-emerald-600 border-2 border-green-400">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-green-100 mb-4 text-center">😍 EM 21 DIAS (COM O PLANO A)</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-800" />
                    </div>
                    <span className="text-green-100 font-semibold">
                      {getPersonalizedPronoun()} a responder às tuas mensagens com interesse
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-800" />
                    </div>
                    <span className="text-green-100 font-semibold">Vendo aquele brilho no olhar quando te vê</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                      <Check className="w-5 h-5 text-green-800" />
                    </div>
                    <span className="text-green-100 font-semibold">
                      Construindo uma relação ainda mais forte que antes
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Estratégico */}
          <div className="text-center mt-8">
            <Button
              onClick={handlePurchase}
              size="lg"
              className="w-full max-w-sm mx-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-5 px-6 rounded-full text-lg shadow-xl transition-all duration-300"
              onTouchStart={handleTouchFeedback}
            >
              QUERO ESTA TRANSFORMAÇÃO
              <Target className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* SOCIAL PROOF IMPACTANTE */}
      <div className="px-4 py-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-2">RESULTADOS COMPROVADOS</h2>
          <p className="text-orange-400 text-lg mb-8">Mais de 3.847 pessoas já recuperaram as suas relações</p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-orange-500">
              <div className="text-4xl font-bold text-orange-400 mb-2">87%</div>
              <p className="text-white">Veem resultados em 14 dias</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-orange-500">
              <div className="text-4xl font-bold text-orange-400 mb-2">3.847+</div>
              <p className="text-white">Relações recuperadas</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-orange-500">
              <div className="text-4xl font-bold text-orange-400 mb-2">21</div>
              <p className="text-white">Dias ou menos</p>
            </div>
          </div>

          {/* Testemunho Destacado */}
          <Card className="bg-white shadow-2xl max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img
                    src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/04-roberto.png"
                    alt="Cliente satisfeito"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">Carlos M., 34 anos</h4>
                  <div className="flex text-orange-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-lg font-semibold mb-3">
                "Ela tinha bloqueado o meu número e dizia que nunca mais queria me ver. Segui o Plano A exatamente como
                estava escrito e em 18 dias ela me ligou chorando pedindo para voltarmos. Hoje estamos noivos!"
              </p>
              <div className="text-sm text-green-600 font-bold">✅ Reconciliado há 8 meses</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* VÍDEO DEPOIMENTO - POSIÇÃO ESTRATÉGICA */}
      <div className="px-4 py-12 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🎥 <span className="text-yellow-400">VEJA O QUE DIZEM</span> OS NOSSOS CLIENTES
            </h2>
            <p className="text-xl text-gray-300 font-semibold">
              Depoimento real de quem recuperou a relação com o Plano A
            </p>
          </motion.div>

          <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border-4 border-yellow-400 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                {/* Vídeo Container */}
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=400&width=600"
                  >
                    <source
                      src="https://optimalhealthscout.shop/wp-content/uploads/2025/05/depoimento-plano-a.mp4"
                      type="video/mp4"
                    />
                    <track src="/captions.vtt" kind="subtitles" srcLang="pt" label="Português" />O teu navegador não
                    suporta vídeo HTML5.
                  </video>

                  {/* Play Button Overlay (opcional) */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all duration-300 cursor-pointer group">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </div>

                {/* Informações do Depoimento */}
                <div className="p-6 bg-gradient-to-r from-yellow-400 to-orange-500">
                  <div className="flex items-center justify-center gap-4 text-black">
                    <div className="text-center">
                      <h3 className="text-xl font-bold">Miguel R., 28 anos</h3>
                      <div className="flex justify-center text-black mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold">✅ RESULTADO:</p>
                      <p className="text-lg font-black">Reconciliado em 16 dias</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Pós-Vídeo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8"
          >
            <p className="text-white text-lg mb-4 font-semibold">
              "Obrigado pelas técnicas. Funcionaram mesmo!" - Miguel R.
            </p>
            <Button
              onClick={handlePurchase}
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black font-bold py-4 px-8 rounded-full text-lg shadow-xl transition-all duration-300 transform hover:scale-105"
              onTouchStart={handleTouchFeedback}
            >
              QUERO OS MESMOS RESULTADOS
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* OFERTA PRINCIPAL - MOBILE OPTIMIZED */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-2xl border-4 border-yellow-400">
            <CardContent className="p-8 text-center">
              <div className="bg-yellow-400 text-black font-bold py-3 px-6 rounded-full inline-block mb-6 text-lg">
                🔥 OFERTA ESPECIAL - APENAS HOJE
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-6">PLANO A - RECUPERAÇÃO RÁPIDA</h2>

              <p className="text-xl mb-8 font-semibold">Sistema Completo + 2 Bónus Exclusivos</p>

              {/* Produtos Incluídos */}
              <div className="bg-white/20 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-2xl font-bold text-yellow-300 mb-6 text-center">O QUE RECEBES HOJE:</h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">PLANO A: Sistema Completo</h4>
                      <p className="text-gray-200 mb-2">
                        4 módulos com estratégias passo-a-passo para qualquer tipo de rutura
                      </p>
                      <div className="flex items-center">
                        <span className="text-gray-300 line-through mr-2 text-lg">$97</span>
                        <span className="text-yellow-300 font-bold text-xl">$9</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <Gift className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">BÓNUS #1: 21 Gatilhos Emocionais</h4>
                      <p className="text-gray-200 mb-2">Frases exatas que despertam sentimentos profundos</p>
                      <div className="flex items-center">
                        <span className="text-gray-300 line-through mr-2 text-lg">$47</span>
                        <span className="text-green-400 font-bold text-xl">GRÁTIS</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">BÓNUS #2: Protocolo de Emergência</h4>
                      <p className="text-gray-200 mb-2">Guia para situações críticas nas primeiras 72 horas</p>
                      <div className="flex items-center">
                        <span className="text-gray-300 line-through mr-2 text-lg">$37</span>
                        <span className="text-green-400 font-bold text-xl">GRÁTIS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resumo da Oferta */}
              <div className="bg-black/30 p-6 rounded-lg mb-8">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <h4 className="font-bold text-yellow-300 mb-2">VALOR TOTAL:</h4>
                    <div className="text-3xl font-bold">
                      <span className="line-through text-gray-400">$181</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-300 mb-2">HOJE APENAS:</h4>
                    <div className="text-3xl font-bold text-yellow-300">$9</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-green-400 font-bold text-xl">POUPAS $172!</p>
                </div>
              </div>

              {/* CTA Principal Gigante */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="mb-6"
              >
                <Button
                  onClick={handlePurchase}
                  size="lg"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-black py-6 px-8 rounded-full text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-white"
                  onTouchStart={handleTouchFeedback}
                >
                  💕 RECUPERAR AGORA POR $9
                  <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
              </motion.div>

              <div className="flex justify-center gap-4 text-sm text-white flex-wrap mb-4">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-1" />
                  <span>Acesso imediato</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-1" />
                  <span>Garantia 30 dias</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-400 mr-1" />
                  <span>Suporte incluído</span>
                </div>
              </div>

              {recentBuyers > 0 && (
                <div className="bg-red-500 text-white py-3 px-6 rounded-full inline-block font-bold">
                  🔥 {recentBuyers} pessoas compraram nas últimas 2 horas!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* GARANTIA */}
      <div className="px-4 py-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-green-50 border-4 border-green-400 shadow-2xl">
            <CardContent className="p-8 text-center">
              <Shield className="w-20 h-20 text-green-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-green-800 mb-4">GARANTIA TOTAL DE 30 DIAS</h2>
              <p className="text-green-700 text-xl font-semibold mb-4">
                Se não vires resultados, devolvemos 100% do teu dinheiro
              </p>
              <p className="text-green-600 max-w-2xl mx-auto">
                Estamos tão confiantes que este método vai funcionar para ti que oferecemos uma garantia completa. Se
                seguires o plano durante 30 dias e não vires resultados, devolvemos todo o teu dinheiro sem perguntas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ ESSENCIAL - MOBILE OPTIMIZED */}
      <div className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">PERGUNTAS FREQUENTES</h2>

          <div className="space-y-4">
            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-orange-400 mb-3">
                  E se {getPersonalizedPronoun()} já estiver com outra pessoa?
                </h3>
                <p className="text-gray-300">
                  O método funciona mesmo quando há terceiros envolvidos. 67% dos nossos casos de sucesso começaram
                  exatamente nesta situação. O Módulo 3 ensina estratégias específicas para estes casos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-orange-400 mb-3">Quanto tempo demora a ver resultados?</h3>
                <p className="text-gray-300">
                  87% dos utilizadores veem as primeiras mudanças positivas em menos de 14 dias. O sistema completo está
                  desenhado para funcionar em 21 dias, mas muitos conseguem resultados mais rápidos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border border-gray-700">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-orange-400 mb-3">Como recebo o acesso?</h3>
                <p className="text-gray-300">
                  Imediatamente após a confirmação do pagamento, recebes um email com as tuas credenciais de acesso.
                  Todo o conteúdo fica disponível na hora, incluindo os bónus.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA FINAL URGENTE */}
      <div className="px-4 py-8 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border-4 border-yellow-400">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">⏰ ÚLTIMA OPORTUNIDADE</h2>
            <p className="text-xl text-white mb-6 font-semibold">
              Esta oferta expira em poucos minutos. Depois disto, o preço volta aos $97 normais.
            </p>

            <div className="bg-red-800 p-4 rounded-lg mb-6">
              <p className="text-yellow-300 font-bold text-lg mb-2">TEMPO RESTANTE:</p>
              <div className="text-4xl font-black text-white">
                <CountdownTimer minutes={15} seconds={0} />
              </div>
            </div>

            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Button
                onClick={handlePurchase}
                size="lg"
                className="w-full max-w-md mx-auto bg-yellow-500 hover:bg-yellow-600 text-black font-black py-6 px-8 rounded-full text-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 border-4 border-white"
                onTouchStart={handleTouchFeedback}
              >
                💕 SIM, QUERO RECUPERAR AGORA!
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </motion.div>

            <p className="text-yellow-300 text-sm mt-4 font-semibold">Clica agora antes que seja tarde demais</p>
          </div>
        </div>
      </div>

      {/* Estilos CSS Mobile-First */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .timeline-card {
            margin-left: 0 !important;
            margin-right: 0 !important;
            width: 100% !important;
          }
          
          .product-image {
            max-height: 200px;
            object-fit: contain;
          }
          
          .testimonial-grid {
            grid-template-columns: 1fr !important;
          }

          /* Otimizações específicas para mobile */
          button {
            min-height: 44px !important;
            touch-action: manipulation;
          }

          .text-3xl {
            font-size: 1.875rem !important;
            line-height: 2.25rem !important;
          }

          .text-4xl {
            font-size: 2.25rem !important;
            line-height: 2.5rem !important;
          }

          /* Melhor legibilidade em mobile */
          p {
            line-height: 1.6 !important;
          }

          /* CTAs mais visíveis em mobile */
          .bg-gradient-to-r {
            background-attachment: fixed;
          }
        }

        /* Animações otimizadas para mobile */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Estilos específicos para o vídeo */
        video {
          border-radius: 8px;
        }

        video::-webkit-media-controls-panel {
          background-color: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  )
}
