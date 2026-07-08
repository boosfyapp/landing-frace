export const LINKS = {
  calendly: 'https://calendly.com/fracesolutions/reunion',
  whatsapp: 'https://wa.me/5213411580175',
  waStarter: 'https://wa.me/5213411580175?text=Hola%2C%20quiero%20contratar%20el%20Plan%20Starter',
  waPro: 'https://wa.me/5213411580175?text=Hola%2C%20quiero%20contratar%20el%20Plan%20PRO',
  waUltimate: 'https://wa.me/5213411580175?text=Hola%2C%20quiero%20contratar%20el%20Plan%20Ultimate',
  waLifetime: 'https://wa.me/5213411580175?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20Plan%20Lifetime',
  mpStarter: 'https://mpago.li/2ELwWJC',
  mpPro: 'https://mpago.li/1ta547h',
  mpUltimate: 'https://mpago.li/28iN2xz',
  website: 'https://fracesolutions.com',
  legal: '#',
  privacy: '#',
  terms: '#',
} as const

export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    desc: 'Plan de entrada ideal para empezar a automatizar.',
    setup: 2499,
    monthly: 399,
    badge: null,
    featured: false,
    cta: 'Elegir Starter →',
    link: LINKS.waStarter,
    features: [
      'Asistente IA personalizado',
      'Agenda citas',
      '1 usuario',
      '1 canal de WhatsApp',
      'Acceso a Boosfy CRM',
      'Soporte humano + IA 24/7',
      'Activación en menos de 24h',
    ],
  },
  {
    id: 'pro',
    name: 'PRO',
    desc: 'El plan más completo para negocios en crecimiento.',
    setup: 4497,
    monthly: 499,
    badge: 'Más solicitado',
    featured: true,
    cta: 'Comenzar ahora →',
    link: LINKS.waPro,
    features: [
      'Asistente IA personalizado',
      'Agenda citas automáticamente',
      '3 usuarios',
      '3 Canales (WA, FB & IG)',
      'Acceso a Boosfy CRM',
      'Soporte humano + IA 24/7',
      'Activación en menos de 24h',
    ],
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    desc: 'Para empresas que necesitan más poder y automatización.',
    setup: 7479,
    monthly: 499,
    badge: null,
    featured: false,
    cta: 'Elegir Ultimate →',
    link: LINKS.waUltimate,
    features: [
      'Todo lo del PRO',
      'Imágenes, docs, videos y audios',
      '2 recordatorios automáticos',
      '2 notificaciones internas',
      '5 usuarios y 5 canales',
      '2 integraciones externas',
      'Reactivación de chats',
      'Activación en menos de 24h',
    ],
  },
] as const

export const LIFETIME_PLAN = {
  id: 'lifetime',
  name: 'Lifetime',
  badge: 'Pago único',
  cta: 'Consultar Lifetime →',
  link: LINKS.waLifetime,
  desc: 'Para negocios que quieren una implementación avanzada, sin mensualidades y con una solución más completa.',
  features: [
    'Todo lo del Ultimate',
    '3 recordatorios automáticos',
    'Notificaciones para 3 números',
    'Integraciones ilimitadas',
    'Sin mensualidades',
    '10 canales y 10 usuarios',
    'Soporte premium por 1 año',
  ],
} as const

export const METRICS = [
  {
    value: 400,
    suffix: '%',
    label: 'Más velocidad de respuesta',
    desc: 'vs atención manual',
  },
  {
    value: 55,
    suffix: '%',
    label: 'Más ventas cerradas',
    desc: 'promedio entre clientes activos',
  },
  {
    value: 83,
    suffix: '%',
    label: 'Menos carga operativa',
    desc: 'tiempo liberado por automatización',
  },
  {
    value: 500,
    suffix: '+',
    label: 'Clientes activos',
    desc: 'PyMEs mexicanas ya automatizadas',
  },
] as const

export const FEATURES = [
  {
    icon: 'MessageSquare',
    title: 'Chat multiagente',
    desc: 'Múltiples agentes atendiendo desde un solo número WhatsApp al mismo tiempo.',
    color: 'cyan',
  },
  {
    icon: 'LayoutDashboard',
    title: 'CRM Pipeline',
    desc: 'Visualiza todo tu embudo de ventas en un tablero Kanban intuitivo.',
    color: 'purple',
  },
  {
    icon: 'Bot',
    title: 'Asistente IA',
    desc: 'Responde preguntas, califica leads y agenda citas en automático 24/7.',
    color: 'cyan',
  },
  {
    icon: 'QrCode',
    title: 'WhatsApp QR',
    desc: 'Conecta tu número escaneando un QR. Sin trámites ni aprobación de Meta.',
    color: 'green',
  },
  {
    icon: 'Send',
    title: 'Envíos masivos',
    desc: 'Manda promociones, recordatorios y noticias a toda tu base de contactos.',
    color: 'purple',
  },
  {
    icon: 'CalendarCheck',
    title: 'Google Calendar / Calendly',
    desc: 'Agenda citas directamente en WhatsApp sin intervención humana.',
    color: 'cyan',
  },
  {
    icon: 'RefreshCw',
    title: 'Reactivación de chats',
    desc: 'Reactiva contactos fríos con secuencias automáticas de mensajes.',
    color: 'green',
  },
  {
    icon: 'Bell',
    title: 'Recordatorios automáticos',
    desc: 'Envía recordatorios de citas y pagos sin levantar un dedo.',
    color: 'purple',
  },
  {
    icon: 'Webhook',
    title: 'API y Webhooks',
    desc: 'Conecta con tus herramientas actuales via integraciones nativas.',
    color: 'cyan',
  },
] as const

export const STEPS = [
  {
    n: '01',
    title: 'Agenda tu demo de 15 min',
    desc: 'Mostramos cómo funciona para tu negocio específico, sin compromisos.',
  },
  {
    n: '02',
    title: 'Personalizamos tu asistente IA',
    desc: 'Configuramos respuestas, flujos y el tono de comunicación de tu marca.',
  },
  {
    n: '03',
    title: 'Conectas tu WhatsApp',
    desc: 'Escaneas un QR o activamos tu WhatsApp Business API en minutos.',
  },
  {
    n: '04',
    title: 'Tu equipo empieza a usar el CRM',
    desc: 'Panel intuitivo listo desde el primer día. Sin curva de aprendizaje.',
  },
  {
    n: '05',
    title: 'Listo en menos de 24 horas',
    desc: 'Comenzamos a atender a tus clientes el mismo día de la activación.',
  },
] as const

export const TESTIMONIALS = [
  {
    name: 'Christian González',
    role: 'Director',
    company: 'CAD Inmobiliaria',
    text: 'Antes tardábamos horas en responder leads. Ahora el sistema responde en segundos y cerramos propiedades que antes se habrían enfriado. El ROI fue inmediato.',
    avatar: 'CG',
    color: 'cyan',
  },
  {
    name: 'Ceci Montaño',
    role: 'Directora Comercial',
    company: 'Centro Médico de Occidente',
    text: 'Redujimos las ausencias a citas en un 60%. El recordatorio automático es una maravilla. Mis pacientes siempre llegan y el equipo dejó de hacer llamadas manuales.',
    avatar: 'CM',
    color: 'purple',
  },
  {
    name: 'Daniel García',
    role: 'Gerente de Ventas',
    company: 'Axon',
    text: 'Con los envíos masivos reactivamos contactos que teníamos olvidados. En un fin de semana generamos ventas extra que jamás habríamos logrado de forma manual.',
    avatar: 'DG',
    color: 'green',
  },
] as const

export const FAQS = [
  {
    q: '¿Cuántos usuarios o agentes incluye cada plan?',
    a: 'El plan Starter incluye 3 usuarios, el PRO incluye 5 usuarios y el Ultimate incluye hasta 10 usuarios. Todos acceden al mismo número de WhatsApp de forma simultánea desde el CRM Boosfy.',
  },
  {
    q: '¿Puedo acceder a una demo antes de contratar?',
    a: 'Sí, ofrecemos una demo gratuita de 15 minutos donde mostramos el sistema funcionando en vivo. Puedes agendarla directamente en el botón "Agendar demo" de esta página.',
  },
  {
    q: '¿Qué es Kanban y cómo me ayuda en ventas?',
    a: 'Kanban es un tablero visual donde organizas tus prospectos por etapas: Nuevo, Contactado, Propuesta, Cerrado. Te da visibilidad total de tu embudo de ventas y evita que los leads se pierdan.',
  },
  {
    q: '¿Qué es Boosfy exactamente?',
    a: 'Boosfy es nuestro CRM especializado para WhatsApp. Incluye chat multiagente, pipeline de ventas, asistente IA, envíos masivos, recordatorios y más. Lo incluimos en todos nuestros planes.',
  },
  {
    q: '¿Cómo garantizan el plan Ultimate de por vida?',
    a: 'El plan Ultimate tiene un pago único que cubre la licencia del software sin mensualidades recurrentes. El acceso es indefinido mientras el plan esté disponible. Incluye soporte premium por 1 año completo.',
  },
  {
    q: '¿Perderé mi número de WhatsApp al conectarlo?',
    a: 'No. Tu número actual de WhatsApp se mantiene igual. Lo conectamos al sistema escaneando un QR o via API oficial. Tus conversaciones previas y contactos permanecen intactos.',
  },
] as const
