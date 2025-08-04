import Link from 'next/link';

export const Footer = () => {
return (
    <footer className="bg-gray-100 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                <div className="col-span-2">
                    <h3 className="text-2xl font-bold text-green-500 mb-4">KWETU</h3>
                    <p className="text-gray-600">
                    Discover your perfect stay in East Africa with our curated selection of homes for long-term rentals.
                    </p>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">About</h4>
                    <ul className="space-y-2">
                        <li><Link href="/about" className="text-gray-600 hover:text-green-500 transition-colors">About Us</Link></li>
                        <li><Link href="/careers" className="text-gray-600 hover:text-green-500 transition-colors">Careers</Link></li>
                        <li><Link href="/blog" className="text-gray-600 hover:text-green-500 transition-colors">Blog</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h4>
                    <ul className="space-y-2">
                        <li><Link href="/contact" className="text-gray-600 hover:text-green-500 transition-colors">Contact Us</Link></li>
                        <li><Link href="/help" className="text-gray-600 hover:text-green-500 transition-colors">Help Center</Link></li>
                        <li><Link href="/cancellations" className="text-gray-600 hover:text-green-500 transition-colors">Cancellation Options</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h4>
                    <ul className="space-y-2">
                    <li><Link href="/terms" className="text-gray-600 hover:text-green-500 transition-colors">Terms of Service</Link></li>
                    <li><Link href="/privacy" className="text-gray-600 hover:text-green-500 transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/cookies" className="text-gray-600 hover:text-green-500 transition-colors">Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} KWETU. All rights reserved.
                </p>
                <div className="mt-4 md:mt-0 flex space-x-6">
                    <Link href="/payment-methods" className="text-gray-500 hover:text-green-500 text-sm transition-colors">
                    Payment Methods
                    </Link>
                    <Link href="/become-host" className="text-gray-500 hover:text-green-500 text-sm transition-colors">
                    Become a Host
                    </Link>
                </div>
            </div>
  </div>
    </footer>
)
};