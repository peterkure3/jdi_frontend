export default function Placeholder({ title = 'Page', description = 'Content coming soon.' }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="bg-neutral-500 rounded-lg shadow-card p-6 text-neutral-600">
        {description}
      </div>
    </div>
  );
}
