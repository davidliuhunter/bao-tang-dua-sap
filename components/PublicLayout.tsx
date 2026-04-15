import Header from './Header';
import Footer from './Footer';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header />
      <main className="flex-1 page-fade-in">{children}</main>
      <Footer />
    </div>
  );
}
