// src/app/layout.tsx
import '../styles/global.css'; // Import global styles
import Navbar from '../components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
            </body>
        </html>
    );
}