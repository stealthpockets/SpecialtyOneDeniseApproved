import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '../components/ui/Button';
import TrackRecordStatsOverview from '../components/TrackRecord/TrackRecordStatsOverview';
import TrackRecordInteractiveMap from '../components/TrackRecord/TrackRecordInteractiveMap';
import TrackRecordTransactionTable from '../components/TrackRecord/TrackRecordTransactionTable';
import { transactions } from '../data/transactions';
import { Transaction } from '../types/Transaction';

const TrackRecordPage: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);

  const handleTransactionSelect = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleFilteredDataChange = (filtered: Transaction[]) => {
    setFilteredTransactions(filtered);
  };

  return (
    <>
      <Helmet>
        <title>Track Record | Specialty One Investment Brokerage</title>
        <meta name="description" content="Explore our track record in specialized commercial real estate transactions. Mobile homes, RV parks, and self-storage properties nationwide." />
        <meta property="og:title" content="Track Record | Specialty One Investment Brokerage" />
        <meta property="og:description" content="Explore our track record in specialized commercial real estate transactions. Mobile homes, RV parks, and self-storage properties nationwide." />
        <meta name="twitter:title" content="Track Record | Specialty One Investment Brokerage" />
        <meta name="twitter:description" content="Explore our track record in specialized commercial real estate transactions. Mobile homes, RV parks, and self-storage properties nationwide." />
      </Helmet>
      
      <div className="min-h-screen bg-sand">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-hero text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-sand">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                Proven Results. Selectively Shared.
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                We specialize in off-market transactions across mobile home communities, RV parks, and self-storage facilities. Below is a curated sample of successfully closed deals. Out of respect for client confidentiality—particularly in private, high-value sales—we've omitted pricing details. For a full portfolio or recent sales comps, reach out directly.
              </p>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <TrackRecordStatsOverview />
          <div className="grid grid-cols-1 gap-8 mb-8">
            <TrackRecordInteractiveMap 
              transactions={filteredTransactions} 
              selectedTransaction={selectedTransaction}
            />
          </div>
            <TrackRecordTransactionTable 
            transactions={transactions}
            onTransactionSelect={handleTransactionSelect}
            onFilteredDataChange={handleFilteredDataChange}
          />
        </main>

        {/* For Buyers */}
        <section className="py-16 bg-gradient-hero text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Serious Buyers See the Deal. The Internet Doesn't.
              </h2>
              <p className="text-lg mb-8 opacity-90">
                We don't email-blast sensitive details to 5,000 "investors."<br />
                If you're in our network, you'll see high-quality opportunities early—before they're over-shopped or priced down.<br />
                If you're not, you won't.
              </p>
              <Button 
                to="/exclusive-buyers"
                variant="primary"
                size="lg"
              >
                Apply for Buyer Access
              </Button>
              <p className="text-sm mt-4 opacity-75">
                We prioritize family offices, long-term buyers, and serious 1031 investors.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TrackRecordPage;
