# Design System & Identidade Visual Editorial — Dra. Tayana de Paula

## 1. Conceito Central & Direção de Arte
- **Conceito:** *"A delicadeza do movimento. A precisão do cuidado."*
- **Linguagem Visual:** Inspirada em design editorial contemporâneo de alto padrão e clínicas particulares de referência médica de alta qualidade (Core Ortopedia), combinando fotografia médica autoral com uma tipografia sofisticada, botões pill com acabamento iluminado e composição sem containers fechados.
- **Diferenciação Estrita:** Rejeição absoluta a templates genéricos de IA, caixas repetitivas, gradientes neon e dashboards SaaS.

## 2. Paleta de Cores & Distribuição
- **Bordô Profundo (`#772E40`):** Identidade, autoridade, destaque institucional e botões de conversão.
- **Bordô Escuro (`#4B1928`):** Profundidade, contraste e estados de foco/hover.
- **Creme (`#F7F4EF`):** Fundo principal, calor humano e respiro editorial.
- **Areia (`#D9C9BD`):** Linhas sutis, transições e detalhes refinados.
- **Grafite (`#302B2C`):** Tipografia de alta legibilidade e contraste óptico.
- **Branco (`#FFFFFF`):** Áreas negativas, clareza e cartões de destaque.
- **Distribuição:** 65% Creme/Branco, 25% Bordô/Grafite, 10% Apoio.

## 3. Tipografia
- **Títulos Editoriais & Destaques Principais:** `Cormorant Garamond` (pesos 500 e 600, itálico editorial para destaques expressivos).
- **Interface, Leitura & Navegação:** `Manrope` (pesos 400, 500 e 600).

## 4. Componente de Prova Social Discreta (Pill com Fotos Reais)
- **Formato:** Cápsula pill refinada (`.social-proof-pill`), discreta, sem cara de banner e sem números inflados:
  - 3 círculos de fotos reais de pessoas/pacientes com borda branca e sobreposição suave (`avatar-person-1.jpg`, `avatar-person-2.jpg`, `avatar-person-3.jpg`).
  - Texto elegante: `+2.400 pacientes atendidos ★★★★★`.
  - Posicionada abaixo de **cada botão de ação da página** (Hero, Sintomas, Sobre, Procedimentos, Consulta, Diferencial, FAQ, Localização e CTA Final).
  - Versão clara para seções claras e versão translúcida escura (`.pill-dark`) para o CTA Final bordô.

## 5. Arquitetura das Seções

1. **Header Minimalista Integrado:**
   - Totalmente transparente no topo da página (sem faixa ou barra de cor opaca contrastante).
   - Torna-se sutilmente translúcido (frosted glass) apenas ao rolar a página.

2. **Hero Editorial Full-Bleed (Referência Anexo 2 — Estilo Core):**
   - Fotografia real `Hero.png` aplicada como `background-image` da seção com enquadramento dinâmico calibrado (`auto min(...)`), sangrando até a borda direita e inferior sem cartões ou molduras, garantindo que o topo da cabeça e óculos da médica nunca sejam cortados e permaneçam com respiro editorial seguro abaixo do header.
   - Tipografia de título em `Cormorant Garamond` com ênfase em itálico bordô.
   - Botão Pill bordô com anel externo iluminado e círculo branco com seta direcional: *"Agendar consulta com a Dra. Tayana ↗"*.
   - Prova social discreta em pill posicionada logo abaixo do botão.
   - Badges flutuantes no lado direito: `✔ Atendimento em Manaus`, `✔ Residência em Cirurgia da Mão - HCFMRP-USP`, `✔ Cirurgia da Mão e Microcirurgia` e selo circular rotativo `rotating-seal.svg`.
   - Marca d'água anatômica translúcida em segundo plano.

3. **Sinais de Alerta: "Conviver com a dor virou rotina... mas não deveria" (Referência Anexo 1):**
   - Título impactante com destaque bordô: *"Conviver com a dor virou rotina... mas não deveria."*
   - Lista de 5 sintomas com marcadores em alvo circular (`.symptom-dot`) e termos em negrito.
   - Composição de 2 fotografias médicas de alta resolução sobrepostas (`pain-wrist-discomfort.jpg` e `pain-anatomy-hand.jpg`) com bordas arredondadas e card flutuante de apoio emocional.
   - Botão de ação com pill de prova social embaixo.

4. **Sobre a Dra. Tayana de Paula (Referência Fotografia Full-Bleed `sobre a Dra.png`):**
   - Fotografia real `sobre a Dra.png` aplicada como `background-image` da seção, sangrando até a borda direita sem box ou cartões ao redor da médica.
   - Conteúdo e credenciais alinhados estritamente à esquerda para máxima legibilidade, com trajetória no HCFMRP-USP, foco na microcirurgia e botão direto de WhatsApp com pill de prova social embaixo.

5. **Procedimentos e Cirurgias / Cuidados Especializados (Referência Anexo 3 + Imagens IA):**
   - Header dividido em duas colunas: texto de posicionamento à esquerda com botão pill e prova social discreta, e citação médica à direita.
   - Grid de 6 cards com fotografias médicas fotorrealistas geradas por IA (proporção 4:3):
     1. `card-carpal-tunnel.jpg` (Síndrome do Túnel do Carpo e Nervos)
     2. `card-cysts-nodules.jpg` (Cistos Sinoviais e Nódulos)
     3. `card-trigger-finger.jpg` (Dedo em Gatilho e Tenossinovites)
     4. `card-tendons-trauma.jpg` (Lesões de Tendões e Fraturas)
     5. `card-rhizarthrosis.jpg` (Rizartrose e Degenerações)
     6. `card-microsurgery.jpg` (Microcirurgia Reconstrutiva)

6. **A Consulta Médica (Cards com Ícones e Efeito de Desenho Animado ao Entrar):**
   - 4 cards estruturados para as etapas da consulta presencial.
   - Ícones vetoriais monoline dedicados a cada etapa (`stage-consult-listen.svg`, `stage-consult-exam.svg`, `stage-consult-diag.svg`, `stage-consult-plan.svg`).
   - Efeito de desenho animado (Drawing Animation): linhas desenhadas em tempo real via SVG `stroke-dashoffset` sincronizadas com o `IntersectionObserver`.
   - Botão de agendamento centralizado com pill de prova social embaixo.

7. **Diferencial Profissional & Atendimento Individualizado:**
   - Composição editorial de duas imagens e ênfase na escuta humanizada, com botão de ação e pill de prova social embaixo.

8. **Perguntas Frequentes (Referência Card Pills Core):**
   - Header centralizado: `— PERGUNTAS FREQUENTES`, título *"Perguntas que meus pacientes sempre fazem"* e subtítulo acolhedor.
   - Accordion com 5 cards flutuantes arredondados em formato pill branco com sombra suave.
   - Fechamento inferior centralizado com botão Pill e prova social discreta embaixo.

9. **Nossa Clínica de Atendimento: "Um espaço pensado para cuidar de você" (Referência Core Localização):**
   - Grid 2x2 com fotografia de arquitetura de interiores em alto padrão do consultório médico (`clinic-interior.jpg`), selo circular rotativo, card de mapa interativo do Google Maps de Adrianópolis / Manaus — AM, horários, botão Pill e pill de prova social embaixo.

10. **CTA Final & Rodapé:**
    - Encerramento com assinatura artística, botão de WhatsApp com pill de prova social escura embaixo (`.pill-dark`), conformidade com a Resolução CFM nº 2.336/2023, CRM-AM 10270 e Política de Privacidade LGPD (`privacidade.html`).
