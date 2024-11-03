import "./globals.css";
import { AuthProvider } from "./Provider";
import Footer from "@/component/Footer";
import Navbar from "@/component/Navbar";
import SessionLayout from "./SessionLayout"; // Import the new component

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`antialiased`}>
        <SessionLayout>
            <nav>
              <Navbar />
            </nav>
            <main>
              <AuthProvider>
                {children}
              </AuthProvider>
            </main>
            <footer>
              <Footer />
            </footer>
        </SessionLayout>
      </body>
    </html>
  );
}
