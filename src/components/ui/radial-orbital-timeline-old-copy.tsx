import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Logos3 } from "@/components/blocks/logos3";

// const demoData = {
//   logos: [
//     {
//       id: "logo-1",
//       description: "Astro",
//       image: "/images/inapem-logo.png",
//       className: "h-7 w-auto",
//     },
//     {
//       id: "logo-2",
//       description: "Figma",
//       image: "/images/nosso-saber.png",
//       className: "h-7 w-auto",
//     },
//     {
//       id: "logo-3",
//       description: "Next.js",
//       image: "/images/rede-inapem.png",
//       className: "h-7 w-auto",
//     },
//     {
//       id: "logo-4",
//       description: "React",
//       image: "/images/feito-angola.png",
//       className: "h-7 w-auto",
//     },
//     {
//       id: "logo-5",
//       description: "shadcn/ui",
//       image: "/images/rede-inapem.png",
//       className: "h-7 w-auto",
//     },
//     {
//       id: "logo-6",
//       description: "Supabase",
//       image: "/images/rede-inapem.png",
//       className: "h-7 w-auto",
//     },
//     {
//       id: "logo-7",
//       description: "Tailwind CSS",
//       image: "/images/rede-inapem.png",
//       className: "h-4 w-auto",
//     },
//     {
//       id: "logo-8",
//       description: "Vercel",
//       image: "/images/rede-inapem.png",
//       className: "h-7 w-auto",
//     },
//   ],
// };

interface TimelineItem {
  id: number;
  title: string;
  title_slong: string;
  date: string;
  content: string;
  content2: string;
  category: string;
  // icon: React.ElementType;
  icon: string;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 375;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-black border-white";
      case "in-progress":
        return "text-black bg-white border-black";
      case "pending":
        return "text-white bg-black/40 border-white/50";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* <img src="/images/inapem-favicon.png" alt="inapem" className="absolute top-17 left-89 w-15 h-15" /> */}
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center z-20"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center">
            <div className="absolute w-80 h-80 rounded-full border border-white/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-80 h-80 rounded-full border border-white/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-79 h-79 rounded-full bg-white/80 backdrop-blur-md overflow-hidden flex items-center justify-center">
              {/* <img src="/images/upe4.png" alt="inapem" className="w-full h-full object-contain" /> */}
              <img src="/images/inapem-logo-fn.png" alt="inapem" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* <div className="absolute w-96 h-96 rounded-full border border-white/10"></div> */}
          <div className="absolute w-181 h-181 rounded-full border border-white/10"></div>
          {/* <img src="/images/inapem-favicon.png" alt="inapem" className="w-15 h-15" /> */}

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            // const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer "
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                // w-10 h-10 rounded-full flex items-center justify-center
                  className={`
                  w-30 h-30 sm:w-30 sm:h-30 rounded-full flex items-center justify-center overflow-hidden bg-white
                  ${
                    isExpanded
                      ? "bg-white text-black"
                      : isRelated
                      ? "bg-white text-black"
                      : "bg-black text-white"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-white shadow-lg shadow-white/30"
                      : isRelated
                      ? "border-orange-300 animate-pulse"
                      : "border-white/40"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150 sm:scale-150" : ""}
                `}
                >
                  {/* <Icon size={16} /> */}
                  {/* <div className="w-8 h-8 flex items-center justify-center"> */}
                  <div className="w-25 h-25 flex items-center justify-center">
                    <img src={`${item.icon}`} alt="inapem" />
                  </div>
                </div>

                <div
                // top-12
                  className={`
                  absolute top-30 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-125" : "text-white/70"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  // w-64
                  <Card className="absolute top-40 left-1/2 -translate-x-1/2 w-68 bg-black/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                    <CardHeader className="p-5 pb-1">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "COMPLETO"
                            : item.status === "in-progress"
                            ? "EM ANDAMENTO"
                            : "PENDENTE"}
                        </Badge>
                        <span className="text-xs font-mono text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm text-white/80 font-semibold">
                        {item.title_slong}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-1 text-xs text-white/80">
                      <div>
                        <p className="text-left mb-2">{item.content}</p>
                        <p className="text-left">{item.content2}</p>
                        <p className="text-left text-xm text-orange-400 underline">
                          <a href="${item.link}" className="underline" target="_blank{}">Mais Informações</a>
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center">
                            <Zap size={10} className="mr-1" />
                            ESTADO DO PROJECTO
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">
                              CONECTADOS
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-white/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute z-1 w-[830px] h-[830px] animate-[spin_60s_linear_infinite] bg-transparent opacity-10 pointer-events-none">
          <img
            src="/images/globe1.png"
            // src="/images/inapem-ologo.png"
            alt="globe background"
            className="w-full h-full object-contain brightness-[1]"
          />
        </div>
      </div>
      {/* <Logos3 {...demoData} /> */}
    </div>
  );
}
