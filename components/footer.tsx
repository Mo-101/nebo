import Link from "next/link"

export function Footer() {
  return (
    <footer className="footer-blur py-2 px-4 text-center text-xs text-gray-500 dark:text-gray-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-2 md:mb-0">
          <span>© {new Date().getFullYear()} GeoExplorer - Nigeria 3D Mapping Platform</span>
        </div>
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
            API Docs
          </Link>
          <Link href="#" className="hover:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
