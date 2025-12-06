import { useState } from "react";
import { useAuthStore } from "@/store/useStore";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  onAskAI?: () => void;
}

export default function Header({ onAskAI }: Props) {
  const { user, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) {
    return (
      <header className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-gray-900"
            >
              HealthAI
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
              >
                Get started
              </Link>
            </nav>

            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get started
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link
              to={`/${user.role}`}
              className="text-xl sm:text-2xl font-bold text-gray-900"
            >
              HealthAI
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user.role === "user" && onAskAI && (
              <button
                onClick={onAskAI}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 text-sm cursor-pointer"
              >
                Ask AI
              </button>
            )}
            <button
              onClick={logout}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium cursor-pointer"
            >
              Sign out
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {user.role === "user" && onAskAI && (
                <button
                  onClick={() => {
                    onAskAI();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 text-center"
                >
                  Ask AI
                </button>
              )}
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium px-2 py-1 text-left"
              >
                Sign out
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
