import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/components/blocks/use-mobile";

interface TimelineItem {
  id: number;
  title: string;
  title_slong: string;
  date: string;
  content: string;
  content2: string;
  link: string;
  category: string;
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
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
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
    // Responsive radius based on screen size
    const radius = isMobile ? 160 : 375;
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

  // Calculate sizes based on screen
  const centerSize = isMobile ? "w-30 h-30" : "w-80 h-80";
  const orbitSize = isMobile ? "w-82 h-82" : "w-181 h-181";
  const globeSize = isMobile ? "w-93 h-93" : "w-full max-w-[830px] h-auto";
  const nodeSize = isMobile ? "w-14 h-14" : "w-30 h-30";
  const nodeIconSize = isMobile ? "w-17 h-17" : "w-26 h-26";
  const expandedNodeScale = isMobile ? "scale-150 sm:scale-150" : "scale-150 sm:scale-150";
  const cardWidth = isMobile ? "w-70 max-w-[90vw]" : "w-80";
  const cardTop = isMobile ? "top-20" : "top-40";

  return (
    <div
      // className="main h-screen w-full my-auto flex flex-col items-center justify-center bg-transparent overflow-hidden"
      className="main min-h-screen md:h-screen flex flex-col items-center justify-center bg-transparent overflow-x-hidden pb-20 md:pb-0"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center z-20"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center orbit circle */}
          <div className={`absolute ${centerSize} rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center`}>
            <div className={`absolute ${centerSize} rounded-full border border-white/20 animate-ping opacity-70`}></div>
            <div
              className={`absolute ${centerSize} rounded-full border border-white/10 animate-ping opacity-50`}
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className={`${isMobile ? "w-29 h-29" : "w-79 h-79"} rounded-full bg-white/80 backdrop-blur-md overflow-hidden flex items-center justify-center`}>
              <img src="/images/inapem-logo-fn.png" alt="inapem" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Orbit line */}
          <div className={`absolute ${orbitSize} rounded-full border border-white/10`}></div>

          {/* Timeline nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Pulse effect background */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                    width: `${(isMobile ? 0.3 : 0.5) * item.energy + (isMobile ? 25 : 40)}px`,
                    height: `${(isMobile ? 0.3 : 0.5) * item.energy + (isMobile ? 25 : 40)}px`,
                    left: `-${((isMobile ? 0.3 : 0.5) * item.energy + (isMobile ? 25 : 40) - (isMobile ? 25 : 40)) / 2}px`,
                    top: `-${((isMobile ? 0.3 : 0.5) * item.energy + (isMobile ? 25 : 40) - (isMobile ? 25 : 40)) / 2}px`,
                  }}
                ></div>

                {/* Node circle */}
                <div
                  className={`
                  ${nodeSize} rounded-full flex items-center justify-center overflow-hidden
                  ${
                    isExpanded
                      ? "bg-white text-black"
                      : isRelated
                      ? "bg-white text-black"
                      : "bg-white text-white"
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
                  ${isExpanded ? expandedNodeScale : ""}
                `}
                >
                  <div className={`${nodeIconSize} flex items-center justify-center`}>
                    <img src={`${item.icon}`} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Node title */}
                <div
                  className={`
                  absolute ${isMobile ? "top-14" : "top-30"} left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-white scale-125" : "text-white/70"}
                `}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card 
                    className={`absolute ${cardTop} left-1/2 -translate-x-1/2 ${cardWidth} 
                      bg-black/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 
                      overflow-visible z-50`}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                    <CardHeader className={`p-5 pb-1`}>
                      <div className="flex justify-between items-center flex-wrap gap-2">
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
                      <CardTitle className="text-sm text-center text-white/80 font-semibold mt-2">
                        {item.title_slong}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className={`p-5 pt-1 text-xs text-white/80`}>
                      <div>
                        <p className="text-left mb-2">{item.content}</p>
                        <p className="text-left">{item.content2}</p>
                        <p className="text-left text-xm text-orange-400 mt-2">
                          <a href={item.link} className="underline" target="_blank">
                            Mais Informações
                          </a>
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
        <div className={`absolute z-1 ${globeSize} aspect-circle animate-[spin_60s_linear_infinite] bg-transparent opacity-10 pointer-events-none`}>
          {/* ${isMobile ? "w-29 h-29" : "w-79 h-79"}  w-full max-w-[830px] h-auto */}
          <img
            src="/images/globe1.png"
            alt="globe background"
            className="w-full h-full object-contain brightness-[1]"
          />
        </div>
      </div>
    </div>
  );
}