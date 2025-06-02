export default function RodentDetectionPageLoading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="loading-spinner" style={{ width: "32px", height: "32px" }}></div>
      <p className="ml-3 text-md">Loading Rodent Detection System...</p>
    </div>
  )
}
