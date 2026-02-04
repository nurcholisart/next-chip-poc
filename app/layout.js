import './globals.css';

export const metadata = {
  title: 'CHIPS POC',
  description: 'Minimal CHIPS partitioned cookie proof of concept'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
