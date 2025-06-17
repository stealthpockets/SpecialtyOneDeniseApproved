import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Transaction, CLASSIFICATION_MAP } from '../types/Transaction';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  transactions: Transaction[];
  selectedTransaction?: Transaction | null;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ transactions, selectedTransaction }) => {
  const mapRef = useRef<L.Map | null>(null);

  // Create custom icons for different property types with brand colors
  const createCustomIcon = (classification: string) => {
    const colors = {
      MH: '#1a473a', // evergreen
      RV: '#8a0067', // plum
      SS: '#500f61'  // amethyst
    };
    
    return L.divIcon({
      html: `<div style="background-color: ${colors[classification as keyof typeof colors]}; width: 24px; height: 24px; border-radius: 50%; border: 4px solid white; box-shadow: 0 4px 8px rgba(0,0,0,0.3); position: relative;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 8px; height: 8px; background-color: white; border-radius: 50%;"></div>
      </div>`,
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Price not disclosed';
    return `$${(price / 1000000).toFixed(2)}M`;
  };

  const formatSize = (size?: number) => {
    if (!size) return '';
    return `${size.toLocaleString()} NRSF`;
  };

  useEffect(() => {
    if (selectedTransaction && mapRef.current) {
      mapRef.current.setView([selectedTransaction.latitude, selectedTransaction.longitude], 12);
    }
  }, [selectedTransaction]);

  return (
    <div className="shadow-card overflow-hidden slide-up" style={{ animationDelay: '0.4s' }}>
      <div className="bg-gradient-to-r from-plum to-amethyst p-6 text-white">
        <h2 className="text-2xl font-display font-bold mb-2">Transaction Locations</h2>
        <p className="text-plum-100 font-medium">Interactive map showcasing our nationwide portfolio</p>
      </div>
      
      <div className="h-[500px] relative">
        <MapContainer
          center={[39.8283, -98.5795]} // Center of US
          zoom={4}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {transactions.map((transaction, index) => (
            <Marker
              key={index}
              position={[transaction.latitude, transaction.longitude]}
              icon={createCustomIcon(transaction.classification)}
            >
              <Popup className="custom-popup">
                <div className="p-3 min-w-[280px]">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display font-bold text-obsidian text-base leading-tight pr-2">
                      {transaction.property}
                    </h3>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${CLASSIFICATION_MAP[transaction.classification].bgColor} ${CLASSIFICATION_MAP[transaction.classification].color} whitespace-nowrap`}>
                      {CLASSIFICATION_MAP[transaction.classification].label}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-evergreen">
                    <div className="flex items-center">
                      <span className="font-semibold text-plum min-w-[80px]">Location:</span>
                      <span className="ml-2">{transaction.address}</span>
                    </div>
                    
                    {transaction.sale_price && (
                      <div className="flex items-center">
                        <span className="font-semibold text-plum min-w-[80px]">Sale Price:</span>
                        <span className="ml-2 font-bold text-evergreen text-base">
                          {formatPrice(transaction.sale_price)}
                        </span>
                      </div>
                    )}
                    
                    {transaction.size_nrsf && (
                      <div className="flex items-center">
                        <span className="font-semibold text-plum min-w-[80px]">Size:</span>
                        <span className="ml-2">{formatSize(transaction.size_nrsf)}</span>
                      </div>
                    )}
                    
                    {transaction.units && (
                      <div className="flex items-center">
                        <span className="font-semibold text-plum min-w-[80px]">Units:</span>
                        <span className="ml-2">{transaction.units.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {transaction.date_sold && (
                      <div className="flex items-center">
                        <span className="font-semibold text-plum min-w-[80px]">Date Sold:</span>
                        <span className="ml-2">{new Date(transaction.date_sold).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      {/* Legend */}
      <div className="p-6 bg-gradient-to-r from-sand to-cloud border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-base font-display font-semibold text-obsidian">Property Types:</span>
          <div className="flex items-center space-x-6">
            {Object.entries(CLASSIFICATION_MAP).map(([key, info]) => (
              <div key={key} className="flex items-center space-x-3">
                <div 
                  className="w-5 h-5 rounded-full border-3 border-white shadow-md"
                  style={{ 
                    backgroundColor: key === 'MH' ? '#1a473a' : key === 'RV' ? '#8a0067' : '#500f61' 
                  }}
                />
                <span className="text-sm font-medium text-evergreen">{info.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;