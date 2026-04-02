import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#3A3A3A] text-gray-300 pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-b border-gray-600 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-primary tracking-widest mb-4">Aaraz.</h2>
          <p className="text-sm">Elevate your style effortlessly with our curated collection.</p>
        </div>
        <div>
          <h3 className="text-pink-400 font-semibold mb-4 uppercase">Important Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-pink-400 font-semibold mb-4 uppercase">Customer Blogs</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/blogs">Blogs & Reviews</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-sm">&copy; {new Date().getFullYear()} Aaraz. All Rights Reserved.</div>
    </footer>
  );
}