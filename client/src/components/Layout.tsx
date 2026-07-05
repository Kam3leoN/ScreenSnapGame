import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Enveloppe principale avec navigation.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="ssg-layout">
      <header className="ssg-header">
        <Link to="/" className="ssg-header__brand">
          ScreenSnapGame
        </Link>
        <nav className="ssg-header__nav">
          <Link to="/" className="btn btn--text btn--sm ripple">
            Accueil
          </Link>
          <Link to="/hiscores" className="btn btn--text btn--sm ripple">
            Hi-Scores
          </Link>
        </nav>
      </header>
      <main className="ssg-main">{children}</main>
    </div>
  );
}
