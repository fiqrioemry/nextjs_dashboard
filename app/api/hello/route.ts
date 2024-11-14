import fetchProducts from "@/services/products";

export async function GET(request: Request) {
  const data = await fetchProducts();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
