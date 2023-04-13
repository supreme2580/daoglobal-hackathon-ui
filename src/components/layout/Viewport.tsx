export function Viewport({ children }: { children: React.ReactNode }) {
  return (
    <main className="py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <main className="flex min-h-screen flex-col items-center justify-center to-[#15162c]">
          {children}
        </main>
      </div>
    </main>
  );
}
