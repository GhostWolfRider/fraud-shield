"use client"

export function GeographicMap() {
  // In a real application, this would be an actual map component
  // For this example, we'll create a placeholder with some visual elements

  return (
    <div className="w-full h-full relative bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=300&width=600')] opacity-10"></div>

      {/* Simulated map markers */}
      <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
      <div className="absolute top-2/3 left-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      <div className="absolute top-1/5 left-1/2 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      <div className="absolute top-2/5 left-3/4 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      <div className="absolute top-3/5 left-1/5 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>

      {/* Map overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-50"></div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/80 p-2 rounded-md border border-slate-200 shadow-sm">
        <div className="text-xs font-medium mb-2 text-slate-900">Transaction Risk</div>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs text-slate-600">Low</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
            <span className="text-xs text-slate-600">Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span className="text-xs text-slate-600">High</span>
          </div>
        </div>
      </div>

      {/* Overlay text */}
      <div className="absolute top-4 right-4 text-xs text-slate-600">Interactive map - Placeholder</div>
    </div>
  )
}
