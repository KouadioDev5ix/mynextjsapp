import React, { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { twMerge } from "tailwind-merge";

// ── Types ──────────────────────────────────────────────────────
export interface Column<T> {
  key: keyof T;
  header: string;
  className?: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface Action<T> {
  icon: React.ReactNode;
  onClick: (row: T) => void;
  variant?: "default" | "danger";
  title?: string;
}

interface SmartTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  searchKeys?: (keyof T)[]; // champs sur lesquels chercher
  filterKey?: keyof T; // champ utilisé pour le filtre catégorie
  filterLabel?: string;
  filterPlaceholder?: string;
  searchPlaceholder?: string;
  getRowKey: (row: T) => string | number;
  itemsPerPage?: number;
}

// ── Composant ──────────────────────────────────────────────────
export function SmartTable<T extends Record<string, any>>({
  data,
  columns,
  actions,
  searchKeys = [],
  filterKey,
  filterLabel = "Filtrer par catégorie",
  filterPlaceholder = "Toutes",
  searchPlaceholder = "Rechercher...",
  getRowKey,
  itemsPerPage = 5,
}: SmartTableProps<T>) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  // ── Catégories uniques pour le select ────────────────────────
  const categories = useMemo(() => {
    if (!filterKey) return [];
    return [...new Set(data.map((row) => String(row[filterKey])))];
  }, [data, filterKey]);

  // ── Filtrage + recherche ─────────────────────────────────────
  const filtered = useMemo(() => {
    return data.filter((row) => {
      const matchSearch =
        !search ||
        searchKeys.some((key) =>
          String(row[key]).toLowerCase().includes(search.toLowerCase()),
        );
      const matchFilter =
        !filter || (filterKey && String(row[filterKey]) === filter);

      return matchSearch && matchFilter;
    });
  }, [data, search, filter, searchKeys, filterKey]);

  // ── Pagination ───────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  const currentPage = Math.min(page, totalPages);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const goTo = (p: number) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  // reset page quand le filtre change
  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };
  const handleFilter = (v: string) => {
    setFilter(v);
    setPage(1);
  };

  return (
    <div className="w-full">
      {/* ── Toolbar ─────────────────────────────────────────── */}
      <div className="flex gap-3 mb-5 flex-wrap">
        {searchKeys.length > 0 && (
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 h-10 flex-1 min-w-[180px]">
            <Search size={14} className="text-gray-400 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="border-none outline-none text-sm text-gray-700
                         placeholder:text-gray-400 w-full bg-transparent"
            />
          </div>
        )}

        {filterKey && (
          <div
            className="flex items-center gap-2 bg-white border border-gray-200
                          rounded-lg px-3 h-10 min-w-[200px]"
          >
            <Filter size={14} className="text-gray-400 flex-shrink-0" />
            <select
              value={filter}
              onChange={(e) => handleFilter(e.target.value)}
              className="border-none outline-none text-sm text-gray-700
                         flex-1 cursor-pointer bg-transparent"
            >
              <option value="">{filterPlaceholder}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* ── Tableau ──────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={twMerge(
                    "px-4 py-3 text-left text-xs font-medium text-gray-400",
                    "uppercase tracking-wide whitespace-nowrap",
                    col.className,
                  )}
                >
                  {col.header}
                </th>
              ))}
              {actions && (
                <th
                  className="px-4 py-3 text-right text-xs font-medium
                               text-gray-400 uppercase tracking-wide"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-12 text-gray-400 text-sm"
                >
                  Aucun article trouvé
                </td>
              </tr>
            ) : (
              paginated.map((row) => (
                <tr
                  key={getRowKey(row)}
                  className="border-t border-gray-100 hover:bg-gray-50
                             transition-colors duration-150"
                >
                  {columns.map((col) => {
                    const value = row[col.key];
                    return (
                      <td
                        key={String(col.key)}
                        className={twMerge("px-4 py-3", col.className)}
                      >
                        {col.render ? col.render(value, row) : value}
                      </td>
                    );
                  })}

                  {actions && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {actions.map((action, i) => (
                          <button
                            key={i}
                            title={action.title}
                            onClick={() => action.onClick(row)}
                            className={twMerge(
                              "w-7 h-7 rounded-md border border-gray-200",
                              "flex items-center justify-center transition-colors",
                              action.variant === "danger"
                                ? "hover:bg-red-50 hover:border-red-200"
                                : "hover:bg-gray-100",
                            )}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ───────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-1 mt-4">
          <button
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-md border border-gray-200 text-gray-500
                       hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed
                       flex items-center justify-center text-sm transition-colors"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goTo(p)}
              className={twMerge(
                "w-8 h-8 rounded-md border text-sm transition-colors",
                p === currentPage
                  ? "bg-green-800 border-green-800 text-white font-medium"
                  : "border-gray-200 text-gray-600 hover:bg-gray-100",
              )}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-md border border-gray-200 text-gray-500
                       hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed
                       flex items-center justify-center text-sm transition-colors"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
