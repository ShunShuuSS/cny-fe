import PublicLayout from "@/components/layout/PublicLayout";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-cny-red via-cny-crimson to-cny-red-dark overflow-hidden">
      <PublicLayout>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-cny-gold rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-cny-gold-light rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <main className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-8 py-12 sm:py-16 text-center max-w-2xl w-full">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
              🧧
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              恭喜发财
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-cny-gold-light font-semibold">
              Happy Chinese New Year!
            </p>
          </div>

          <p className="text-white/90 text-base sm:text-lg mb-8 sm:mb-12 max-w-md px-4">
            Welcome to the CNY Invitation System. Use your invitation link to
            join the celebration!
          </p>
        </main>
      </PublicLayout>
    </div>
  );
}
