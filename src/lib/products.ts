import type { Product } from "@/types";

const demoProducts: Product[] = [
  {
    id: "1",
    slug: "cinzeiro-das-brasas",
    name: "cinzeiro das brasas",
    hook: "pra pausa que voce merecia ter dado antes.",
    description:
      "nao e so onde o cigarro descansa.\n\ne a peca que fica em cima da mesa e vira companhia — de conversa, de silencio, de tarde que nao quer terminar.\n\nfeito no torno. temperado no forno.\ntem as marcas de quem fez.\ne assim que deve ser.",
    material: "argila branca. esmalte brilhante.",
    dimensions: "aprox. 10cm de diametro x 3,5cm de altura.",
    price: 89.0,
    image_url: "",
    images: [],
    extras: "acompanha pack de stickers da linha fogo.",
    sold: false,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    slug: "jarra-de-sabado",
    name: "jarra de sabado",
    hook: "daquelas que as visitas perguntam de onde e antes de sentar.",
    description:
      "jarra em argila branca com listras em esmalte verde oliva.\nacabamento granulado — speckled — que lembra a textura da terra.\n\nfunciona como jarra de agua, vaso,\nou so como peca que fica bonita na mesa\ne faz a sala parecer que voce tem mais gosto do que tem.\n\n(voce tem. mas a jarra ajuda.)",
    material: "argila branca. esmalte verde oliva e creme.",
    dimensions: "aprox. 18cm x 10cm.",
    price: 149.0,
    image_url: "",
    images: [],
    extras: null,
    sold: false,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    slug: "xicara-do-cafe-superfaturado",
    name: "xicara do cafe superfaturado",
    hook: "sim. e voce vai querer assim mesmo.",
    description:
      "pra acompanhar aquela reuniao que podia ser um e-mail.\npra quando o ceu ficar daquele azul e voce precisar de uma xicara que combine.\npra quem entende que bom cafe merece uma xicara a altura.\n\nfeita a mao, com esmalte acetinado.\npeso certo. tamanho certo.\no tipo que voce lava com cuidado, nao porque tem que lavar —\nporque nao quer arriscar.",
    material: "argila branca. esmalte acetinado.",
    dimensions: "aprox. 200ml.",
    price: 79.0,
    image_url: "",
    images: [],
    extras: "acompanha pack de stickers da linha cafe.",
    sold: false,
    featured: false,
    created_at: new Date().toISOString(),
  },
];

export async function getProducts(): Promise<Product[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return demoProducts;
  }

  try {
    const { supabase } = await import("./supabase");
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return demoProducts;
    return data as Product[];
  } catch {
    return demoProducts;
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return demoProducts.find((p) => p.slug === slug) || null;
  }

  try {
    const { supabase } = await import("./supabase");
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return demoProducts.find((p) => p.slug === slug) || null;
    return data as Product;
  } catch {
    return demoProducts.find((p) => p.slug === slug) || null;
  }
}

export async function getFeaturedProduct(): Promise<Product | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return demoProducts.find((p) => p.featured) || demoProducts[0] || null;
  }

  try {
    const { supabase } = await import("./supabase");
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true)
      .eq("sold", false)
      .limit(1)
      .single();

    if (error || !data) {
      return demoProducts.find((p) => p.featured) || null;
    }
    return data as Product;
  } catch {
    return demoProducts.find((p) => p.featured) || null;
  }
}
