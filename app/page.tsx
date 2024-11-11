import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="bg-blur bg-black/20">
      <div className="container mx-auto flex-center h-screen">
        <div className="w-[300px] bg-white rounded-md space-y-4 text-center py-4 px-4">
          <h1>Web store management</h1>
          <form action="submit" className="space-y-4">
            <input
              type="text"
              className="w-full px-2 py-2 rounded-md bg-foreground"
              placeholder="email"
            />
            <input
              type="text"
              className="w-full px-2 py-2 rounded-md bg-foreground"
              placeholder="password"
            />

            <Button className="w-full">Login</Button>
            <Button className="w-full">Login with google</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
