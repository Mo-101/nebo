export default function PageLoading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="loading-spinner" style={{ width: "48px", height: "48px" }}></div>
      <p className="ml-4 text-lg">Loading GeoExplorer...</p>
    </div>
  )
}
