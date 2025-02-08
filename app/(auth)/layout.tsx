import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const loggedIn = { firstName: 'Ben', lastName: 'Peli'}

  return (
    <main className="flex h-screen w-full font-inter">
        {children}
    </main>
  );
}
