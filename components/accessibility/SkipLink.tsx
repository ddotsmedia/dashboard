'use client';

/**
 * Skip Link Component
 * Hidden by default, visible on Tab focus
 * Allows keyboard users to skip navigation and jump to main content
 */
export function SkipLink() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="absolute top-0 left-0 -translate-y-full px-4 py-2 bg-indigo-600 text-white rounded-md
        focus:translate-y-0 focus:z-50
        transition-transform duration-150
        font-medium text-sm"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}
