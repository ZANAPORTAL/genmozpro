import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'pt' | 'en' | 'es';

interface Translations {
  hero: {
    subtitle: string;
    ai_greeting: string;
    ai_question: string;
    btn_gen_title: string;
    btn_gen_desc: string;
    btn_check_title: string;
    btn_check_desc: string;
  };
  nav: {
    home: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
  };
  gen: {
    tab_title: string;
    input_label: string;
    month: string;
    year: string;
    qty: string;
    btn_generate: string;
    processing: string;
    results: string;
    copy: string;
    copied: string;
    clear: string;
    transfer_success: string;
  };
  tooltips: {
    bin: string;
    month: string;
    year: string;
    qty: string;
    date: string;
    cvv: string;
    generate: string;
    check_btn_live: string;
    check_btn_stripe: string;
  };
  check: {
    tab_live: string;
    tab_stripe: string;
    input_label: string;
    btn_start_format: string;
    btn_start_stripe: string;
    console_live: string;
    console_die: string;
    waiting: string;
    export_csv: string;
  };
  features: {
    ai_title: string;
    ai_desc: string;
    luhn_title: string;
    luhn_desc: string;
    privacy_title: string;
    privacy_desc: string;
  };
  footer: {
    newsletter_title: string;
    newsletter_desc: string;
    newsletter_btn: string;
    product: string;
    company: string;
    resources: string;
    legal: string;
    desc: string;
    rights: string;
    links: {
      gen: string;
      check: string;
      api: string;
      status: string;
      blog: string;
      help: string;
    }
  };
  legal_page: {
    about_title: string;
    about_content: string;
    privacy_title: string;
    privacy_content: string;
    terms_title: string;
    terms_content: string;
    contact_title: string;
    contact_desc: string;
    form_name: string;
    form_email: string;
    form_msg: string;
    form_btn: string;
  };
  cookie_banner: {
    title: string;
    text: string;
    btn_more: string;
    btn_accept: string;
  };
}

const translations: Record<Language, Translations> = {
  pt: {
    hero: {
      subtitle: 'Ferramenta completa para testes de pagamento com integração IA.',
      ai_greeting: 'Olá, sou seu Assistente GenMoz.',
      ai_question: 'O que você gostaria de fazer hoje?',
      btn_gen_title: 'Gerar Cartões',
      btn_gen_desc: 'Criar dados de teste com BIN',
      btn_check_title: 'Validar Lista',
      btn_check_desc: 'Check Live ou Stripe Gate',
    },
    nav: { home: 'Início', about: 'Sobre Nós', contact: 'Contato', privacy: 'Privacidade', terms: 'Termos' },
    gen: {
      tab_title: 'GERADOR',
      input_label: 'BIN (6 Dígitos)',
      month: 'Mês',
      year: 'Ano',
      qty: 'Quantidade',
      btn_generate: 'GERAR AGORA',
      processing: 'PROCESSANDO...',
      results: 'Resultado Gerado',
      copy: 'Copiar',
      copied: 'Copiado!',
      clear: 'Limpar',
      transfer_success: 'Transferido para Checker!',
    },
    tooltips: {
      bin: 'Insira os primeiros 6 dígitos do cartão (ex: 451416)',
      month: 'Selecione o mês de validade',
      year: 'Selecione o ano de validade',
      qty: 'Número de cartões a gerar (Max: 100)',
      date: 'Incluir data de validade no formato |mm|yyyy',
      cvv: 'Incluir código de segurança aleatório',
      generate: 'Iniciar geração com as configurações atuais',
      check_btn_live: 'Validação offline rápida do algoritmo de Luhn (formato)',
      check_btn_stripe: 'Simulação de transação em gateway Stripe (latência real)',
    },
    check: {
      tab_live: 'CHECKER',
      tab_stripe: 'STRIPE GATE',
      input_label: 'Cole sua lista (Pipe | Separated)',
      btn_start_format: 'INICIAR LIVE CHECK',
      btn_start_stripe: 'INICIAR STRIPE CHECK',
      console_live: 'Live',
      console_die: 'Die',
      waiting: 'Aguardando dados...',
      export_csv: 'Exportar CSV',
    },
    features: {
      ai_title: 'IA Integrada',
      ai_desc: 'Nossa ferramenta utiliza inteligência artificial para identificar padrões de BIN.',
      luhn_title: 'Validação Luhn',
      luhn_desc: 'Verificação instantânea de checksum para garantir validade matemática.',
      privacy_title: 'Privacidade Total',
      privacy_desc: 'Todo o processamento é seguro. Não armazenamos seus dados.',
    },
    footer: {
      newsletter_title: 'Fique Atualizado',
      newsletter_desc: 'Receba alertas de novos BINs e atualizações da API.',
      newsletter_btn: 'Inscrever-se',
      product: 'Produto',
      company: 'Empresa',
      resources: 'Recursos',
      legal: 'Jurídico',
      desc: 'GenMozPro é a suíte definitiva para desenvolvedores e analistas de QA testarem fluxos de pagamento com segurança e inteligência.',
      rights: 'Todos os direitos reservados.',
      links: {
        gen: 'Gerador BIN',
        check: 'Validador',
        api: 'API Docs (Breve)',
        status: 'Status do Sistema',
        blog: 'Blog Tech',
        help: 'Central de Ajuda'
      }
    },
    legal_page: {
      about_title: 'Sobre a GenMozPro',
      about_content: `A GenMozPro Solutions é uma plataforma tecnológica dedicada a desenvolvedores, engenheiros de QA e estudantes de segurança da informação. Nossa missão é fornecer ferramentas robustas para simulação e teste de sistemas de pagamento, permitindo a validação de algoritmos de checkout (como o Algoritmo de Luhn) sem a necessidade de utilizar dados financeiros reais.

      Diferente de outras ferramentas, a GenMozPro foca na transparência e na segurança. Todas as gerações numéricas são baseadas em padrões matemáticos públicos e não representam cartões de crédito reais ativos ou vinculados a contas bancárias individuais. Somos uma solução "Sandbox" (caixa de areia) para desenvolvimento seguro.

      Nossa tecnologia utiliza processamento local (Client-Side) para garantir que os dados gerados nunca deixem o seu dispositivo, oferecendo uma camada extra de privacidade e conformidade com normas de proteção de dados.`,
      privacy_title: 'Política de Privacidade e Proteção de Dados',
      privacy_content: `Última atualização: Outubro de 2023.

      1. Coleta e Processamento de Dados
      A GenMozPro opera sob uma política estrita de "No-Logs". Não coletamos, armazenamos, transmitimos ou vendemos os números gerados (PANs) ou validados em nossa plataforma. Todo o cálculo matemático é executado exclusivamente no navegador do usuário (Client-Side) via JavaScript. Nossos servidores não recebem os dados de teste que você insere.

      2. Uso de Cookies e Tecnologias de Rastreamento
      Utilizamos cookies técnicos minimamente invasivos apenas para:
      - Lembrar suas preferências de idioma (Português, Inglês, Espanhol).
      - Manter o consentimento da política de cookies.
      - Analisar tráfego anônimo para melhoria de desempenho (via Google Analytics, de forma anonimizada).

      3. Publicidade e Terceiros
      Este site pode exibir publicidade fornecida pela rede Google AdSense. O Google utiliza cookies (como o cookie DoubleClick) para veicular anúncios com base nas visitas anteriores do usuário a este ou a outros sites. Você pode optar por desativar a publicidade personalizada acessando as Configurações de Anúncios do Google.

      4. Proteção de Dados (LGPD/GDPR)
      Respeitamos integralmente a Lei Geral de Proteção de Dados (LGPD) e o GDPR. Como não coletamos dados pessoais identificáveis (PII) associados aos números gerados, nossa plataforma é inerentemente segura por design.`,
      terms_title: 'Termos de Uso e Isenção de Responsabilidade',
      terms_content: `Ao utilizar a GenMozPro, você concorda com os seguintes termos:

      1. Finalidade Estritamente Educacional e de Desenvolvimento
      Esta ferramenta foi projetada EXCLUSIVAMENTE para fins de teste de software, verificação de algoritmos de validação (Luhn), testes de carga em gateways de pagamento em ambientes de sandbox e fins educacionais.

      2. Proibição de Atividades Ilícitas
      É estritamente proibido utilizar os dados gerados nesta plataforma para tentar realizar compras reais, fraudes, carding ou qualquer atividade ilegal. Os números gerados são matemáticamente válidos mas fictícios e não possuem fundos reais. O uso indevido desta ferramenta é de inteira responsabilidade do usuário.

      3. Isenção de Responsabilidade
      A GenMozPro não se responsabiliza por quaisquer danos diretos, indiretos ou consequentes resultantes do uso ou da incapacidade de usar nossas ferramentas. O serviço é fornecido "como está", sem garantias de qualquer tipo.

      4. Bloqueio de Acesso
      Reservamo-nos o direito de restringir o acesso a qualquer usuário ou endereço IP que demonstre comportamento abusivo, uso de bots excessivos ou tentativas de exploração da infraestrutura.`,
      contact_title: 'Entre em Contato',
      contact_desc: 'Tem dúvidas sobre a ferramenta, encontrou um bug ou precisa de suporte para integração API? Nossa equipe técnica está pronta para ajudar. Preencha o formulário abaixo ou envie um email direto.',
      form_name: 'Nome Completo',
      form_email: 'Email Profissional',
      form_msg: 'Descreva sua solicitação...',
      form_btn: 'Enviar Solicitação'
    },
    cookie_banner: {
      title: '🍪 Respeitamos sua privacidade',
      text: 'Utilizamos cookies essenciais para garantir que você tenha a melhor experiência em nosso gerador. Ao continuar, você concorda com nossos termos.',
      btn_more: 'Política de Privacidade',
      btn_accept: 'Aceitar & Fechar'
    }
  },
  en: {
    hero: {
      subtitle: 'Complete payment testing tool with AI integration.',
      ai_greeting: 'Hello, I am your GenMoz Assistant.',
      ai_question: 'What would you like to do today?',
      btn_gen_title: 'Generate Cards',
      btn_gen_desc: 'Create test data with BIN',
      btn_check_title: 'Validate List',
      btn_check_desc: 'Live Check or Stripe Gate',
    },
    nav: { home: 'Home', about: 'About Us', contact: 'Contact', privacy: 'Privacy', terms: 'Terms' },
    gen: {
      tab_title: 'GENERATOR',
      input_label: 'BIN (6 Digits)',
      month: 'Month',
      year: 'Year',
      qty: 'Quantity',
      btn_generate: 'GENERATE NOW',
      processing: 'PROCESSING...',
      results: 'Generated Results',
      copy: 'Copy',
      copied: 'Copied!',
      clear: 'Clear',
      transfer_success: 'Transferred to Checker!',
    },
    tooltips: {
      bin: 'Enter the first 6 digits of the card (e.g., 451416)',
      month: 'Select expiration month',
      year: 'Select expiration year',
      qty: 'Number of cards to generate (Max: 100)',
      date: 'Include expiration date in |mm|yyyy format',
      cvv: 'Include random security code',
      generate: 'Start generation with current settings',
      check_btn_live: 'Fast offline Luhn algorithm validation (format check)',
      check_btn_stripe: 'Simulate Stripe gateway transaction (realistic latency)',
    },
    check: {
      tab_live: 'CHECKER',
      tab_stripe: 'STRIPE GATE',
      input_label: 'Paste your list (Pipe | Separated)',
      btn_start_format: 'START LIVE CHECK',
      btn_start_stripe: 'START STRIPE CHECK',
      console_live: 'Live',
      console_die: 'Die',
      waiting: 'Waiting for data...',
      export_csv: 'Export CSV',
    },
    features: {
      ai_title: 'AI Integrated',
      ai_desc: 'Our tool uses artificial intelligence to identify BIN patterns.',
      luhn_title: 'Luhn Validation',
      luhn_desc: 'Instant checksum verification to ensure mathematical validity.',
      privacy_title: 'Total Privacy',
      privacy_desc: 'All processing is secure. We do not store your data.',
    },
    footer: {
      newsletter_title: 'Stay Updated',
      newsletter_desc: 'Get API updates and new BIN alerts.',
      newsletter_btn: 'Subscribe',
      product: 'Product',
      company: 'Company',
      resources: 'Resources',
      legal: 'Legal',
      desc: 'GenMozPro is the ultimate suite for developers and QA analysts to test payment flows safely and intelligently.',
      rights: 'All rights reserved.',
      links: {
        gen: 'BIN Generator',
        check: 'Validator',
        api: 'API Docs (Soon)',
        status: 'System Status',
        blog: 'Tech Blog',
        help: 'Help Center'
      }
    },
    legal_page: {
      about_title: 'About GenMozPro',
      about_content: `GenMozPro Solutions is a technology platform dedicated to developers, QA engineers, and information security students. Our mission is to provide robust tools for simulation and testing of payment systems, allowing the validation of checkout algorithms (such as the Luhn Algorithm) without the need to use real financial data.

      Unlike other tools, GenMozPro focuses on transparency and security. All number generations are based on public mathematical patterns and do not represent active real credit cards linked to individual bank accounts. We are a "Sandbox" solution for secure development.

      Our technology uses local processing (Client-Side) to ensure that generated data never leaves your device, offering an extra layer of privacy and compliance with data protection standards.`,
      privacy_title: 'Privacy Policy & Data Protection',
      privacy_content: `Last Updated: October 2023.

      1. Data Collection and Processing
      GenMozPro operates under a strict "No-Logs" policy. We do not collect, store, transmit, or sell numbers generated (PANs) or validated on our platform. All mathematical calculation is executed exclusively in the user's browser (Client-Side) via JavaScript. Our servers do not receive the test data you enter.

      2. Use of Cookies and Tracking Technologies
      We use minimally invasive technical cookies only to:
      - Remember your language preferences.
      - Maintain cookie policy consent.
      - Analyze anonymous traffic for performance improvement (via Google Analytics, anonymized).

      3. Advertising and Third Parties
      This site may display advertising provided by the Google AdSense network. Google uses cookies (such as the DoubleClick cookie) to serve ads based on the user's past visits to this or other websites. You may opt-out of personalized advertising by visiting Google Ad Settings.

      4. Data Protection (GDPR/CCPA)
      We fully respect the GDPR and CCPA. As we do not collect personally identifiable information (PII) associated with generated numbers, our platform is inherently secure by design.`,
      terms_title: 'Terms of Use & Disclaimer',
      terms_content: `By using GenMozPro, you agree to the following terms:

      1. Strictly Educational and Development Purpose
      This tool is designed EXCLUSIVAMENTE for software testing purposes, validation algorithm verification (Luhn), load testing on sandbox payment gateways, and educational purposes.

      2. Prohibition of Illicit Activities
      It is strictly prohibited to use data generated on this platform to attempt real purchases, fraud, carding, or any illegal activity. The generated numbers are mathematically valid but fictitious and have no real funds. Misuse of this tool is the sole responsibility of the user.

      3. Disclaimer of Liability
      GenMozPro is not responsible for any direct, indirect, or consequential damages resulting from the use or inability to use our tools. The service is provided "as is", without warranties of any kind.

      4. Access Blocking
      We reserve the right to restrict access to any user or IP address that demonstrates abusive behavior, excessive bot usage, or attempts to exploit the infrastructure.`,
      contact_title: 'Contact Us',
      contact_desc: 'Have questions about the tool, found a bug, or need API integration support? Our technical team is ready to help. Fill out the form below or send us a direct email.',
      form_name: 'Full Name',
      form_email: 'Professional Email',
      form_msg: 'Describe your request...',
      form_btn: 'Send Request'
    },
    cookie_banner: {
      title: '🍪 We respect your privacy',
      text: 'We use essential cookies to ensure you get the best experience on our generator. By continuing, you agree to our terms.',
      btn_more: 'Privacy Policy',
      btn_accept: 'Accept & Close'
    }
  },
  es: {
    hero: {
      subtitle: 'Herramienta completa de pruebas de pago con IA.',
      ai_greeting: 'Hola, soy tu Asistente GenMoz.',
      ai_question: '¿Qué te gustaría hacer hoy?',
      btn_gen_title: 'Generar Tarjetas',
      btn_gen_desc: 'Crear datos de prueba con BIN',
      btn_check_title: 'Validar Lista',
      btn_check_desc: 'Check Live o Stripe Gate',
    },
    nav: { home: 'Inicio', about: 'Sobre Nosotros', contact: 'Contacto', privacy: 'Privacidad', terms: 'Términos' },
    gen: {
      tab_title: 'GENERADOR',
      input_label: 'BIN (6 Dígitos)',
      month: 'Mes',
      year: 'Año',
      qty: 'Cantidad',
      btn_generate: 'GENERAR AHORA',
      processing: 'PROCESANDO...',
      results: 'Resultados Generados',
      copy: 'Copiar',
      copied: '¡Copiado!',
      clear: 'Limpiar',
      transfer_success: '¡Transferido al Checker!',
    },
    tooltips: {
      bin: 'Ingrese los primeros 6 dígitos de la tarjeta (ej: 451416)',
      month: 'Seleccione el mes de vencimiento',
      year: 'Seleccione el año de vencimiento',
      qty: 'Cantidad de tarjetas a generar (Máx: 100)',
      date: 'Incluir fecha de vencimiento en formato |mm|yyyy',
      cvv: 'Incluir código de seguridad aleatorio',
      generate: 'Iniciar generación con la configuración actual',
      check_btn_live: 'Validación rápida offline del algoritmo Luhn (formato)',
      check_btn_stripe: 'Simulación de transacción en pasarela Stripe (latencia realista)',
    },
    check: {
      tab_live: 'CHECKER',
      tab_stripe: 'STRIPE GATE',
      input_label: 'Pega tu lista (Pipe | Separated)',
      btn_start_format: 'INICIAR LIVE CHECK',
      btn_start_stripe: 'INICIAR STRIPE CHECK',
      console_live: 'Vivas',
      console_die: 'Muertas',
      waiting: 'Esperando datos...',
      export_csv: 'Exportar CSV',
    },
    features: {
      ai_title: 'IA Integrada',
      ai_desc: 'Nuestra herramienta utiliza inteligencia artificial para identificar patrones BIN.',
      luhn_title: 'Validación Luhn',
      luhn_desc: 'Verificación instantânea de checksum para asegurar validez matemática.',
      privacy_title: 'Privacidad Total',
      privacy_desc: 'Todo el procesamiento es seguro. No almacenamos tus datos.',
    },
    footer: {
      newsletter_title: 'Mantente Actualizado',
      newsletter_desc: 'Recibe alertas de nuevos BINs y actualizaciones de API.',
      newsletter_btn: 'Suscribirse',
      product: 'Producto',
      company: 'Empresa',
      resources: 'Recursos',
      legal: 'Legal',
      desc: 'GenMozPro es la suite definitiva para desarrolladores y analistas de QA para probar flujos de pago de forma segura e inteligente.',
      rights: 'Todos los derechos reservados.',
      links: {
        gen: 'Generador BIN',
        check: 'Validador',
        api: 'API Docs (Pronto)',
        status: 'Estado del Sistema',
        blog: 'Blog Tech',
        help: 'Centro de Ayuda'
      }
    },
    legal_page: {
      about_title: 'Sobre GenMozPro',
      about_content: `GenMozPro Solutions es una plataforma tecnológica dedicada a desarrolladores, ingenieros de QA y estudiantes de seguridad de la información. Nuestra misión es proporcionar herramientas robustas para la simulación y prueba de sistemas de pago, permitiendo la validación de algoritmos de pago (como el Algoritmo de Luhn) sin necesidad de utilizar datos financieros reales.

      A diferencia de otras herramientas, GenMozPro se centra en la transparencia y la seguridad. Todas las generaciones numéricas se basan en patrones matemáticos públicos y no representan tarjetas de crédito reales activas vinculadas a cuentas bancarias individuales. Somos una solución "Sandbox" para el desarrollo seguro.

      Nuestra tecnología utiliza procesamiento local (Client-Side) para garantizar que los datos generados nunca salgan de su dispositivo, ofreciendo una capa extra de privacidad y cumplimiento con las normas de protección de datos.`,
      privacy_title: 'Política de Privacidad y Protección de Datos',
      privacy_content: `Última actualización: Octubre de 2023.

      1. Recopilación y Procesamiento de Datos
      GenMozPro opera bajo una política estricta de "No-Logs". No recopilamos, almacenamos, transmitimos ni vendemos los números generados (PAN) o validados en nuestra plataforma. Todo el cálculo matemático se ejecuta exclusivamente en el navegador del usuario (Client-Side) a través de JavaScript. Nuestros servidores no reciben los datos de prueba que usted introduce.

      2. Uso de Cookies y Tecnologías de Rastreo
      Utilizamos cookies técnicas mínimamente invasivas solo para:
      - Recordar sus preferencias de idioma.
      - Mantener el consentimiento de la política de cookies.
      - Analizar tráfico anónimo para mejorar el rendimiento (vía Google Analytics, anonimizado).

      3. Publicidad y Terceros
      Este sitio puede mostrar publicidad proporcionada por la red Google AdSense. Google utiliza cookies (como la cookie DoubleClick) para mostrar anuncios basados en las visitas anteriores del usuario a este u otros sitios web. Puede optar por desactivar la publicidad personalizada visitando la Configuración de Anuncios de Google.

      4. Protección de Datos (GDPR/CCPA)
      Respetamos totalmente el GDPR y la CCPA. Al no recopilar información de identificación personal (PII) asociada a los números generados, nuestra plataforma es intrínsecamente segura por diseño.`,
      terms_title: 'Términos de Uso y Descargo de Responsabilidad',
      terms_content: `Al utilizar GenMozPro, usted acepta los siguientes términos:

      1. Propósito Estrictamente Educativo y de Desarrollo
      Esta herramienta está diseñada EXCLUSIVAMENTE para fines de prueba de software, verificación de algoritmos de validación (Luhn), pruebas de carga en pasarelas de pago sandbox y fines educativos.

      2. Prohibición de Actividades Ilícitas
      Está estrictamente prohibido utilizar los datos generados en esta plataforma para intentar realizar compras reales, fraudes, carding o cualquier actividad ilegal. Los números generados son matemáticamente válidos pero ficticios y no tienen fondos reales. El mal uso de esta herramienta es responsabilidad exclusiva del usuario.

      3. Descargo de Responsabilidad
      GenMozPro no se hace responsable de ningún daño directo, indirecto o consecuente resultante del uso o la imposibilidad de usar nuestras herramientas. El servicio se proporciona "tal cual", sin garantías de ningún tipo.

      4. Bloqueio de Acesso
      Nos reservamos el derecho de restringir el acceso a cualquier usuario o dirección IP que demuestre un comportamiento abusivo, uso excesivo de bots o intentos de explotar la infraestructura.`,
      contact_title: 'Contáctanos',
      contact_desc: '¿Tienes preguntas sobre la herramienta, encontraste un error o necesitas soporte para la integración API? Nuestro equipo técnico está listo para ayudar. Rellena el formulario a continuación o envíanos un correo electrónico directo.',
      form_name: 'Nombre Completo',
      form_email: 'Correo Profesional',
      form_msg: 'Describe tu solicitud...',
      form_btn: 'Enviar Solicitud'
    },
    cookie_banner: {
      title: '🍪 Respetamos tu privacidad',
      text: 'Utilizamos cookies esenciales para garantizar que tengas la mejor experiencia en nuestro generador. Al continuar, aceptas nuestros términos.',
      btn_more: 'Política de Privacidad',
      btn_accept: 'Aceptar y Cerrar'
    }
  }
};

const LanguageContext = createContext<{
  lang: Language;
  t: Translations;
  setLang: (lang: Language) => void;
}>({
  lang: 'pt',
  t: translations.pt,
  setLang: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('pt');

  useEffect(() => {
    const userLang = navigator.language.split('-')[0];
    if (userLang === 'en') setLang('en');
    else if (userLang === 'es') setLang('es');
    else setLang('pt'); // Default fallback
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
