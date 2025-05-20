
import { Code, FileText, User, Clock } from "lucide-react";
// import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

const timelineData = [
  {
    id: 1,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    // icon: Calendar,
    icon: '/image/recria.jpg',
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
   {
    id: 2,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    // icon: Calendar,
    icon: '/image/replica.jpg',
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
   {
    id: 3,
    title: "Planning",
    date: "Jan 2024",
    content: "Project planning and requirements gathering phase.",
    category: "Planning",
    // icon: Calendar,
    icon: '/image/empreetur.jpg',
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 4,
    title: "Design",
    date: "Feb 2024",
    content: "Foi criado com o propósito de impulsionar o sector agropecuário por meio de inovação, pesquisa e soluções tecnológicas que atendam às necessidades dos produtores rurais e empresários do agronegócio. O Centro busca criar um ambiente de colaboração entre produtores, empresas de tecnologia, universidades, governos e outras instituições para promover a sustentabilidade, eficiência e competitividade no scetor agrícola e agroindustrial de Angola.",
    category: "Design",
    icon: '/image/eco_mpme.jpg',
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 5,
    title: "Development",
    date: "Mar 2024",
    content: "Core features implementation and testing.",
    category: "Development",
    icon: '/image/proapi.jpg',
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 6,
    title: "Testing",
    date: "Apr 2024",
    content: "User testing and bug fixes.",
    category: "Testing",
    icon: '/image/conectar.jpg',
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 7,
    title: "Release",
    date: "May 2024",
    content: "Final deployment and release.",
    category: "Release",
    icon: '/image/promove.jpg',
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];


// export function RadialOrbitalTimelineDemo() {
//   return (
//     <>
//       <RadialOrbitalTimeline timelineData={timelineData} />
//     </>
//   );
// }

export function DemoHeroGeometric() {
    return <HeroGeometric badge="" title1="" title2="U.P.E" />
}

export default {
  DemoHeroGeometric,
  // RadialOrbitalTimelineDemo,
};

