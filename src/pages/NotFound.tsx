import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="relative flex min-h-[calc(100svh-var(--header-h))] items-end overflow-hidden bg-ink text-bone">
      <div className="stitch-dark absolute inset-0" />
      <div className="shell relative pb-12 md:pb-16">
        <p className="meta mb-8 text-madder-light">(404) Page not found</p>
        <h1 className="text-mega">A dropped <em className="text-madder-light">stitch.</em></h1>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-sm text-sm leading-7 text-bone/70">The page you were looking for has unravelled — or was never knitted at all.</p>
          <Link to="/" className="btn btn-light">Return home <ArrowRight /></Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
