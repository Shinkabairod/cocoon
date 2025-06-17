
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "@/components/auth/UserMenu";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="border-b w-full py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center animate-float">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold gradient-text">AI Content Coach</h1>
      </Link>
      <div className="space-x-4 flex items-center">
        <Link to="/about">
          <Button variant="ghost">About</Button>
        </Link>
        <Link to="/pricing">
          <Button variant="ghost">Pricing</Button>
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <UserMenu />
          </div>
        ) : (
          <Link to="/auth">
            <Button className="gradient-bg">Get Started</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
