interface MetricCardProps {
  value: string | number;
  label: string;
  variant: 'success' | 'unique' | 'neutral';
}

export function MetricCard({ value, label, variant }: MetricCardProps) {
  const variantStyles = {
    success: 'bg-green-50 text-green-600 border-green-200',
    unique: 'bg-purple-50 text-purple-600 border-purple-200',
    neutral: 'bg-gray-50 text-gray-600 border-gray-200',
  };

  return (
    <div className={`text-center p-4 rounded-lg border ${variantStyles[variant]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm font-medium mt-1">{label}</div>
    </div>
  );
}
