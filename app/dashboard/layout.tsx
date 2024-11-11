import SideBar from "@/components/SideBar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SideBar />
      <div className="w-full">
        <header className="py-6 bg-primary px-6">
          <div className="flex-between">
            <SidebarTrigger />
            <div>
              <Button>Logout</Button>
            </div>
          </div>
        </header>
        {children}
      </div>
    </SidebarProvider>
  );
}
