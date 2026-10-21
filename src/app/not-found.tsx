import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[760px] px-5 py-20 text-center">
      <h1 className="text-[26px] font-bold">Page not found</h1>
      <p className="mt-2 text-body">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-4 inline-block font-bold text-teal-800 hover:underline">Back to home</Link>
    </section>
  );
}
