import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16 flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-2xl tracking-[0.2em] font-light text-neutral-900 mb-3">
          PAGE NOT FOUND
        </h1>
        <p className="text-neutral-500 mb-8">The page you’re looking for doesn’t exist.</p>
        <Link
          to={createPageUrl("Home")}
          className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white text-sm tracking-wider hover:bg-neutral-800 transition-colors"
        >
          GO HOME
        </Link>
      </div>
    </div>
  );
}
