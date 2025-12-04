'use client';


import { aiTools } from '@/lib/ai-tools';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900">ToolSuite</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {aiTools.map((item) => {
              const isActive = pathname === item.href;
              return (
                isActive && (
                  <div key={item.id} className="relative flex items-center gap-2">
                    <Link href={item.href}>{item.title}</Link>
                    {/* Green ping animation */}
                    <div className="relative">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-ping absolute"></div>
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                )
              );
            })}
            {pathname == "/" && (
              <Button>Sign Up</Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}