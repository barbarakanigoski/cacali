import type { Product } from "@/types";

const demoProducts: Product[] = [
  {
    id: "1",
    slug: "cinzeiro-das-brasas",
    name: "cinzeiro das brasas",
    hook: "pra pausa que você merecia ter dado antes.",
    description:
      "não é só onde o cigarro descansa.\n\né a peça que fica em cima da mesa e vira companhia — de conversa, de silêncio, de tarde que não quer terminar.\n\nfeito no torno. temperado no forno.\ntem as marcas de quem fez.\né assim que deve ser.",
    material: "argila branca. esmalte brilhante.",
    dimensions: "aprox. 10cm de diâmetro × 3,5cm de altura.",
    price: 89.0,
    image_url: "",
    images: [],
    extras: "acompanha pack de stickers da linha fogo.",
    sold: false,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    slug: "jarra-de-sabado",
    name: "jarra de sábado",
    hook: "daquelas que as visitas perguntam de onde é antes de sentar.",
    description:
      "jarra em argila branca com listras em esmalte verde oliva.\nacabamento granulado — speckled — que lembra a textura da terra.\n\nfunciona como jarra de água, vaso,\nou só como peça que fica bonita na mesa\ne faz a sala parecer que você tem mais gosto do que tem.\n\n(você tem. mas a jarra ajuda.)",
    material: "argila branca. esmalte verde oliva e creme.",
    dimensions: "aprox. 18cm × 10cm.",
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
    name: "xícara do café superfaturado",
    hook: "sim. e você vai querer assim mesmo.",
    description:
      "pra acompanhar aquela reunião que podia ser um e-mail.\npra quando o céu ficar daquele azul e você precisar de uma xícara que combine.\npra quem entende que bom café merece uma xícara à altura.\n\nfeita à mão, com esmalte acetinado.\npeso certo. tamanho certo.\no tipo que você lava com cuidado, não porque tem que lavar —\nporque não quer arriscar.",
    material: "argila branca. esmalte acetinado.",
    dimensions: "aprox. 200ml.",
    price: 79.0,
    image_url: "",
    images: [],
    extras: "acompanha pack de stickers da linha café.",
    sold: false,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    slug: "coador-do-devagar",
    name: "coador do devagar",
    hook: "pra quem entende que café bom não tem pressa.",
    description:
      "passa devagar, fica melhor.\n\nesse não é um coador qualquer. é o tipo de peça que transforma segunda-feira de manhã num ritual que você realmente quer fazer.\n\ncoador + xícara em argila preta, feitos no torno, queimados juntos.\num encaixa no outro como se já tivessem combinado antes de existir.\n\no café passa devagar, a água encontra o pó no tempo certo,\ne o resultado é aquele gole que faz você fechar o olho sem querer.\n\n(sim, é mais caro que um coador de plástico.\nmas você já sabia disso quando clicou.)",
    material: "argila preta. acabamento rústico com interior esmaltado mel.",
    dimensions: "coador: aprox. 12cm × 10cm. xícara: aprox. 8cm × 9cm.",
    price: 189.0,
    image_url: "/coador-do-devagar.png",
    images: ["/coador-do-devagar-2.png"],
    extras: "acompanha coador + xícara. peça única — este conjunto é este conjunto.",
    sold: false,
    featured: true,
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
