import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es';

interface Translations {
  hero: { title: string; subtitle: string; };
  nav: { home: string; about: string; contact: string; privacy: string; terms: string; };
  gen: { 
    tab_title: string; input_label: string; qty: string; month: string; year: string; random: string;
    btn_generate: string; results: string; copied: string; bin_required: string;
    send_checker: string; send_stripe: string; placeholder: string; analyzing: string; waiting: string;
  };
  check: { 
    tab_title: string; tab_stripe: string; input_label: string; btn_start: string; 
    live_label: string; die_label: string; unknown_label: string; 
    clear: string; copy_all: string; copy_live: string; status_ready: string; status_processing: string;
  };
  features: {
    ai_title: string; ai_desc: string;
    luhn_title: string; luhn_desc: string;
    lock_title: string; lock_desc: string;
  };
  assistant: {
    hello: string;
    ask: string;
    btn_gen: string;
    btn_val: string;
  };
  footer: { 
    desc: string; rights: string; section_tool: string; section_legal: string; 
    newsletter_title: string; status_online: string;
  };
  legal: {
    about_t: string; about_content: string; mission: string; mission_content: string; vision: string; vision_content: string;
    privacy_t: string; privacy_intro: string; privacy_cookies_t: string; privacy_cookies_desc: string; privacy_data_t: string; privacy_data_desc: string; privacy_ads_t: string; privacy_ads_desc: string;
    terms_t: string; terms_intro: string; terms_conduct_t: string; terms_conduct_desc: string; terms_disclaimer_t: string; terms_disclaimer_desc: string;
    contact_t: string; contact_desc: string; contact_success: string; contact_btn: string;
  };
  cookie_banner: { text: string; btn_accept: string; };
}

const translations: Record<Language, Translations> = {
  pt: {
    hero: { title: 'GenMozPro', subtitle: 'A suíte líder em auditoria de BIN e validação de gateways de pagamento para desenvolvedores.' },
    nav: { home: 'Início', about: 'Sobre Nós', contact: 'Contato', privacy: 'Privacidade', terms: 'Termos de Uso' },
    gen: { 
      tab_title: 'Gerador de BIN', input_label: 'Prefixo BIN (6-8 dígitos)', qty: 'Quantidade', month: 'Mês', year: 'Ano', random: 'Aleatório', 
      btn_generate: 'Gerar Cartões de Teste', results: 'Painel de Auditoria', copied: 'Copiado!', 
      bin_required: 'BIN de 6 dígitos obrigatória', send_checker: 'Mover para Checker', send_stripe: 'Mover para Stripe',
      placeholder: 'Aguardando BIN...', analyzing: 'Consultando base de dados IA...', waiting: 'SISTEMA PRONTO'
    },
    check: { 
      tab_title: 'Validador Live', tab_stripe: 'Stripe Tester', input_label: 'Lista de Teste', btn_start: 'Validar Agora', 
      live_label: 'LIVE / APROVADO', die_label: 'DIE / REJEITADO', unknown_label: 'ERRO / DESCONHECIDO', 
      clear: 'Limpar', copy_all: 'Copiar Tudo', copy_live: 'Copiar Lives', status_ready: 'Aguardando lista...', status_processing: 'Auditando...'
    },
    features: {
      ai_title: 'Auditoria com IA', ai_desc: 'Identificação instantânea de banco emissor, país e nível do cartão através de algoritmos de deep learning.',
      luhn_title: 'Validador Luhn', luhn_desc: 'Verificação matemática rigorosa para garantir que os números gerados sigam os padrões da ISO/IEC 7812.',
      // Fix: changed duplicate property name 'luhn_desc' to 'lock_desc'
      lock_title: 'Privacidade Local', lock_desc: 'Todo o processamento ocorre no seu navegador. Nenhum dado de teste é enviado para nossos servidores.'
    },
    assistant: {
      hello: 'Assistente GenMozPro',
      ask: 'Como posso ajudar no seu processo de QA hoje?',
      btn_gen: 'Novo Lote',
      btn_val: 'Validar Lista'
    },
    footer: { 
      desc: 'GenMozPro é uma ferramenta educacional voltada para análise de segurança em sistemas de pagamento e fluxos de checkout.', 
      rights: '© 2025 GenMozPro. Todos os direitos reservados. Uso exclusivo para testes de software.', 
      section_tool: 'Funcionalidades', section_legal: 'Informações Legais', newsletter_title: 'Assine nossa Newsletter', status_online: 'Servidor: Operacional'
    },
    legal: {
      about_t: 'Sobre o Projeto GenMozPro',
      about_content: 'O GenMozPro é uma plataforma de tecnologia financeira desenvolvida para simplificar a vida de especialistas em Garantia de Qualidade (QA) e desenvolvedores de software. Nossa ferramenta utiliza algoritmos avançados e inteligência artificial para simular números de cartões de crédito baseados em prefixos BIN reais, permitindo que empresas testem seus sistemas de proteção contra fraudes e gateways de pagamento sem a necessidade de usar dados reais de clientes.',
      mission: 'Nossa Missão',
      mission_content: 'Democratizar o acesso a ferramentas de testes de alta performance, garantindo a integridade dos sistemas financeiros globais através de simulações seguras.',
      vision: 'Nossa Visão',
      vision_content: 'Tornar-se o padrão ouro em auditoria de BINs e ferramentas de suporte ao desenvolvimento de e-commerce.',
      privacy_t: 'Política de Privacidade e Cookies',
      privacy_intro: 'No GenMozPro, levamos a sério a sua privacidade. Esta política descreve como tratamos as informações e o uso de tecnologias de rastreamento em conformidade com a LGPD e o GDPR.',
      privacy_cookies_t: 'Uso de Cookies',
      privacy_cookies_desc: 'Utilizamos cookies para melhorar sua navegação e lembrar suas preferências de idioma. Cookies são pequenos arquivos salvos no seu dispositivo que nos ajudam a entender como você interage com o site.',
      privacy_data_t: 'Segurança de Dados',
      privacy_data_desc: 'Importante: O GenMozPro NÃO armazena os números de cartões que você gera ou valida. Todo o processamento é feito localmente no seu navegador (Client-Side), garantindo que seus dados de teste nunca cheguem aos nossos servidores.',
      privacy_ads_t: 'Publicidade de Terceiros (Google AdSense)',
      privacy_ads_desc: 'O Google, como fornecedor terceirizado, utiliza cookies para exibir anúncios neste site. O uso do cookie DART pelo Google permite que ele exiba anúncios para você com base na sua visita a este e outros sites na Internet.',
      terms_t: 'Termos e Condições de Uso',
      terms_intro: 'Ao acessar o site GenMozPro, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.',
      terms_conduct_t: 'Conduta do Usuário',
      terms_conduct_desc: 'As ferramentas aqui disponibilizadas são para fins estritamente educacionais e de teste de sistemas próprios. É expressamente proibido o uso das informações geradas para qualquer transação financeira real ou atividades fraudulentas.',
      terms_disclaimer_t: 'Isenção de Responsabilidade',
      terms_disclaimer_desc: 'O GenMozPro não se responsabiliza por quaisquer danos resultantes do uso indevido das ferramentas. Não garantimos que os cartões gerados funcionarão em todos os gateways, pois o propósito é o teste de lógica e não a fraude.',
      contact_t: 'Suporte e Parcerias',
      contact_desc: 'Tem alguma dúvida técnica ou proposta de parceria? Entre em contato com nossa equipe de suporte dedicada.',
      contact_success: 'Mensagem enviada com sucesso! Responderemos em breve.',
      contact_btn: 'Enviar Solicitação'
    },
    cookie_banner: { text: 'Este site utiliza cookies do Google para anúncios e análise de tráfego. Ao continuar, você aceita nossa política.', btn_accept: 'CONCORDAR E FECHAR' }
  },
  en: {
    hero: { title: 'GenMozPro', subtitle: 'The leading BIN audit and payment gateway validation suite for developers.' },
    nav: { home: 'Home', about: 'About Us', contact: 'Contact', privacy: 'Privacy Policy', terms: 'Terms of Use' },
    gen: { 
      tab_title: 'BIN Generator', input_label: 'BIN Prefix (6-8 digits)', qty: 'Quantity', month: 'Month', year: 'Year', random: 'Random', 
      btn_generate: 'Generate Test Cards', results: 'Audit Panel', copied: 'Copied!', 
      bin_required: '6-digit BIN required', send_checker: 'Move to Checker', send_stripe: 'Move to Stripe',
      placeholder: 'Waiting for BIN...', analyzing: 'Querying AI database...', waiting: 'SYSTEM READY'
    },
    check: { 
      tab_title: 'Live Checker', tab_stripe: 'Stripe Tester', input_label: 'Test List', btn_start: 'Validate Now', 
      live_label: 'LIVE / APPROVED', die_label: 'DIE / REJECTED', unknown_label: 'ERROR / UNKNOWN', 
      clear: 'Clear', copy_all: 'Copy All', copy_live: 'Copy Lives', status_ready: 'Awaiting list...', status_processing: 'Auditing...'
    },
    features: {
      ai_title: 'AI BIN Audit', ai_desc: 'Instant identification of issuing bank, country, and card level using deep learning algorithms.',
      luhn_title: 'Luhn Validator', luhn_desc: 'Strict mathematical verification ensuring generated numbers follow ISO/IEC 7812 standards.',
      lock_title: 'Local Privacy', lock_desc: 'All processing happens in your browser. No test data is ever sent to our servers.'
    },
    assistant: {
      hello: 'GenMozPro Assistant',
      ask: 'How can I assist your QA process today?',
      btn_gen: 'New Batch',
      btn_val: 'Validate List'
    },
    footer: { 
      desc: 'GenMozPro is an educational tool focused on security analysis in payment systems and checkout flows.', 
      rights: '© 2025 GenMozPro. All rights reserved. For software testing purposes only.', 
      section_tool: 'Features', section_legal: 'Legal Information', newsletter_title: 'Subscribe to Newsletter', status_online: 'Server: Operational'
    },
    legal: {
      about_t: 'About GenMozPro Project',
      about_content: 'GenMozPro is a financial technology platform developed to simplify the lives of Quality Assurance (QA) specialists and software developers. Our tool uses advanced algorithms and artificial intelligence to simulate credit card numbers based on real BIN prefixes, allowing companies to test their fraud protection systems and payment gateways without needing to use real customer data.',
      mission: 'Our Mission',
      mission_content: 'To democratize access to high-performance testing tools, ensuring the integrity of global financial systems through secure simulations.',
      vision: 'Our Vision',
      vision_content: 'To become the gold standard in BIN auditing and e-commerce development support tools.',
      privacy_t: 'Privacy Policy and Cookies',
      privacy_intro: 'At GenMozPro, we take your privacy seriously. This policy describes how we handle information and the use of tracking technologies in compliance with GDPR.',
      privacy_cookies_t: 'Use of Cookies',
      privacy_cookies_desc: 'We use cookies to improve your navigation and remember your language preferences. Cookies are small files saved on your device that help us understand how you interact with the site.',
      privacy_data_t: 'Data Security',
      privacy_data_desc: 'Important: GenMozPro DOES NOT store the card numbers you generate or validate. All processing is done locally in your browser (Client-Side), ensuring your test data never reaches our servers.',
      privacy_ads_t: 'Third-Party Advertising (Google AdSense)',
      privacy_ads_desc: 'Google, as a third-party vendor, uses cookies to serve ads on this site. Google\'s use of the DART cookie enables it to serve ads to you based on your visit to this and other sites on the Internet.',
      terms_t: 'Terms and Conditions of Use',
      terms_intro: 'By accessing the GenMozPro website, you agree to comply with these terms of service, all applicable laws and regulations.',
      terms_conduct_t: 'User Conduct',
      terms_conduct_desc: 'The tools provided here are strictly for educational and self-system testing purposes. It is expressly prohibited to use the generated information for any real financial transaction or fraudulent activities.',
      terms_disclaimer_t: 'Disclaimer',
      terms_disclaimer_desc: 'GenMozPro is not responsible for any damage resulting from the misuse of the tools. We do not guarantee that generated cards will work in all gateways, as the purpose is logic testing and not fraud.',
      contact_t: 'Support and Partnerships',
      contact_desc: 'Have a technical question or partnership proposal? Get in touch with our dedicated support team.',
      contact_success: 'Message sent successfully! We will respond shortly.',
      contact_btn: 'Send Request'
    },
    cookie_banner: { text: 'This site uses Google cookies for ads and traffic analysis. By continuing, you accept our policy.', btn_accept: 'AGREE AND CLOSE' }
  },
  es: {
    hero: { title: 'GenMozPro', subtitle: 'La suite líder en auditoría de BIN y validación de pasarelas de pago para desarrolladores.' },
    nav: { home: 'Inicio', about: 'Sobre Nosotros', contact: 'Contacto', privacy: 'Privacidad', terms: 'Términos de Uso' },
    gen: { 
      tab_title: 'Generador de BIN', input_label: 'Prefijo BIN (6-8 dígitos)', qty: 'Cantidad', month: 'Mes', year: 'Ano', random: 'Aleatorio', 
      btn_generate: 'Generar Tarjetas de Prueba', results: 'Panel de Auditoría', copied: '¡Copiado!', 
      bin_required: 'BIN de 6 dígitos obligatorio', send_checker: 'Mover a Checker', send_stripe: 'Mover a Stripe',
      placeholder: 'Esperando BIN...', analyzing: 'Consultando base de IA...', waiting: 'SISTEMA LISTO'
    },
    check: { 
      tab_title: 'Validador Live', tab_stripe: 'Stripe Tester', input_label: 'Lista de Prueba', btn_start: 'Validar Ahora', 
      live_label: 'LIVE / APROBADO', die_label: 'DIE / RECHAZADO', unknown_label: 'ERROR / UNKNOWN', 
      clear: 'Limpar', copy_all: 'Copiar Todo', copy_live: 'Copiar Lives', status_ready: 'Esperando lista...', status_processing: 'Auditando...'
    },
    features: {
      ai_title: 'Auditoría IA', ai_desc: 'Identificación instantánea de banco, país y nivel del tarjeta mediante algoritmos de aprendizaje profundo.',
      luhn_title: 'Validador Luhn', luhn_desc: 'Verificación matemática estricta para asegurar que los números sigan los estándares ISO/IEC 7812.',
      lock_title: 'Privacidade Local', lock_desc: 'Todo el procesamiento ocurre en su navegador. No enviamos datos de prueba a nuestros servidores.'
    },
    assistant: {
      hello: 'Asistente GenMozPro',
      ask: '¿Cómo puedo ayudar en su processo de QA hoy?',
      btn_gen: 'Nuevo Lote',
      btn_val: 'Validar Lista'
    },
    footer: { 
      desc: 'GenMozPro es una herramienta educativa enfocada en el análisis de seguridad en sistemas de pago y flujos de pago.', 
      rights: '© 2025 GenMozPro. Todos los direitos reservados. Solo para pruebas de software.', 
      section_tool: 'Funcionalidades', section_legal: 'Información Legal', newsletter_title: 'Suscríbete al Boletín', status_online: 'Servidor: Operacional'
    },
    legal: {
      about_t: 'Sobre el Proyecto GenMozPro',
      about_content: 'GenMozPro es una plataforma de tecnología financiera desarrollada para simplificar la vida de especialistas en Garantia de Calidad (QA) y desarrolladores de software. Nuestra herramienta utiliza algoritmos avanzados e inteligencia artificial para simular números de tarjetas basados en prefijos BIN reales.',
      mission: 'Nuestra Misión',
      mission_content: 'Democratizar el acceso a herramientas de prueba de alto rendimiento, asegurando la integridad de los sistemas financieros globales.',
      vision: 'Nuestra Visión',
      vision_content: 'Convertirse en el estándar de oro en auditoría de BINs y herramientas de soporte al desarrollo de e-commerce.',
      privacy_t: 'Política de Privacidade y Cookies',
      privacy_intro: 'En GenMozPro, nos tomamos en serio su privacidad. Esta política describe cómo manejamos la información y el uso de tecnologías de seguimiento.',
      privacy_cookies_t: 'Uso de Cookies',
      privacy_cookies_desc: 'Utilizamos cookies para mejorar su navegación y recordar sus preferencias. Las cookies son pequeños archivos guardados en su dispositivo.',
      privacy_data_t: 'Seguridad de Datos',
      privacy_data_desc: 'Importante: GenMozPro NO almacena los números de tarjetas. Todo el procesamiento se realiza localmente en su navegador.',
      privacy_ads_t: 'Publicidad de Terceros (Google AdSense)',
      privacy_ads_desc: 'Google, como proveedor externo, utiliza cookies para mostrar anuncios. El uso de la cookie DART permite mostrar anuncios basados en su visita.',
      terms_t: 'Términos y Condiciones de Uso',
      terms_intro: 'Al acceder al sitio GenMozPro, usted acepta cumplir con estos términos de servicio.',
      terms_conduct_t: 'Conducta del Usuario',
      terms_conduct_desc: 'Las herramientas aquí disponibles son estrictamente para fines educativos. Está prohibido el uso para transacciones financeiras reales.',
      terms_disclaimer_t: 'Descargo de Responsabilidad',
      terms_disclaimer_desc: 'GenMozPro no se hace responsable de los daños resultantes del uso indebido. No garantizamos que las tarjetas funcionen en todas las pasarelas.',
      contact_t: 'Soporte y Alianzas',
      contact_desc: '¿Tiene alguna pregunta técnica? Póngase en contacto con nuestro equipo de soporte.',
      contact_success: '¡Mensaje enviado con éxito!',
      contact_btn: 'Enviar Solicitud'
    },
    cookie_banner: { text: 'Este sitio utiliza cookies de Google para anuncios y análisis de tráfico. Al continuar, acepta nuestra política.', btn_accept: 'ACEPTAR Y CERRAR' }
  }
};

const LanguageContext = createContext<any>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('pt');

  useEffect(() => {
    const saved = localStorage.getItem('genmoz_lang') as Language;
    if (saved && translations[saved]) setLang(saved);
  }, []);

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('genmoz_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang: changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
