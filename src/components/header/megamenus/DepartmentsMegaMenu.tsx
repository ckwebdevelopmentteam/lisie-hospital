"use client";

import React, { useState } from "react";
import {
  CLINICAL_SPECIALTIES,
  SURGICAL_SPECIALTIES,
  SUPER_SPECIALTY_CENTERS,
  DIAGNOSTIC_SUPPORT_SERVICES,
} from "../data/hospitalData";
import { ArrowRight, Search, ChevronRight } from "lucide-react";

interface DepartmentsMegaMenuProps {
  onClose: () => void;
}

export default function DepartmentsMegaMenu({ onClose }: DepartmentsMegaMenuProps) {
  const [filterQuery, setFilterQuery] = useState("");

  const filteredClinical = CLINICAL_SPECIALTIES.filter((item) =>
    item.name.toLowerCase().includes(filterQuery.toLowerCase())
  );
  const filteredSurgical = SURGICAL_SPECIALTIES.filter((item) =>
    item.name.toLowerCase().includes(filterQuery.toLowerCase())
  );
  const filteredSuper = SUPER_SPECIALTY_CENTERS.filter((item) =>
    item.name.toLowerCase().includes(filterQuery.toLowerCase())
  );
  const filteredSupport = DIAGNOSTIC_SUPPORT_SERVICES.filter((item) =>
    item.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div
      role="region"
      aria-label="Departments Mega Menu"
      className="w-full bg-white py-6 animate-in fade-in duration-150"
    >
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top utility row: Title, Search, View All */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#123B63]">
              Departments & Centers of Excellence
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Over 35 clinical and surgical disciplines providing ethical care with love.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Search departments..."
                aria-label="Search departments"
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#1677B8] focus:bg-white"
              />
            </div>

            <a
              href="/departments"
              onClick={onClose}
              className="inline-flex items-center space-x-1 text-xs font-semibold text-[#1677B8] hover:text-[#125F94] transition-colors shrink-0"
            >
              <span>View All Departments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-5">
          {/* Column 1: Clinical Specialties */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Clinical Specialties</span>
              <span className="text-[11px] text-gray-400 font-normal">
                ({filteredClinical.length})
              </span>
            </h3>
            <ul className="mt-3 space-y-1 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredClinical.map((dept) => (
                <li key={dept.name}>
                  <a
                    href={dept.href}
                    onClick={onClose}
                    className="group block p-1.5 rounded hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-800 group-hover:text-[#1677B8] transition-colors">
                        {dept.name}
                      </span>
                      <ChevronRight className="w-3 h-3 text-transparent group-hover:text-[#1677B8] transition-all transform group-hover:translate-x-0.5" />
                    </div>
                    <span className="text-[11px] text-gray-400 line-clamp-1 block">
                      {dept.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Surgical Specialties */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Surgical Specialties</span>
              <span className="text-[11px] text-gray-400 font-normal">
                ({filteredSurgical.length})
              </span>
            </h3>
            <ul className="mt-3 space-y-1 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredSurgical.map((dept) => (
                <li key={dept.name}>
                  <a
                    href={dept.href}
                    onClick={onClose}
                    className="group block p-1.5 rounded hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-800 group-hover:text-[#1677B8] transition-colors">
                        {dept.name}
                      </span>
                      <ChevronRight className="w-3 h-3 text-transparent group-hover:text-[#1677B8] transition-all transform group-hover:translate-x-0.5" />
                    </div>
                    <span className="text-[11px] text-gray-400 line-clamp-1 block">
                      {dept.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Super Specialties & Centers */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 pb-2 border-b border-gray-100 flex items-center justify-between">
              <span>Super Specialties & Centers</span>
              <span className="text-[11px] text-gray-400 font-normal">
                ({filteredSuper.length})
              </span>
            </h3>
            <ul className="mt-3 space-y-1 max-h-[340px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredSuper.map((dept) => (
                <li key={dept.name}>
                  <a
                    href={dept.href}
                    onClick={onClose}
                    className="group block p-1.5 rounded hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#123B63] group-hover:text-[#1677B8] transition-colors">
                        {dept.name}
                      </span>
                      <ChevronRight className="w-3 h-3 text-transparent group-hover:text-[#1677B8] transition-all transform group-hover:translate-x-0.5" />
                    </div>
                    <span className="text-[11px] text-gray-500 line-clamp-1 block">
                      {dept.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Diagnostic & Support Services */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600 block mb-1">
                Diagnostic & Support Services
              </span>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {filteredSupport.map((serv) => (
                  <a
                    key={serv.name}
                    href={serv.href}
                    onClick={onClose}
                    className="text-xs text-gray-600 hover:text-[#1677B8] transition-colors flex items-center space-x-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 inline-block" />
                    <span>{serv.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/emergency"
              onClick={onClose}
              className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1 self-start md:self-auto shrink-0 bg-red-50 hover:bg-red-100/70 px-3 py-1.5 rounded transition-colors"
            >
              <span>24/7 Emergency & Trauma Unit →</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
