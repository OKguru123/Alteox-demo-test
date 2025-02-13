import AuthProvider from "@/context/authContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="dashboard-container">
            <main className="dashboard-main-content">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
