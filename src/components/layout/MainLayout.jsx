// Import the structured elements 
import Header from "./Header";
import Footer from "./Footer";

// In JSX and React, when a function receives a param, we call it a prop
/**
 * AppLayout wraps pages with a shared header and footer.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Page content.
 */
function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;