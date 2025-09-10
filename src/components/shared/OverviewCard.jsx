import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function OverviewCard({ title, value, icon: IconComponent, color = 'from-accent-purple to-accent-pink' }) {
  return (
    <div className="bg-white rounded-lg shadow-card p-4 flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl grid place-items-center text-white bg-gradient-to-br ${color}`}>
        {IconComponent ? <IconComponent className="w-6 h-6" /> : <InformationCircleIcon className="w-6 h-6" />}
      </div>
      <div>
        <div className="text-sm text-neutral-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </div>
  );
}
