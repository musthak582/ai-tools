import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { aiTools, categories } from '@/lib/ai-tools';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Professional AI Tools
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your workflow with our suite of AI-powered tools. 
            From resume optimization to content creation, we've got you covered.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              asChild 
              className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 text-lg"
            >
              <Link href="#tools">
                Explore Tools
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI Tools Collection
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our growing suite of AI-powered tools designed to enhance your productivity and professional presence.
            </p>
          </div>

          {categories.map((category) => (
            <div key={category} id={category.toLowerCase()} className="mb-16">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8 border-b border-gray-200 pb-2">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {aiTools
                  .filter(tool => tool.category === category)
                  .map((tool) => (
                    <Card 
                      key={tool.id} 
                      className="border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg"
                    >
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl text-gray-900">
                            {tool.title}
                          </CardTitle>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            tool.status === 'live' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {tool.status === 'live' ? 'Live' : 'Coming Soon'}
                          </span>
                        </div>
                        <CardDescription className="text-gray-600 text-base">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {tool.status === 'live' ? (
                          <Button asChild className="w-full bg-gray-900 text-white hover:bg-gray-800">
                            <Link href={tool.href}>
                              Use Tool
                            </Link>
                          </Button>
                        ) : (
                          <Button 
                            disabled 
                            variant="outline" 
                            className="w-full border-gray-300 text-gray-500"
                          >
                            Coming Soon
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our AI Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional-grade AI solutions designed for modern professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Get instant results with our optimized AI models</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">Your data is never stored or shared with third parties</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Quality</h3>
              <p className="text-gray-600">Industry-standard outputs that impress recruiters and clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Enhance Your Productivity?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start using our AI tools today and experience the difference.
          </p>
          <Button 
            asChild
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            <Link href="#tools">
              Get Started
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-white">AI Tools Suite</h2>
              <p className="text-gray-400 mt-2">Professional AI solutions for modern professionals</p>
            </div>
            <div className="flex space-x-6">
              {categories.map((category) => (
                <a
                  key={category}
                  href={`#${category.toLowerCase()}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 AI Tools Suite. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}