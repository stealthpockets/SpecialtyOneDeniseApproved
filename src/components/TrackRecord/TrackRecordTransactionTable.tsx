import React, { useState, useMemo, useEffect } from 'react';
import { ChevronUp, ChevronDown, Filter, Search } from 'lucide-react';
import { Transaction, CLASSIFICATION_MAP } from '../../types/Transaction';

interface TransactionTableProps {
  transactions: Transaction[];
  onTransactionSelect?: (transaction: Transaction) => void;
  onFilteredDataChange?: (filteredTransactions: Transaction[]) => void;
}

type SortField = keyof Transaction;
type SortDirection = 'asc' | 'desc';

const TrackRecordTransactionTable: React.FC<TransactionTableProps> = ({ 
  transactions, 
  onTransactionSelect,
  onFilteredDataChange
}) => {
  const [sortField, setSortField] = useState<SortField>('property');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterClassification, setFilterClassification] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }  };

  // Helper function to get units value for sorting
  const getUnitsValue = (transaction: Transaction): number => {
    // For SS properties, use the units field if available
    if (transaction.classification === 'SS' && transaction.units) {
      return transaction.units;
    }
    // For MH and RV, use size_nrsf as units if no separate units field exists
    if ((transaction.classification === 'MH' || transaction.classification === 'RV') && !transaction.units && transaction.size_nrsf) {
      return transaction.size_nrsf;
    }
    // If there's a units field, use it
    if (transaction.units) {
      return transaction.units;
    }
    return 0; // Return 0 for sorting purposes when no units are available
  };

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;

    // Apply classification filter
    if (filterClassification !== 'all') {
      filtered = filtered.filter(t => t.classification === filterClassification);
    }    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(t => {
        const searchLower = searchTerm.toLowerCase();
        
        // Search in property name and address
        const basicMatch = t.property.toLowerCase().includes(searchLower) ||
                          t.address.toLowerCase().includes(searchLower);
        
        // Search in classification labels
        const classificationMatch = CLASSIFICATION_MAP[t.classification].label.toLowerCase().includes(searchLower);
        
        // Search in size (for SS properties)
        const sizeMatch = t.size_nrsf && 
                         (t.classification === 'SS') && 
                         t.size_nrsf.toString().includes(searchTerm);
        
        // Search in units (considering our logic for MH/RV vs SS)
        const unitsMatch = (() => {
          if (t.classification === 'SS' && t.units) {
            return t.units.toString().includes(searchTerm);
          }
          if ((t.classification === 'MH' || t.classification === 'RV') && !t.units && t.size_nrsf) {
            return t.size_nrsf.toString().includes(searchTerm);
          }
          if (t.units) {
            return t.units.toString().includes(searchTerm);
          }
          return false;
        })();
        
        return basicMatch || classificationMatch || sizeMatch || unitsMatch;
      });
    }    // Apply sorting
    return filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;
      
      // Special handling for units field
      if (sortField === 'units') {
        aValue = getUnitsValue(a);
        bValue = getUnitsValue(b);
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }
      
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
      
      let comparison = 0;
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });  }, [transactions, sortField, sortDirection, filterClassification, searchTerm]);
  // Notify parent component when filtered data changes
  useEffect(() => {
    onFilteredDataChange?.(filteredAndSortedTransactions);  }, [filteredAndSortedTransactions, onFilteredDataChange]);

  const formatSize = (size?: number, classification?: string) => {
    if (!size) return '—';
    // For MH and RV, don't show size_nrsf as it represents units
    if (classification === 'MH' || classification === 'RV') return '—';
    return size.toLocaleString();
  };

  const formatUnits = (transaction: Transaction) => {
    // For SS properties, use the units field if available
    if (transaction.classification === 'SS' && transaction.units) {
      return transaction.units.toLocaleString();
    }
    // For MH and RV, use size_nrsf as units if no separate units field exists
    if ((transaction.classification === 'MH' || transaction.classification === 'RV') && !transaction.units && transaction.size_nrsf) {
      return transaction.size_nrsf.toLocaleString();
    }
    // If there's a units field, use it
    if (transaction.units) {
      return transaction.units.toLocaleString();
    }
    return '—';
  };

  const SortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    if (sortField !== field) return <ChevronUp className="w-4 h-4 text-gray-400" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-plum" /> : 
      <ChevronDown className="w-4 h-4 text-plum" />;
  };
  return (
    <div className="bg-white rounded-xl shadow-card">
      <div className="bg-gradient-to-r from-sand to-cloud p-6 text-charcoal">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold mb-2">Transaction Details</h2>
            <p className="text-charcoal/80 font-medium">
              Showing {filteredAndSortedTransactions.length} of {transactions.length} completed transactions
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white/80 backdrop-blur-sm text-charcoal placeholder-gray-500 focus:ring-2 focus:ring-plum focus:border-plum transition-all duration-300"
              />
            </div>
            
            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <select
                value={filterClassification}
                onChange={(e) => setFilterClassification(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg text-sm bg-white/80 backdrop-blur-sm text-charcoal focus:ring-2 focus:ring-plum focus:border-plum appearance-none transition-all duration-300"
              >
                <option value="all" className="text-charcoal">All Types</option>
                {Object.entries(CLASSIFICATION_MAP).map(([key, info]) => (
                  <option key={key} value={key} className="text-charcoal">{info.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-sand to-cloud">
            <tr>
              <th 
                className="px-6 py-4 text-left text-xs font-display font-bold text-obsidian uppercase tracking-wider cursor-pointer hover:bg-plum/10 transition-colors"
                onClick={() => handleSort('property')}
              >
                <div className="flex items-center space-x-1">
                  <span>Property</span>
                  <SortIcon field="property" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-display font-bold text-obsidian uppercase tracking-wider cursor-pointer hover:bg-plum/10 transition-colors"
                onClick={() => handleSort('address')}
              >
                <div className="flex items-center space-x-1">
                  <span>Location</span>
                  <SortIcon field="address" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-display font-bold text-obsidian uppercase tracking-wider cursor-pointer hover:bg-plum/10 transition-colors"
                onClick={() => handleSort('classification')}
              >
                <div className="flex items-center space-x-1">
                  <span>Type</span>
                  <SortIcon field="classification" />
                </div>
              </th>
              <th 
                className="px-6 py-4 text-left text-xs font-display font-bold text-obsidian uppercase tracking-wider cursor-pointer hover:bg-plum/10 transition-colors"
                onClick={() => handleSort('size_nrsf')}
              >
                <div className="flex items-center space-x-1">
                  <span>Size (NRSF)</span>
                  <SortIcon field="size_nrsf" />
                </div>
              </th>              <th 
                className="px-6 py-4 text-left text-xs font-display font-bold text-obsidian uppercase tracking-wider cursor-pointer hover:bg-plum/10 transition-colors"
                onClick={() => handleSort('units')}
              >
                <div className="flex items-center space-x-1">
                  <span>Units</span>
                  <SortIcon field="units" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {filteredAndSortedTransactions.map((transaction, index) => (
              <tr 
                key={index}
                className="hover:bg-gradient-to-r hover:from-plum/5 hover:to-amethyst/5 transition-all duration-300 cursor-pointer group"
                onClick={() => onTransactionSelect?.(transaction)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-obsidian group-hover:text-plum transition-colors">
                    {transaction.property}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-evergreen font-medium">{transaction.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${CLASSIFICATION_MAP[transaction.classification].bgColor} ${CLASSIFICATION_MAP[transaction.classification].color}`}>
                    {CLASSIFICATION_MAP[transaction.classification].label}
                  </span>
                </td>                <td className="px-6 py-4 whitespace-nowrap text-sm text-evergreen font-medium">
                  {formatSize(transaction.size_nrsf, transaction.classification)}
                </td>                <td className="px-6 py-4 whitespace-nowrap text-sm text-evergreen font-medium">
                  {formatUnits(transaction)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredAndSortedTransactions.length === 0 && (
        <div className="text-center py-16">
          <div className="text-evergreen/60 text-lg font-medium">No transactions found matching your criteria.</div>
          <p className="text-sm text-evergreen/40 mt-2">Try adjusting your search or filter settings.</p>
        </div>
      )}
    </div>
  );
};

export default TrackRecordTransactionTable;
