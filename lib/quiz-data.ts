// === VERIFICAÇÃO DE AMBIENTE ===
const isClient = typeof window !== 'undefined';

// === FUNÇÕES DE PERSONALIZAÇÃO ===
function getUserAnswer(questionId) {
  if (!isClient) return '';
  const answers = window.quizAnswers || {};
  return answers[questionId] || '';
}

function getUserGender() {
  if (!isClient) return 'MASCULINO';
  return getUserAnswer('question1') || 'MASCULINO';
}

// 1. FUNÇÃO PARA PRIMEIRO INSIGHT PERSONALIZADO
function getPersonalizedFirstInsight() {
  if (!isClient) {
    return "❌ ERROR DETECTADO: Carregando análise personalizada...";
  }
  
  const currentSituation = getUserAnswer('question7');
  const timeApart = getUserAnswer('question3');
  const whoEnded = getUserAnswer('question4');
  
  // Resto da lógica permanece igual...
  if (currentSituation.includes("contacto cero")) {
    return "❌ ERROR DETECTADO: Estás aplicando contacto cero de forma INCORRECTA. El 73% de los hombres cometen este error que los aleja definitivamente de su ex.";
  }
  
  if (currentSituation.includes("me ignora")) {
    return "❌ ERROR DETECTADO: Estás siendo IGNORADO porque usas las palabras EQUIVOCADAS. Hay 3 tipos de mensajes que rompen el muro del silencio.";
  }
  
  if (currentSituation.includes("bloqueado")) {
    return "❌ ERROR DETECTADO: Fuiste BLOQUEADO porque ella siente PRESIÓN. Existe una técnica específica para casos de bloqueo que funciona en 9 de cada 10 veces.";
  }
  
  if (currentSituation.includes("cosas necesarias")) {
    return "❌ ERROR DETECTADO: El contacto 'solo por necesidad' está MATANDO tu atractivo. Cada mensaje aburrido te aleja más de la reconquista.";
  }
  
  if (currentSituation.includes("charlamos")) {
    return "❌ ERROR DETECTADO: Charlar 'como amigos' es la TRAMPA más peligrosa. Estás en la zona de confort que te mantiene lejos de su corazón.";
  }
  
  if (currentSituation.includes("amigos")) {
    return "❌ ERROR DETECTADO: Ser 'solo amigos' es el LIMBO emocional. El 89% que se queda aquí nunca sale de esta zona.";
  }
  
  if (whoEnded.includes("terminó conmigo")) {
    return "❌ ERROR DETECTADO: Después de que TE DEJARAN, tu estrategia actual está creando más RESISTENCIA. El 84% cometen este error psicológico.";
  }
  
  return "❌ ERROR DETECTADO: Tu estrategia actual está generando el EFECTO CONTRARIO al que buscas. Hay un patrón específico que debes romper.";
}

// 2. FUNÇÃO PARA TÉCNICA PERSONALIZADA
function getPersonalizedTechnique() {
  if (!isClient) {
    return "🎯 TU TÉCNICA: Carregando estratégia personalizada...";
  }
  
  const currentSituation = getUserAnswer('question7');
  const timeApart = getUserAnswer('question3');
  const withSomeoneElse = getUserAnswer('question8');
  const gender = getUserGender();
  const pronoun = gender === "MASCULINO" ? "ella" : "él";
  const pronounCap = gender === "MASCULINO" ? "Ella" : "Él";
  
  // Resto da lógica permanece igual...
  if (currentSituation.includes("contacto cero")) {
    return `🎯 TU TÉCNICA: "RUPTURA DEL SILENCIO MAGNÉTICO"
    
Tu situación: Contacto cero + ${timeApart}

PASO 1: Envía exactamente este mensaje en 48h:
"Hey [nombre], encontré algo que te pertenece. ¿Cuándo puedes pasar a recogerlo?"

PASO 2: Cuando responda (lo hará en 67% de los casos):
"Perfecto, déjalo en [lugar específico]. No necesitamos vernos."

¿Por qué funciona? Crea CURIOSIDAD sin presión. El cerebro femenino no puede resistir el misterio.`;
  }
  
  // Continue com o resto das condições...
  // [Resto do código da função original]
  
  return `🎯 TU TÉCNICA: "REACTIVACIÓN EMOCIONAL"
    
Para tu situación específica: ${currentSituation}

MENSAJE ESPECÍFICO:
"Vi [algo específico] y recordé cuando [memoria positiva compartida]. Espero que estés bien."

Envía solo esto. No esperes respuesta inmediata.

¿Por qué funciona? Reactiva conexión emocional sin presión ni demandas.`;
}

// 3. FUNÇÃO PARA DEPOIMENTO PERSONALIZADO  
function getPersonalizedTestimonial() {
  if (!isClient) {
    return {
      name: "Carregando...",
      text: "Carregando depoimento personalizado...",
      image: "https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png"
    };
  }
  
  const currentSituation = getUserAnswer('question7');
  
  // Resto da lógica permanece igual...
  if (currentSituation.includes("contacto cero")) {
    return {
      name: "Miguel R., 29 años",
      text: "Estaba en contacto cero hace 2 meses. Apliqué la técnica exacta y a los 4 días me escribió preguntando cómo estaba. ¡Ahora vivimos juntos otra vez!",
      image: "https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png"
    };
  }
  
  // [Continue com o resto das condições...]
  
  return {
    name: "Fernando L., 28 años",
    text: "Mi situación parecía imposible. El plan personalizado me guió paso a paso y en 3 semanas estábamos de vuelta. ¡Gracias!",
    image: "https://comprarplanseguro.shop/wp-content/uploads/2025/08/Captura-de-Tela-2025-08-08-as-19.01.05.png"
  };
}

// 4. FUNÇÃO PARA PLANO DE 7 DIAS PERSONALIZADO
function getPersonalized7DayPlan() {
  if (!isClient) {
    return "📋 TU PLAN PERSONALIZADO - Carregando estratégia...";
  }
  
  const gender = getUserGender();
  const timeApart = getUserAnswer('question3');
  const currentSituation = getUserAnswer('question7');
  const withSomeoneElse = getUserAnswer('question8');
  const whoEnded = getUserAnswer('question4');
  
  const pronoun = gender === "MASCULINO" ? "ella" : "él";
  const pronounCap = gender === "MASCULINO" ? "Ella" : "Él";
  
  return `📋 TU PLAN PERSONALIZADO - PRIMEROS 7 DÍAS:

**DÍA 1-2: FASE DE PREPARACIÓN**
→ Elimina todos los comportamientos de "necesidad" detectados en tu perfil
→ Aplica la técnica específica que acabas de ver para tu situación: ${currentSituation}
→ Prepara tu mentalidad con el "Protocolo de Confianza"

**DÍA 3-4: PRIMERA CONEXIÓN**  
→ Envía el mensaje específico diseñado para tu caso
→ Aplica la "Regla de las 72 horas" (CRUCIAL - no quebrar)
→ Si responde: usa el "Guión de Curiosidad" (scripts incluidos)

**DÍA 5-7: CONSTRUCCIÓN DE INTERÉS**
→ Técnica del "Valor Implícito" adaptada a tu tiempo de separación: ${timeApart}
→ ${withSomeoneElse && withSomeoneElse.includes('No') ? 'Protocolo de reconexión directa (campo libre)' : 'Estrategia de diferenciación (caso con terceros)'}
→ Preparación para la "Fase de Encuentro" ${whoEnded.includes('terminó conmigo') ? '- Protocolo Especial para casos donde TE DEJARON' : ''}

⚠️ IMPORTANTE: Estos son solo los PRIMEROS 7 pasos del Plan A completo.

Los próximos 14 pasos incluyen:
→ Scripts exactos para cada respuesta posible de ${pronoun}
→ Técnicas de encuentro presencial específicas para tu perfil
→ Protocolo de reconciliación definitiva (Fase Final)
→ Plan B de emergencia si algo sale mal`;
}

// === QUIZ STEPS - DADOS ESTÁTICOS ===
export const quizSteps = [
  // [Seu array de quizSteps permanece exatamente igual]
  {
    id: 1,
    question: "¡NO DEJES QUE LA PERSONA QUE AMAS SALGA DE TU VIDA PARA SIEMPRE!",
    description: "INICIANDO ANÁLISIS PSICOLÓGICO - Para revelar si ella aún siente algo por ti, necesito mapear tu perfil emocional específico.",
    // ... resto igual
  },
  // ... todas as outras questões permanecem iguais
];

// === EXPORTS DAS FUNÇÕES ===
export {
  getPersonalizedFirstInsight,
  getPersonalizedTechnique,
  getPersonalizedTestimonial,
  getPersonalized7DayPlan,
  getUserAnswer,
  getUserGender,
  getPersonalizedContent
};

// === RESTO DOS EXPORTS PERMANECEM IGUAIS ===
export const bonuses = [
  // [Seu array permanece igual]
];

export const testimonials = [
  // [Seu array permanece igual]  
];

export const socialProofMessages = [
  // [Seu array permanece igual]
];

// Função utilitaria permanece igual
export function getPersonalizedContent(content, gender) {
  if (typeof content === "string") {
    return content
  }

  if (typeof content === "object" && content !== null) {
    if (content.masculino && content.feminino) {
      return gender === "MASCULINO" ? content.masculino : content.feminino
    }
    return content
  }

  return content
}
