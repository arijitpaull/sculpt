"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Project, projects } from "@/data/projects";

const ProjectGallery = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const reversedProjects = [...projects].reverse();

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section id="projects" className="py-0">

      {/* Arrow buttons — desktop only, top right */}
      <div className="hidden md:flex justify-end px-6 mb-6 gap-2">
        <button
          onClick={() => carouselApi?.scrollPrev()}
          disabled={!canScrollPrev}
          className={`p-3 rounded-full border transition-all duration-300 ${
            canScrollPrev
              ? "border-[#EAEFFF] text-[#EAEFFF] hover:bg-[#EAEFFF] hover:text-[#101010]"
              : "border-[#252525] text-[#353535] cursor-not-allowed"
          }`}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => carouselApi?.scrollNext()}
          disabled={!canScrollNext}
          className={`p-3 rounded-full border transition-all duration-300 ${
            canScrollNext
              ? "border-[#EAEFFF] text-[#EAEFFF] hover:bg-[#EAEFFF] hover:text-[#101010]"
              : "border-[#252525] text-[#353535] cursor-not-allowed"
          }`}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>

      {/* Carousel — free drag, starts at left edge */}
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            dragFree: true,
            align: "start",
          }}
        >
          <CarouselContent className="-ml-4 pl-6">
            {reversedProjects.map((project: Project) => (
              <CarouselItem
                key={project.id}
                className="pl-4 basis-[280px] md:basis-[360px] lg:basis-[420px]"
              >
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="relative h-[420px] w-full overflow-hidden rounded-2xl md:h-[480px]">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#252525] to-[#151515]" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/40 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 md:p-8">
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-[#EAEFFF]/10 border border-[#EAEFFF]/15 text-[#EAEFFF]/70 text-xs rounded-full backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="text-xl font-semibold text-[#EAEFFF] mb-2 md:text-2xl">
                        {project.title}
                      </h3>

                      <p className="text-[#EAEFFF]/60 text-sm line-clamp-2 mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex items-center text-[#EAEFFF] text-sm font-medium">
                        View project
                        <ArrowRight className="ml-2 h-4 w-4 stransition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default ProjectGallery;