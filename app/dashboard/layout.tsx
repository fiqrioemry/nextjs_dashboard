import Container from "@/components/Container";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex-center h-[80vh]">{children}</div>;
}
