"use client";

import { motion } from "framer-motion";
// import { Circle } from "lucide-react";
// import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { useIsMobile } from "@/components/blocks/use-mobile";

const timelineData = [
  {
    id: 1,
    title: "Empreender",
    title_slong: "Impulsionando a Economia Criativa",
    date: "Jan 2025",
    content:
      "O RECRIA é um projecto inovador desenvolvido pelo INAPEM, com o objetivo de apoiar e promover o Empreendedorismo Criativo A iniciativa visa fomentar a criação, o desenvolvimento e a sustentabilidade de empresas que operam nos sectores da arte, design, moda, música, audiovisual, tecnologia criativa e outras áreas relacionadas à economia criativa.",
    content2:
      "O principal objetivo do projeto RECRIA é apoiar os empreendedores criativos ao longo do seu ciclo de vida, oferecendo suporte técnico, financeiro e formativo. Busca-se, assim, criar um ecossistema favorável para que as empresas criativas possam crescer, prosperar e competir no mercado local e internacional.",
    category: "Planning",
    link: "https://www.inapem.gov.ao/",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/recria.jpg",
    relatedIds: [2, 3],
    status: "in-progress" as const,
    energy: 15,
  },
  {
    id: 2,
    title: "Franquias",
    title_slong: "Replicação de Negócios Funcionais",
    date: "Jan 2025",
    content:
      "O Projecto REPLICA é uma iniciativa estratégica do INAPEM voltada à promoção do empreendedorismo emergente em Angola, por meio da replicação de negócios funcionais, organizados em modelos acessíveis de microfranquias, a proposta visa capacitar e inserir aspirantes a empreendedores em actividades econômicas já testadas e operacionais, fornecendo todo o suporte necessário para iniciar a operação com um risco reduzido.",
    content2: "Fomentar a criação de micro e pequenos negócios sustentáveis, com base em modelos replicáveis, promovendo o empreendedorismo assistido",
    category: "Planning",
    link: "https://www.inapem.gov.ao/",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/replica.png",
    relatedIds: [3, 4],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 3,
    title: "Turismo",
    title_slong: "Empreendedorismo Turístico",
    date: "Jan 2025",
    content: "Este projeto tem o objectivo de transformar o turismo em um dos principais motores de crescimento econômico Através do apoio às empresas locais, melhoria das infraestruturas e promoção da sustentabilidade, visa-se criar um sector turístico vibrante e competitivo, que gere emprego, renda e atraia investimentos, ao mesmo tempo em que valoriza o patrimônio e cultura angolana.",
    content2: "Temos como orientação estratégica, Incentivar o surgimento de novos negócios turísticos em diferentes segmentos. Apoiar os empreendedores com recursos financeiros, capacitação e networking. Contribuir para o desenvolvimento de destinos turísticos sustentáveis e inovadores. Criar empregos e fomentar a economia local através de novos negócios no sector de turismo.",
    category: "Planning",
    link: "https://www.inapem.gov.ao/",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/empreetur.jpg",
    relatedIds: [4, 5],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 4,
    title: "Sustentabilidade",
    title_slong: "Negócios sustentáveis",
    date: "Feb 2025",
    content:
      "O Projeto de Apoio às MPME voltadas à Sustentabilidade visa impulsionar o desenvolvimento de micro, pequenas e médias empresas (MPMEs) em Angola, com foco na implementação de práticas empresariais sustentáveis. O projeto é uma iniciativa estratégica para promover o crescimento responsável das MPMEs, alinhando-as com os princípios de sustentabilidade econômica, ambiental e social, visando não apenas a sua competitividade, mas também a contribuição para o desenvolvimento sustentável do país.",
    category: "Design",
    link: "https://www.inapem.gov.ao/",
    content2: "Com as crescentes demandas por responsabilidade ambiental e social, as MPMEs precisam adaptar seus modelos de negócios para serem mais competitivas e eficientes, ao mesmo tempo em que respeitam o meio ambiente e promovem a inclusão social. Este projeto visa oferecer o apoio necessário para que essas empresas se tornem mais sustentáveis, competitivas e resilientes no mercado global.",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/eco_mpme.jpg",
    relatedIds: [5, 6],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 5,
    title: "AgroPecuária",
    title_slong: "Programa de Apoio as Pequenas Indústrias",
    date: "Feb 2025",
    content: "É um programa desenvolvindo pelo INAPEM, com visão aos objectivos do PRODESI, que foi aprovado pelo Decreto Presidencial n.º 169/18 de 20 de Julho, este programa é vocacinado para o apoio à industrialização da produção agropecuária e extrativista de agricultores familiares, Associações, Cooperativas e MPMEs Agropecuárias a nível nacional.",
    category: "Development",
    content2: "O programa tem como objectivo geral disponibilizar um conjunto de soluções facilitadoras para o atendimento especializado nas Pequenas Agroindústrias nacionais com foco em processos produtivos, gestão e mercado, visando produtos processados que atendam as necessidades do mercado e sejam geradores de renda para estes empreendimentos.",
    link: "https://www.inapem.gov.ao/",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/proapi.jpg",
    relatedIds: [6, 7],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 6,
    title: "Investimento",
    title_slong: "Investir em startups",
    date: "Feb 2025",
    content: "O Projeto de Atração de Investimentos para Startups é uma iniciativa estratégica destinada a impulsionar o ecossistema de inovação e empreendedorismo O objetivo é criar um ambiente propício para o desenvolvimento de novas empresas, com foco na atração de investidores nacionais e internacionais para financiar startups inovadoras e de alto potencial de crescimento. Através deste projeto, buscamos fortalecer o papel das startups como motores de diversificação econômica, inovação e criação de emprego no país.",
    category: "Testing",
    link: "https://www.inapem.gov.ao/",
    content2: "O Projeto de Atração de Investimentos para Startups visa criar um ecossistema dinâmico e sustentável de startups em Angola, com foco na inovação e no desenvolvimento de soluções para os desafios locais e globais. Ao conectar empreendedores com investidores e fornecer os recursos necessários para o crescimento, o projeto contribuirá para a diversificação econômica de Angola, o fortalecimento da sua economia digital e a geração de empregos.",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/conectar.jpg",
    relatedIds: [7, 8],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 7,
    title: "Modernização",
    title_slong: "Projecto de Modernização da Gestão das Cooperativas",
    date: "Feb 2025",
    content: "O Projeto de Apoio, Gestão e Formalização de Cooperativas tem como objetivo principal fortalecer as cooperativas em Angola, promovendo sua formalização e capacitação para garantir sua sustentabilidade, competitividade e impacto positivo nas comunidades. Este projeto é uma iniciativa do Instituto Nacional de Apoio às Micro, Pequenas e Médias Empresas (INAPEM), com foco na melhoria da gestão e na integração das cooperativas no sistema econômico formal.",
    category: "Release",
    link: "https://cooperativas.gov.ao/",
    content2: "O projeto visa superar esses desafios por meio de apoio técnico, capacitação e estratégias para garantir a formalização e o bom funcionamento das cooperativas, promovendo sua inclusão no mercado formal e melhorando a qualidade de vida de seus membros",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/promove.jpg",
    relatedIds: [8, 9],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 8,
    title: "Incubadora",
    title_slong: "Aprendizado, Criação e Inovação ",
    date: "Feb 2025",
    content: "O CISU - Centro de Incubação de Startups Universitárias é uma iniciativa inovadora criada pelo INAPEM (Instituto Nacional de Apoio às Pequenas e Médias Empresas) em parceria com as universidades de Angola. Este centro visa apoiar e fomentar o empreendedorismo jovem, estimulando a criação de startups inovadoras e contribuindo para o desenvolvimento econômico e social do país. O CISU é uma plataforma estratégica para a transformação de ideias acadêmicas em negócios sustentáveis, com foco na geração de empregos e na diversificação da economia nacional.",
    category: "Release",
    link: "https://www.inapem.gov.ao/",
    content2: "O CISU tem como objectivo principal incentivar o empreendedorismo nas universidades de Angola, empreendedores as ferramentas necessárias para transformar suas ideias em empresas viáveis, o centro irá apoiar desde a fase inicial das startups até a sua maturação, oferecendo infraestrutura, mentoria, treinamento e apoio financeiro. A iniciativa visa criar um ecossistema inovador que promova a inovação tecnológica, a geração de empregos e a inclusão social.",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/cisu.jpg",
    relatedIds: [9, 10],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 9,
    title: "Acessibilidade",
    title_slong: "Gabinete de Apoio ao Empreendedoris",
    date: "Feb 2025",
    content: "O Gabinete de Apoio ao Empreendedor Local “GAEL” é uma iniciativa do INAPEM em parceria com os Governos Provinciais e o Ministério da Administração do Território. A missão do GAEL é fomentar o empreendedorismo local, oferecendo suporte técnico, formaliação, consultoria, assistência Técnica, capacitação e acesso a informações e recursos financeiros disponíveis para o formento do empreendedorismo e boas práticas de Gestão de pequenos negócios.",
    category: "Release",
    link: "https://www.inapem.gov.ao/",
    content2: "Ser o principal ponto de apoio e referência para o empreendedor local, reconhecido pela sua capacidade de estimular e apoiar iniciativas empresariais de sucesso, alinhadas às necessidades da comunidade e aos desafios do mercado global. O GAEL é um Gabinete Integrado, visa apoiar o empreendedor em todas as fases do seu negócio, desde a ideia inicial até a expansão da empresa, reúnrá uma variedade de serviços essenciais para o sucesso dos empreendedores em um único local. Isso facilita o acesso a recursos, como:",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/gael.png",
    relatedIds: [10, 11],
    status: "in-progress" as const,
    energy: 10, 
  },
  {
    id: 10,
    title: "Capacitação",
    title_slong: "Projecto Nacional de Aprendizagem Rural",
    date: "Feb 2025",
    content: "O Projeto de Aprendizagem Rural é uma iniciativa voltada para o desenvolvimento de competências e capacitação de jovens, agricultores e comunidades rurais em Angola, com o objetivo de promover a educação e a formação técnica que melhorem as práticas agrícolas, fomentem o empreendedorismo rural e aumentem a produtividade do seCtor agrícola.",
    category: "Release",
    link: "https://www.inapem.gov.ao/",
    content2: "Desenvolver as Boas Práticas Agrícolas para uma produção de alimentos de qualidade e com a sustentabilidade dos recursos naturais e protecção do meio ambiente.",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/planar.png",
    relatedIds: [11, 12],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 11,
    title: "Biotecnologia",
    title_slong: "Inovação no Agronegócio",
    date: "Feb 2025",
    content: "O CENAGRO é o primeiro centro de apoio e Inovação e Desenvolvimento do Agronegócio em Angola, tutelado pela INAPEM, surge para apoiar o nascimento e desenvolvimento das MPME e startups com foco orientado as soluções para o agronegócio, especialmente dedicado a iniciativas de inovação seja a agricultura, a agroindústria, outros serviços e tecnologias de suporte.",
    category: "Release",
    link: "https://www.inapem.gov.ao/",
    content2: "O CENAGRO actuará como um facilitador de conhecimento, promovendo a integração de tecnologias de ponta com práticas agrícolas eficientes, sustentáveis e que agreguem valor a toda a cadeia produtiva.",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/cenagro.png",
    relatedIds: [12, 13],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 12,
    title: "Juvenil",
    title_slong: "Juventude que empreende hoje é a força que transforma o amanhã",
    date: "Feb 2025",
    content: "O Projeto RJE foi concebido com o propósito de fomentar o empreendedorismo juvenil Esta rede nacional surge como um mecanismo estruturado de apoio à juventude empreendedora, promovendo capacitação, assistência técnica, acesso a mercados e financiamento, além de facilitar intercâmbios e conexões estratégicas.",
    category: "Release",
    link: "https://www.inapem.gov.ao/",
    content2: "Fomentar o ecossistema do empreendedorismo juvenil em Angola através de uma rede nacional de apoio, com foco no desenvolvimento de competências, na criação de oportunidades de negócio e no fortalecimento da autonomia económica da juventude.",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/rje.jpeg",
    relatedIds: [13, 14],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 13,
    title: "Aprendizagem",
    title_slong: "Educar e capacitar no campo é semear conhecimento",
    date: "Feb 2025",
    content: "O Projeto de Aprendizagem Rural é uma iniciativa voltada para o desenvolvimento de competências e capacitação de jovens, agricultores e comunidades rurais em Angola, com o objetivo de promover a educação e a formação técnica que melhorem as práticas agrícolas, fomentem o empreendedorismo rural e aumentem a produtividade do seCtor agrícola.",
    category: "Release",
    link: "https://www.inapem.gov.ao/",
    content2: "Transformar o agronegócio, impulsionando a inovação e o desenvolvimento sustentável, ao oferecer soluções práticas e tecnológicas que melhorem a produtividade, a rentabilidade e a competitividade dos nossos parceiros no sector.",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/bonase.png",
    relatedIds: [14, 15],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 14,
    title: "Inclusão",
    title_slong: "Empreender é mais do que criar negócios",
    date: "Feb 2025",
    content: "INCLUI É um projecto estratégico voltado para a promoção da inclusão socioeconômica por meio do fomento ao empreendedorismo, especialmente entre grupos sociais vulneráveis, como jovens, mulheres, pessoas com deficiência e comunidades marginalizadas.",
    category: "Release",
    link: "https://www.inapem.gov.ao/",
    content2: "Desenvolver as Boas Práticas em projecto estratégico.",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/inclui.png",
    relatedIds: [15, 16],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 15,
    title: "Fortalecer",
    title_slong: "Fomento Empresarial no Corredor do Lobito",
    date: "Feb 2025",
    content: "O projecto busca promover a formalização, capacitação, acesso ao financiamento e a melhoria das condições operacionais das empresas locais, fortalecendo a cadeia produtiva regional, incentivando a criação de empregos e contribuindo para o crescimento sustentável e integrado da economia provincial e nacional, Deesenvolvimento empresarial na zona do Corredor do Lobito, com foco em logística, agroindústria e serviços.",
    category: "Release",
    link: "https://www.inapem.gov.ao/",
    content2: "Fortalecer empresas locais é impulsionar comunidades inteiras rumo a um futuro mais próspero, sustentável e cheio de oportunidades.",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/profecol.jpeg",
    relatedIds: [16, 1],
    status: "in-progress" as const,
    energy: 10,
  },
  {
    id: 16,
    title: "Inovação",
    title_slong: "Apoio às MPME no Setor da Saúde",
    date: "Feb 2025",
    content: "É um projecto estratégico dedicado ao fortalecimento das Micro, Pequenas e Médias Empresas (MPME) que actuam no sector da saúde, seu principal objectivo é promover a sustentabilidade, crescimento e inovação dessas empresa, o projecto busca contribuir para a melhoria da oferta de serviços e produtos de saúde, estimulando a formalização, a competitividade e o desenvolvimento socioeconômico do setor.",
    category: "Release",
    link: "https://www.inapem.gov.ao/",
    content2: "Apoiar pequenas empresas na saúde é inovar com propósito — é cuidar da economia enquanto se transforma vidas.",
    icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/empreesau.jpg",
    relatedIds: [1, 2],
    status: "in-progress" as const,
    energy: 10,
  },
  // {
  //   id: 17,
  //   title: "Bonase",
  //   title_slong: "Projecto Nacional de Aprendizagem Rural",
  //   date: "Feb 2025",
  //   content: "O Projeto de Aprendizagem Rural é uma iniciativa voltada para o desenvolvimento de competências e capacitação de jovens, agricultores e comunidades rurais em Angola, com o objetivo de promover a educação e a formação técnica que melhorem as práticas agrícolas, fomentem o empreendedorismo rural e aumentem a produtividade do seCtor agrícola.",
  //   category: "Release",
  //   link: "https://www.inapem.gov.ao/",
  //   content2: "Desenvolver as Boas Práticas Agrícolas para uma produção de alimentos de qualidade e com a sustentabilidade dos recursos naturais e protecção do meio ambiente.",
  //   icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/bonase.png",
  //   relatedIds: [1, 2],
  //   status: "in-progress" as const,
  //   energy: 10,
  // },
  // {
  //   id: 18,
  //   title: "Bonase",
  //   title_slong: "Projecto Nacional de Aprendizagem Rural",
  //   date: "Feb 2025",
  //   content: "O Projeto de Aprendizagem Rural é uma iniciativa voltada para o desenvolvimento de competências e capacitação de jovens, agricultores e comunidades rurais em Angola, com o objetivo de promover a educação e a formação técnica que melhorem as práticas agrícolas, fomentem o empreendedorismo rural e aumentem a produtividade do seCtor agrícola.",
  //   category: "Release",
  //   link: "https://www.inapem.gov.ao/",
  //   content2: "Desenvolver as Boas Práticas Agrícolas para uma produção de alimentos de qualidade e com a sustentabilidade dos recursos naturais e protecção do meio ambiente.",
  //   icon: "https://posbucket.nyc3.cdn.digitaloceanspaces.com/images/bonase.png",
  //   relatedIds: [1, 2],
  //   status: "in-progress" as const,
  //   energy: 10,
  // },
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
  const isMobile = useIsMobile();
  // const fadeUpVariants = {
  //   hidden: { opacity: 0, y: 30 },
  //   visible: (i: number) => ({
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 5,
  //       delay: 0.5 + i * 0.2,
  //       ease: [0.25, 0.4, 0.25, 1],
  //     },
  //   }),
  // };

  return (
    //  #2e2d2d   403b3b
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#4d4747]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        {!isMobile && (
            <ElegantShape
              delay={0.3}
              width={400}
              height={140}
              rotate={12}
              gradient="from-indigo-500/[0.15]"
              className="left-[-10%] md:left-[-5%] top-[-5%] md:top-[20%]"
            />
        )}

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

      <div className="relative z-10 container mx-auto">
       
          <RadialOrbitalTimeline timelineData={timelineData} />

          {/* <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base text-center sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
            </p>
          </motion.div> */}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

export { HeroGeometric };
