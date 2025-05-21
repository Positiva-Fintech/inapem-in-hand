"use client";

import { motion } from "framer-motion";
// import { Circle } from "lucide-react";
// import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "ReCria",
    title_slong: "Impulsionando a Economia Criativa em Angola.",
    date: "Jan 2025",
    content:
      "O RECRIA é um projecto inovador desenvolvido pelo INAPEM, com o objetivo de apoiar e promover o Empreendedorismo Criativo em Angola. A iniciativa visa fomentar a criação, o desenvolvimento e a sustentabilidade de empresas que operam nos sectores da arte, design, moda, música, audiovisual, tecnologia criativa e outras áreas relacionadas à economia criativa.",
    content2:
      "O principal objetivo do projeto RECRIA é apoiar os empreendedores criativos ao longo do seu ciclo de vida, oferecendo suporte técnico, financeiro e formativo. Busca-se, assim, criar um ecossistema favorável para que as empresas criativas possam crescer, prosperar e competir no mercado local e internacional.",
    category: "Planning",
    icon: "/images/recria.jpg",
    relatedIds: [2, 3],
    status: "in-progress" as const,
    energy: 15,
  },
  {
    id: 2,
    title: "Replica",
    title_slong: "Replicação de Negócios Funcionais",
    date: "Jan 2025",
    content:
      "O Projecto REPLICA é uma iniciativa estratégica do INAPEM voltada à promoção do empreendedorismo emergente em Angola, por meio da replicação de negócios funcionais, organizados em modelos acessíveis de microfranquias, a proposta visa capacitar e inserir aspirantes a empreendedores em actividades econômicas já testadas e operacionais, fornecendo todo o suporte necessário para iniciar a operação com um risco reduzido.",
    content2: "Mais informações",
    category: "Planning",
    link: "https://cooperativas.gov.ao/",
    // icon: Calendar,
    icon: "/images/replica.png",
    relatedIds: [2, 3, 4],
    status: "completed" as const,
    energy: 10,
  },
  {
    id: 3,
    title: "Turismo",
    title_slong: "Impulsionando a Economia Criativa em Angola.",
    date: "Jan 2025",
    content: "Este projeto tem o objectivo de transformar o turismo em um dos principais motores de crescimento econômico em Angola. Através do apoio às empresas locais, melhoria das infraestruturas e promoção da sustentabilidade, visa-se criar um sector turístico vibrante e competitivo, que gere emprego, renda e atraia investimentos, ao mesmo tempo em que valoriza o patrimônio e cultura angolana.",
    content2: "Mais informações",
    category: "Planning",
    // icon: Calendar,
    icon: "/images/empreetur.jpg",
    relatedIds: [2],
    status: "completed" as const,
    energy: 10,
  },
  {
    id: 4,
    title: "ECO MPME",
    title_slong: "Impulsionando a Economia Criativa em Angola.",
    date: "Feb 2024",
    content:
      "O Projeto de Apoio às MPME voltadas à Sustentabilidade visa impulsionar o desenvolvimento de micro, pequenas e médias empresas (MPMEs) em Angola, com foco na implementação de práticas empresariais sustentáveis. O projeto é uma iniciativa estratégica para promover o crescimento responsável das MPMEs, alinhando-as com os princípios de sustentabilidade econômica, ambiental e social, visando não apenas a sua competitividade, mas também a contribuição para o desenvolvimento sustentável do país.",
    category: "Design",
    content2: "Mais informações",
    icon: "/images/eco_mpme.jpg",
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 10,
  },
  {
    id: 5,
    title: "PROAPI",
    title_slong: "Impulsionando a Economia Criativa em Angola.",
    date: "Mar 2025",
    content: "É um programa desenvolvindo pelo INAPEM, com visão aos objectivos do PRODESI, que foi aprovado pelo Decreto Presidencial n.º 169/18 de 20 de Julho, este programa é vocacinado para o apoio à industrialização da produção agropecuária e extrativista de agricultores familiares, Associações, Cooperativas e MPMEs Agropecuárias a nível nacional.",
    category: "Development",
    content2: "Mais informações",
    icon: "/images/proapi.jpg",
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 6,
    title: "Conectar",
    title_slong: "Impulsionando a Economia Criativa em Angola.",
    date: "Apr 2025",
    content: "O Projeto de Atração de Investimentos para Startups é uma iniciativa estratégica destinada a impulsionar o ecossistema de inovação e empreendedorismo em Angola. O objetivo é criar um ambiente propício para o desenvolvimento de novas empresas, com foco na atração de investidores nacionais e internacionais para financiar startups inovadoras e de alto potencial de crescimento. Através deste projeto, buscamos fortalecer o papel das startups como motores de diversificação econômica, inovação e criação de emprego no país.",
    category: "Testing",
    content2: "Mais informações",
    icon: "/images/conectar.jpg",
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 7,
    title: "Promove",
    title_slong: "Impulsionando a Economia Criativa em Angola.",
    date: "May 2025",
    content: "O Projeto de Apoio, Gestão e Formalização de Cooperativas tem como objetivo principal fortalecer as cooperativas em Angola, promovendo sua formalização e capacitação para garantir sua sustentabilidade, competitividade e impacto positivo nas comunidades. Este projeto é uma iniciativa do Instituto Nacional de Apoio às Micro, Pequenas e Médias Empresas (INAPEM), com foco na melhoria da gestão e na integração das cooperativas no sistema econômico formal.",
    category: "Release",
    content2: "Mais informações",
    icon: "/images/promove.jpg",
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
  {
    id: 8,
    title: "CiSu",
    title_slong: "Impulsionando a Economia Criativa em Angola.",
    date: "May 2025",
    content: "O CISU - Centro de Incubação de Startups Universitárias é uma iniciativa inovadora criada pelo INAPEM (Instituto Nacional de Apoio às Pequenas e Médias Empresas) em parceria com as universidades de Angola. Este centro visa apoiar e fomentar o empreendedorismo jovem, estimulando a criação de startups inovadoras e contribuindo para o desenvolvimento econômico e social do país. O CISU é uma plataforma estratégica para a transformação de ideias acadêmicas em negócios sustentáveis, com foco na geração de empregos e na diversificação da economia nacional.",
    category: "Release",
    content2: "Mais informações",
    icon: "/images/cisu.jpg",
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
  {
    id: 9,
    title: "Gael",
    title_slong: "Impulsionando a Economia Criativa em Angola.",
    date: "May 2025",
    content: "A missão do GAEL é fomentar o empreendedorismo local, oferecendo suporte técnico, formaliação, consultoria, assistência Técnica, capacitação e acesso a informações e recursos financeiros disponíveis para o formento do empreendedorismo e boas práticas de Gestão de pequenos negócios.",
    category: "Release",
    content2: "Mais informações",
    icon: "/images/gael.png",
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
  {
    id: 10,
    title: "Planear",
    title_slong: "Impulsionando a Economia Criativa em Angola.",
    date: "May 2025",
    content: "O Projeto de Aprendizagem Rural é uma iniciativa voltada para o desenvolvimento de competências e capacitação de jovens, agricultores e comunidades rurais em Angola, com o objetivo de promover a educação e a formação técnica que melhorem as práticas agrícolas, fomentem o empreendedorismo rural e aumentem a produtividade do seCtor agrícola.",
    category: "Release",
    content2: "Mais informações",
    icon: "/images/planar.png",
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    //  #2e2d2d   403b3b
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#403b3b]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={400}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[-5%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-20%] md:right-[0%] top-[85%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[-15%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[5%] md:right-[20%] top-[5%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[10%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className=" mx-auto text-center">
       
          <RadialOrbitalTimeline timelineData={timelineData} />

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4"></p>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

export { HeroGeometric };
