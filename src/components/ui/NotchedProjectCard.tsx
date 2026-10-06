"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Calendar } from "lucide-react";

export interface NotchedProjectCardProps {
  href: string;
  title: string;
  description?: string;
  /** Cover photograph */
  image: string;
  imageAlt?: string;
  /** Top pill badge text */
  badge?: string;
  departmentNumber?: string;
  tags?: string[];
  /** Optional click handler for booking token */
  onBookClick?: (e: React.MouseEvent) => void;
  /** Background surface color of the section behind the card (for notch cut) */
  surface?: string;
  /** Disc fill color on hover */
  accent?: string;
  /** Arrow color on hover */
  accentForeground?: string;
  className?: string;
}

const DISC = 54; // Arrow disc diameter in px
const BLOCK = 70; // Notch block size in px (radius = BLOCK - DISC / 2)
const FILLET = 22; // Concave fillet radius where notch meets cover edge

export function NotchedProjectCard({
  href,
  title,
  description,
  image,
  imageAlt = "",
  badge,
  departmentNumber,
  tags = [],
  onBookClick,
  surface = "#F8FAFC",
  accent = "#E31C59",
  accentForeground = "#ffffff",
  className = "",
}: NotchedProjectCardProps) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col rounded-[24px] bg-transparent outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#E31C59] focus-visible:ring-offset-2 hover:-translate-y-1 ${className}`}
    >
      {/* Cover with Notch cutout */}
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-slate-200 shadow-sm border border-slate-200/60">
          <img
            src={image}
            alt={imageAlt || title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
            loading="lazy"
          />

          {/* Dark gradient wash for badge and notch contrast */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"
          />

          {/* Top Badges */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-3.5 z-10">
            {badge && (
              <span className="rounded-full border border-white/35 bg-black/45 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-md uppercase tracking-wider shadow-xs">
                {badge}
              </span>
            )}
            {departmentNumber && (
              <span className="rounded-full bg-[#E31C59] text-white px-2 py-0.5 text-[10px] font-extrabold shadow-xs ml-auto">
                {departmentNumber}
              </span>
            )}
          </div>
        </div>

        {/* The Notch: painted in the background surface color */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 z-10"
          style={{
            width: BLOCK,
            height: BLOCK,
            borderTopLeftRadius: BLOCK - DISC / 2,
            background: surface,
          }}
        />

        {/* Fillets at each end where the cut meets the cover's edges */}
        {[
          { bottom: BLOCK, right: 0 },
          { bottom: 0, right: BLOCK },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="pointer-events-none absolute z-10"
            style={{
              ...pos,
              width: FILLET,
              height: FILLET,
              background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, ${surface} ${FILLET}px)`,
            }}
          />
        ))}

        {/* The Arrow Disc nested in the notch */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 z-20 flex items-center justify-center rounded-full bg-white text-[#123B63] shadow-md border border-slate-200/80 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#E31C59] group-hover:text-white group-hover:border-[#E31C59]"
          style={
            {
              width: DISC,
              height: DISC,
              "--card-accent": accent,
              "--card-accent-fg": accentForeground,
            } as React.CSSProperties
          }
        >
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      {/* Content Below Cover */}
      <div className="flex-1 flex flex-col justify-between pt-3.5 px-1">
        <div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#123B63] group-hover:text-[#E31C59] transition-colors line-clamp-1">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          {/* Key Treatments / Procedure Tags */}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="rounded-md bg-white border border-slate-200/90 px-2 py-0.5 text-[10px] font-semibold text-slate-600 group-hover:border-[#E31C59]/30 group-hover:text-[#E31C59] transition-colors shadow-2xs"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="rounded-md bg-[#E31C59]/10 border border-[#E31C59]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#E31C59]">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
          {onBookClick ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onBookClick(e);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E31C59] hover:text-[#c4144b] transition-colors focus:outline-none"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Token</span>
            </button>
          ) : (
            <span />
          )}

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-[#123B63] transition-colors">
            <span>Explore Details</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default NotchedProjectCard;
