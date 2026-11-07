import Navbar from '../components/Navbar';
import ScrollProgress from '../components/ScrollProgress';
import Footer from '../sections/Footer';

export default function MainLayout({ children }) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
