
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 border-t mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold gradient-text">AI Content Coach</h2>
            <p className="text-muted-foreground mt-2">Your personal guide to content creation</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="font-semibold mb-2">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link to="/tutorials" className="text-muted-foreground hover:text-foreground">Tutorials</Link></li>
                <li><Link to="/faqs" className="text-muted-foreground hover:text-foreground">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
                <li><Link to="/cookies" className="text-muted-foreground hover:text-foreground">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Content Coach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
