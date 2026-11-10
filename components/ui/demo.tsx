import { TiltStackScroll, type TiltStackCard } from "@/components/ui/tilt-stack-scroll"

const PROCEDURES_CARDS: TiltStackCard[] = [
  {
    title: "Síndrome do Túnel do Carpo e Nervos",
    kicker: "01 · Neuropatias Compressivas",
    description:
      "Descompressão cirúrgica e manejo avançado de neuropatias compressivas que causam dor, formigamento, dormência e perda de força nos dedos e na mão.",
    image: "/assets/images/card-carpal-tunnel.jpg",
    alt: "Avaliação diagnóstica do Túnel do Carpo e Nervos Periféricos",
    tags: ["Descompressão do nervo mediano", "Eletroneuromiografia", "Recuperação funcional"],
    price: "Avaliação",
    priceNote: "Consulta Personalizada",
    cta: "Agendar Consulta",
    href: "https://wa.me/5592992783010?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20sobre%20T%C3%BAnel%20do%20Carpo%20com%20a%20Dra.%20Tayana.",
    accent: "#772E40",
  },
  {
    title: "Cistos Sinoviais e Nódulos",
    kicker: "02 · Partes Moles & Punho",
    description:
      "Diagnóstico minucioso e remoção cirúrgica de cistos sinoviais, tumores benignos e lesões de partes moles que causam dor mecânica ou desconforto estético.",
    image: "/assets/images/card-cysts-nodules.jpg",
    alt: "Exame clínico de cistos sinoviais e tumorações benignas",
    tags: ["Ressecção delicada", "Punção guiada", "Preservação da cápsula"],
    price: "Especializado",
    priceNote: "Tratamento Preciso",
    cta: "Agendar Consulta",
    href: "https://wa.me/5592992783010?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20sobre%20Cistos%20Sinoviais%20com%20a%20Dra.%20Tayana.",
    accent: "#B85D6F",
  },
  {
    title: "Dedo em Gatilho e Tenossinovites",
    kicker: "03 · Mobilidade & Tendões",
    description:
      "Tratamento clínico e liberação percutânea ou cirúrgica da polia para dedos com travamento, estalo doloroso ou tenossinovite estenosante (De Quervain).",
    image: "/assets/images/card-trigger-finger.jpg",
    alt: "Avaliação do dedo em gatilho e tenossinovite",
    tags: ["Liberação de polia A1", "Infiltração precisa", "Alívio imediato do bloqueio"],
    price: "Alívio",
    priceNote: "Retorno aos Movimentos",
    cta: "Agendar Consulta",
    href: "https://wa.me/5592992783010?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20sobre%20Dedo%20em%20Gatilho%20com%20a%20Dra.%20Tayana.",
    accent: "#772E40",
  },
  {
    title: "Lesões de Tendões e Fraturas",
    kicker: "04 · Trauma & Reconstrução",
    description:
      "Reparação primária e secundária de tendões flexores/extensores, reconstrução ligamentar e fixação anatômica estável de fraturas do carpo, metacarpos e falanges.",
    image: "/assets/images/card-tendons-trauma.jpg",
    alt: "Reconstrução de tendões e osteossíntese anatômica",
    tags: ["Sutura tendínea refinada", "Fixação estável", "Reabilitação precoce"],
    price: "Cirúrgico",
    priceNote: "Excelência Anatômica",
    cta: "Agendar Consulta",
    href: "https://wa.me/5592992783010?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20sobre%20Les%C3%B5es%20de%20Tend%C3%B5es%20ou%20Fraturas%20com%20a%20Dra.%20Tayana.",
    accent: "#B85D6F",
  },
  {
    title: "Rizartrose e Degenerações",
    kicker: "05 · Articulações & Polegar",
    description:
      "Manejo avançado da artrose na base do polegar (trapeziometacarpiana) e articulações da mão, devolvendo a força de pinça, função manual e alívio da dor crônica.",
    image: "/assets/images/card-rhizarthrosis.jpg",
    alt: "Tratamento especializado para rizartrose e desgaste articular",
    tags: ["Artroplastia de suspensão", "Preservação da pinça", "Qualidade de vida"],
    price: "Funcional",
    priceNote: "Força e Mobilidade",
    cta: "Agendar Consulta",
    href: "https://wa.me/5592992783010?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20sobre%20Rizartrose%20com%20a%20Dra.%20Tayana.",
    accent: "#772E40",
  },
  {
    title: "Microcirurgia Reconstrutiva",
    kicker: "06 · Alta Precisão Óptica",
    description:
      "Técnica minuciosa com microscópio cirúrgico de alta definição para neurorrafias, anastomoses vasculares, reimplantes e coberturas cutâneas complexas.",
    image: "/assets/images/card-microsurgery.jpg",
    alt: "Microcirurgia reconstrutiva sob magnificação óptica",
    tags: ["Magnificação óptica", "Reparo microvascular", "Neuromas e retalhos"],
    price: "Alta Precisão",
    priceNote: "Microscopia Cirúrgica",
    cta: "Agendar Consulta",
    href: "https://wa.me/5592992783010?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20sobre%20Microcirurgia%20com%20a%20Dra.%20Tayana.",
    accent: "#B85D6F",
  },
]

export default function ProcedimentosSectionDemo() {
  return (
    <section className="w-full bg-[#F7F4EF] py-16" id="atuacao">
      <TiltStackScroll
        cards={PROCEDURES_CARDS}
        eyebrow="— CIRURGIA DA MÃO & MICROCIRURGIA"
        heading="Procedimentos e cirurgias especializadas"
        height="95vh"
        snap={true}
      />
    </section>
  )
}
