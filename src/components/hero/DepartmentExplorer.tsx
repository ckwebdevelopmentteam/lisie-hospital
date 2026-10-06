"use client";

import React, { KeyboardEvent, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  DepartmentExplorerItem,
  DEPARTMENT_EXPLORER_ITEMS,
} from "@/components/header/data/hospitalData";

interface DepartmentExplorerProps {
  departments?: DepartmentExplorerItem[];
}

export default function DepartmentExplorer({
  departments = DEPARTMENT_EXPLORER_ITEMS,
}: DepartmentExplorerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(departments[0]?.id ?? "");
  const activeIndex = Math.max(departments.findIndex((department) => department.id === activeId), 0);
  const activeDepartment = departments[activeIndex];

  if (!activeDepartment) return null;

  const selectDepartment = (id: string) => setActiveId(id);

  const handleNavigationKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const isPrevious = event.key === "ArrowUp" || event.key === "ArrowLeft";
    const isNext = event.key === "ArrowDown" || event.key === "ArrowRight";

    if (!isPrevious && !isNext && event.key !== "Home" && event.key !== "End") return;

    event.preventDefault();
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? departments.length - 1
          : (index + (isNext ? 1 : -1) + departments.length) % departments.length;
    const nextDepartment = departments[nextIndex];

    setActiveId(nextDepartment.id);
    requestAnimationFrame(() => {
      document.getElementById(`department-tab-${nextDepartment.id}`)?.focus();
    });
  };

  return (
    <section id="departments" className="border-t border-slate-100 bg-[#F8FAFC] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E31C59]">
            Dedicated services
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#123B63] sm:text-4xl">
            Our Departments
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Expert care across a wide range of medical specialties.
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(17rem,0.34fr)_minmax(0,0.66fr)] lg:gap-12">
          <div className="min-w-0 lg:relative lg:h-full">
            <div className="lg:absolute lg:inset-0 lg:flex lg:flex-col">
              <div className="flex shrink-0 items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-[#123B63]">Browse specialties</h3>
                <span className="text-xs font-medium text-slate-500">{departments.length} services</span>
              </div>

              <div
                role="tablist"
                aria-label="Lisie Hospital departments"
                aria-orientation="vertical"
                className="custom-scrollbar mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-1 lg:min-h-0 lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0 lg:pr-3"
              >
                {departments.map((department, index) => {
                  const isActive = department.id === activeDepartment.id;

                  return (
                    <button
                      key={department.id}
                      id={`department-tab-${department.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="department-showcase"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => selectDepartment(department.id)}
                      onKeyDown={(event) => handleNavigationKeyDown(event, index)}
                      className={`group flex min-h-11 min-w-[15rem] items-center gap-3 border-l-2 px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677B8] focus-visible:ring-offset-2 lg:min-w-0 ${
                        isActive
                          ? "border-[#E31C59] bg-[#E31C59]/[0.05] text-[#123B63]"
                          : "border-transparent text-slate-600 hover:border-slate-300 hover:bg-white hover:text-[#123B63]"
                      }`}
                    >
                      <span className={`w-6 shrink-0 text-xs font-bold ${isActive ? "text-[#E31C59]" : "text-slate-400"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-semibold leading-5">{department.name}</span>
                      <ArrowRight
                        className={`h-4 w-4 shrink-0 transition-transform ${isActive ? "translate-x-0 text-[#E31C59]" : "-translate-x-1 text-transparent group-hover:translate-x-0 group-hover:text-slate-400"}`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div id="department-showcase" role="tabpanel" aria-labelledby={`department-tab-${activeDepartment.id}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={activeDepartment.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-slate-200">
                  <motion.div
                    key={activeDepartment.image}
                    initial={{ opacity: 0.65, scale: shouldReduceMotion ? 1 : 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeDepartment.image}
                      alt={`${activeDepartment.name} at Lisie Hospital`}
                      fill
                      sizes="(max-width: 1023px) 100vw, 66vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#123B63]/45 to-transparent" />
                </div>

                <div className="border-b border-slate-200 py-6 sm:py-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#E31C59]">
                      {activeDepartment.group}
                    </span>
                    {activeDepartment.availability && (
                      <span className="border-l border-slate-300 pl-3 text-xs font-semibold text-slate-600">
                        {activeDepartment.availability}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-[#123B63] sm:text-3xl">
                    {activeDepartment.name}
                  </h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                    {activeDepartment.description}
                  </p>
                  <a
                    href={activeDepartment.href}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#1677B8] transition-colors hover:text-[#123B63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1677B8] focus-visible:ring-offset-2"
                  >
                    Explore Department
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
