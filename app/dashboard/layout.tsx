import SideBar from "@/components/SideBar";

export default function dashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <SideBar />
      {children}
    </section>
  );
}
