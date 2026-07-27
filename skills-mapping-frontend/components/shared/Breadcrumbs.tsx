import Link from "next/link";

interface BreadcrumbsProps {
  items: string[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className="flex items-center gap-2 text-[12px] text-[#6b7280]">
      {items.map((item, idx) => (
        <span key={item} className="flex items-center gap-2">
          {idx > 0 && (
            <svg
              className="w-3 h-3 text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {idx === items.length - 1 ? (
            <span className="font-medium text-gray-800">{item}</span>
          ) : (
            <Link
              href={idx === 0 ? "/" : idx === 1 ? "/sector/metals-engineering" : "#"}
              className="hover:text-[#1d3557] transition-colors"
            >
              {item}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
