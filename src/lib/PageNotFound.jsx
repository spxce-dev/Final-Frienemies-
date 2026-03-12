import { Link } from 'react-router-dom'
import { createPageUrl } from '@/utils'

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FFF7ED]">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-7xl font-light text-orange-300">404</h1>
        <h2 className="text-2xl font-medium text-slate-800">Page not found</h2>
        <p className="text-slate-600">The page you opened does not exist in this build.</p>
        <Link
          to={createPageUrl('Home')}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
