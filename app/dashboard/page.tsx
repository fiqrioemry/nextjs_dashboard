import type { FC } from "react";

interface productType {
  id: number;
  name: string;
  price: number;
}

interface pageProps {
  product: productType;
}

const Page: FC<pageProps> = () => {
  return (
    <div className="container mx-auto h-screen flex-center text-4xl font-bold">
      <h1>DASHBOARD PAGE</h1>
    </div>
  );
};
export default Page;
