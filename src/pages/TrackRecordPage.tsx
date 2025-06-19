import React, { useState } from 'react';
import { SEOHead } from '../components/ui/SEOHead';
import { SocialShare } from '../components/ui/SocialShare';
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
      <SEOHead
        title="Track Record | Specialty One Investment Brokerage"
        description="Explore our track record in specialized commercial real estate transactions. Mobile homes, RV parks, and self-storage properties nationwide with $1B+ in closed deals."
        keywords="commercial real estate track record, manufactured housing sales, RV park transactions, self storage deals, CRE brokerage results, specialty property sales"
        url="https://specialtyone.com/track-record"
        image="/assets/property-types/manufactured-housing-community-investment.webp"
      />
        <div className="min-h-screen bg-luxury-dark">
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-luxury-dark opacity-95"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="heading-luxury text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[0.9]">
                Proven Results. 
                <span className="block text-luxury-light">Selectively Shared.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
                As a leading expert in mobile home communities, RV parks, and self-storage facilities, we position owners for optimal outcomes in acquisitions and dispositions. Our proven track record maximizes value and ensures seamless transactions. Below is a curated selection of our successfully closed deals. To honor client confidentiality, especially for private, high-value sales, pricing details are excluded.


              </p>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="mb-16">
            <TrackRecordStatsOverview />
          </div>
          <div className="grid grid-cols-1 gap-12 mb-16">
            <TrackRecordInteractiveMap 
              transactions={filteredTransactions} 
              selectedTransaction={selectedTransaction}
            />
          </div>
          <div className="mb-16">
            <TrackRecordTransactionTable 
              transactions={transactions}
              onTransactionSelect={handleTransactionSelect}
              onFilteredDataChange={handleFilteredDataChange}
            />
          </div>        </main>
        
        {/* For Buyers */}
        <section className="py-24 bg-gradient-luxury-dark">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-luxury text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Serious Buyers See the Deal. 
                <span className="block text-luxury-light">The Internet Doesn't.</span>
              </h2>
              <p className="text-xl mb-12 text-white/90 leading-relaxed max-w-3xl mx-auto">
                We don't email-blast sensitive details to 5,000 "investors."<br />
                If you're in our network, you'll see high-quality opportunities early—before they're over-shopped or priced down.<br />
                If you're not, you won't.
              </p>
              <div className="mt-8 text-center">
              <a
                href="https://form.typeform.com/to/WrlZurI2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Apply for Buyer Access
              </a>
            </div>
              <p className="text-base text-white/75">
                We prioritize family offices, long-term buyers, and serious 1031 investors.
              </p>
            </div>
          </div>
        </section>

        {/* Social Share Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-obsidian mb-4">
                Share Our Track Record
              </h3>
              <p className="text-gray-600 mb-8">
                Help others discover our proven results in alternative real estate investments - $1B+ in transactions.
              </p>
              <SocialShare 
                url="https://specialtyone.com/track-record"
                title="$1B+ Track Record in Alternative Real Estate | Specialty One"
                description="Explore our proven track record in alternative real estate investments - manufactured housing, RV parks, and self-storage transactions."
                variant="large"
                className="justify-center"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TrackRecordPage;
