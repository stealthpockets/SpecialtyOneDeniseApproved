import React, { useState } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import InteractiveMap from './components/InteractiveMap';
import TransactionTable from './components/TransactionTable';
import { transactions } from './data/transactions';
import { Transaction } from './types/Transaction';

function App() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleTransactionSelect = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  return (
    <div className="min-h-screen bg-sand">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <StatsOverview />
        
        <div className="grid grid-cols-1 gap-8 mb-8">
          <InteractiveMap 
            transactions={transactions} 
            selectedTransaction={selectedTransaction}
          />
        </div>
        
        <TransactionTable 
          transactions={transactions}
          onTransactionSelect={handleTransactionSelect}
        />
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-obsidian to-evergreen text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-display font-semibold mb-2">
            Specialty One Investment Brokerage
          </p>
          <p className="text-sm text-gray-300">
            We Sell What Generalist Brokers Don't Understand
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;