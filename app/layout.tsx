import "./globals.css";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <main>{children}</main>
        <footer className="footer">
          <a
            target="_blank"
            rel="no-opener"
            href="https://github.com/dabit3/gpt-travel-advisor"
          >
            <Image
              style={{ marginTop: "2px" }}
              alt="code available on github"
              width="18"
              height="18"
              src="/github.svg"
            />
          </a>
          <p>
            Built with 🫶 by{" "}
            <a
              target="_blank"
              rel="no-opener"
              href="https://github.com/zeosamaster"
            >
              @zeosamaster
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
