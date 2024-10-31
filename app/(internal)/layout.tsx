'use client';

import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOnClick = () => {
    router.back();
  };

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <header className="bg-zinc-800 text-white p-4 flex items-center space-x-4 h-[60px]">
        <button
          onClick={handleOnClick}
          className="text-gray-300 hover:text-white focus:outline-none"
        >
          ← Back
        </button>
      </header>
      <main className="grow p-4 h-[calc(100vh - 60px)] overflow-auto">{children}</main>
    </div>
  );
}
