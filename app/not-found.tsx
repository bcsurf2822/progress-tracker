import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-[#111827] flex flex-col items-center justify-center p-4">
      <div className="card max-w-md w-full text-center py-10 px-6">
        <h1 className="text-4xl font-bold text-[#2563eb] dark:text-[#60a5fa] mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-[#1f2937] dark:text-[#fff] mb-4">
          Page Not Found
        </h2>
        <p className="text-[#4b5563] dark:text-[#d1d5db] mb-6">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
