import React from 'react'

const DashboardSkeleton = () => {
  return (
   <div className="flex min-h-screen">
      {/* Sidebar */}
    

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Page title */}
        <div className="h-7 w-40 rounded bg-amber-200/70 animate-pulse" />

        {/* Slot card */}
        <div className="border border-amber-200 rounded-2xl p-6 space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-amber-200/70 animate-pulse" />
              <div className="h-4 w-48 rounded bg-amber-200/70 animate-pulse" />
            </div>
          ))}

          {/* Progress bar */}
          <div className="h-2 w-full rounded-full bg-amber-200/60 animate-pulse" />
          <div className="h-3 w-32 rounded bg-amber-200/60 animate-pulse" />
        </div>
      </main>
    </div>
  )
}

export default DashboardSkeleton