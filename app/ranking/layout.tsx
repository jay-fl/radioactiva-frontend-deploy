export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
      
        <main className="lg:flex  lg:h-screen lg:overflow-y-hidden">
            <div className="md:flex-1 md:h-screen md:overflow-y-scroll pt-10  pb-32 px-10 bg-red-300">
                {children}
            </div> 
            <aside className="md:w-96 md:h-screen md:overflow-y-scroll pt-10 pb-32 px-5 bg-green-400">
         
            </aside>
        </main>
      </>
    );
  }