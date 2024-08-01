export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={"min-h-screen bg-background font-sans antialiased"} >
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
    </section>
  );
}
