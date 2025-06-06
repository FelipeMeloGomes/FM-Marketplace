export default function ProductSkeleton() {
  return (
    <div className="border rounded shadow p-4 animate-pulse space-y-4">
      <div className="bg-gray-300 h-40 w-full rounded" />
      <div className="bg-gray-300 h-4 w-3/4 rounded" />
      <div className="bg-gray-300 h-4 w-1/2 rounded" />
    </div>
  );
}
