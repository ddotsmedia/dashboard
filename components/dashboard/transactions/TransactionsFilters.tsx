'use client';

import { useState } from 'react';
import { Search, X, Menu, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterState {
  search: string;
  status: string[];
  type: string[];
  category: string[];
  account: string[];
  dateFrom: string;
  dateTo: string;
}

interface TransactionsFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  isLoading?: boolean;
}

/**
 * Transaction Filters Component
 * Horizontal filter UI with controls: Status, Type, Category, Account, Date range, Search
 * Collapsible on mobile
 */
export function TransactionsFilters({ onFilterChange, isLoading = false }: TransactionsFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: [],
    type: [],
    category: [],
    account: [],
    dateFrom: '',
    dateTo: '',
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const activeFilterCount = [
    filters.search,
    ...filters.status,
    ...filters.type,
    ...filters.category,
    ...filters.account,
    filters.dateFrom,
    filters.dateTo,
  ].filter(Boolean).length;

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleMultiSelect = (field: keyof Omit<FilterState, 'search' | 'dateFrom' | 'dateTo'>, value: string) => {
    const currentValues = filters[field] as string[];
    const newValues = currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value];

    handleFilterChange({
      ...filters,
      [field]: newValues,
    });
  };

  const handleReset = () => {
    const emptyFilters: FilterState = {
      search: '',
      status: [],
      type: [],
      category: [],
      account: [],
      dateFrom: '',
      dateTo: '',
    };
    setFilters(emptyFilters);
    setOpenDropdown(null);
    onFilterChange(emptyFilters);
  };

  const statusOptions = ['Draft', 'Posted', 'Reconciled'];
  const typeOptions = ['Revenue', 'Expense', 'Transfer', 'Payment', 'Receipt'];
  const categoryOptions = ['Product Sales', 'Service Revenue', 'Consulting Fees', 'Cost of Goods Sold', 'Salaries & Wages', 'Rent', 'Utilities'];
  const accountOptions = ['Operating Account', 'Savings Account', 'Petty Cash', 'AR Account', 'AP Account'];

  return (
    <div className="space-y-4">
      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-slate-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
        >
          <Menu size={18} />
          Filters {activeFilterCount > 0 && <span className="ml-1 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">{activeFilterCount}</span>}
        </button>
      </div>

      {/* Filters Container */}
      <div
        className={cn(
          'bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-4 space-y-4 md:space-y-0 md:flex md:items-end md:gap-3 md:flex-wrap',
          !isExpanded && 'hidden md:flex'
        )}
      >
        {/* Search Input */}
        <div className="flex-1 md:flex-none md:min-w-48">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2 block">Search</label>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search reference, description..."
              disabled={isLoading}
              value={filters.search}
              onChange={(e) =>
                handleFilterChange({
                  ...filters,
                  search: e.target.value,
                })
              }
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="md:min-w-32 relative">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2 block">Status</label>
          <button
            disabled={isLoading}
            onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
            className="w-full md:w-auto flex items-center justify-between gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
          >
            <span>{filters.status.length > 0 ? `${filters.status.length} selected` : 'All'}</span>
            <ChevronDown size={16} />
          </button>
          {openDropdown === 'status' && (
            <div className="absolute top-full mt-1 w-40 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg z-20">
              {statusOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-600 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(option)}
                    onChange={() => toggleMultiSelect('status', option)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Type Filter */}
        <div className="md:min-w-32 relative">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2 block">Type</label>
          <button
            disabled={isLoading}
            onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
            className="w-full md:w-auto flex items-center justify-between gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
          >
            <span>{filters.type.length > 0 ? `${filters.type.length} selected` : 'All'}</span>
            <ChevronDown size={16} />
          </button>
          {openDropdown === 'type' && (
            <div className="absolute top-full mt-1 w-40 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg z-20">
              {typeOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-600 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters.type.includes(option)}
                    onChange={() => toggleMultiSelect('type', option)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="md:min-w-32 relative">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2 block">Category</label>
          <button
            disabled={isLoading}
            onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
            className="w-full md:w-auto flex items-center justify-between gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
          >
            <span>{filters.category.length > 0 ? `${filters.category.length} selected` : 'All'}</span>
            <ChevronDown size={16} />
          </button>
          {openDropdown === 'category' && (
            <div className="absolute top-full mt-1 w-48 max-h-48 overflow-y-auto bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg z-20">
              {categoryOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-600 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters.category.includes(option)}
                    onChange={() => toggleMultiSelect('category', option)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Account Filter */}
        <div className="md:min-w-32 relative">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2 block">Account</label>
          <button
            disabled={isLoading}
            onClick={() => setOpenDropdown(openDropdown === 'account' ? null : 'account')}
            className="w-full md:w-auto flex items-center justify-between gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
          >
            <span>{filters.account.length > 0 ? `${filters.account.length} selected` : 'All'}</span>
            <ChevronDown size={16} />
          </button>
          {openDropdown === 'account' && (
            <div className="absolute top-full mt-1 w-48 max-h-48 overflow-y-auto bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg z-20">
              {accountOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-slate-600 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={filters.account.includes(option)}
                    onChange={() => toggleMultiSelect('account', option)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Date Range */}
        <div className="md:flex md:gap-2">
          <div className="md:flex-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2 block">From</label>
            <input
              type="date"
              disabled={isLoading}
              value={filters.dateFrom}
              onChange={(e) =>
                handleFilterChange({
                  ...filters,
                  dateFrom: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="md:flex-1">
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2 block">To</label>
            <input
              type="date"
              disabled={isLoading}
              value={filters.dateTo}
              onChange={(e) =>
                handleFilterChange({
                  ...filters,
                  dateTo: e.target.value,
                })
              }
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 md:flex-shrink-0">
          <button
            disabled={isLoading}
            onClick={handleReset}
            className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            <X size={16} />
            Reset
          </button>
        </div>

        {/* Active Filter Badge */}
        {activeFilterCount > 0 && (
          <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
            <span>{activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active</span>
          </div>
        )}
      </div>
    </div>
  );
}
