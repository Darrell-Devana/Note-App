// import { SidebarProvider } from "@/components/ui/sidebar";
// import { AppSidebar } from "./app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // <SidebarProvider>
    //   <AppSidebar />
    <main className="flex flex-col gap-6 m-auto max-w-screen-lg px-4 p-6">
      {children}
    </main>
    // </SidebarProvider>
  );
}
