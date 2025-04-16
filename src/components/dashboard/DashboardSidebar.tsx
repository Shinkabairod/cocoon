
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  Calendar, 
  BookOpen, 
  BarChart, 
  Settings, 
  HelpCircle, 
  LogOut 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const DashboardSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", path: "/dashboard" },
    { icon: <FileText className="h-5 w-5" />, label: "Scripts", path: "/dashboard/scripts" },
    { icon: <Calendar className="h-5 w-5" />, label: "Content Calendar", path: "/dashboard/calendar" },
    { icon: <BookOpen className="h-5 w-5" />, label: "Learning Resources", path: "/dashboard/resources" },
    { icon: <BarChart className="h-5 w-5" />, label: "Analytics", path: "/dashboard/analytics" },
  ];
  
  const accountItems = [
    { icon: <Settings className="h-5 w-5" />, label: "Settings", path: "/dashboard/settings" },
    { icon: <HelpCircle className="h-5 w-5" />, label: "Help & Support", path: "/dashboard/support" },
  ];
  
  return (
    <aside className="h-screen w-64 border-r flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AC</span>
          </div>
          <h1 className="text-xl font-bold gradient-text">AI Coach</h1>
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${isActive ? 'gradient-bg' : ''}`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
        
        <div className="mt-8">
          <h3 className="text-xs uppercase font-medium text-muted-foreground mb-2 px-3">
            Account
          </h3>
          <ul className="space-y-1">
            {accountItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start ${isActive ? 'gradient-bg' : ''}`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      
      <div className="p-4 border-t">
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground">
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Log Out</span>
          </Button>
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
