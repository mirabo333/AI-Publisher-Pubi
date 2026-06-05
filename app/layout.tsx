import "@/app/assets/styles/global.scss";
import ClientTourProvider from "./components/ClientTourProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pubi",
  description:
    "Pubi는 ui 개발을 쉽고 빠르게 할 수 있도록 도와주는 helper입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientTourProvider>
          <main>{children}</main>
        </ClientTourProvider>
      </body>
    </html>
  );
}
