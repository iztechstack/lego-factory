import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="font-mono justify-center text-large">
        Welcome to the Factory!
      </div>
      <Link href="/monitor">
        <button className="font-mono btn btn-black border border-white-500 p-1 hover:bg-gray-800">
          OPEN MONITOR
        </button>
      </Link>
    </main>
  );
}
