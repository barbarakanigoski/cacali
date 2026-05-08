-- Products table
create table products (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  hook text not null,
  description text not null,
  material text not null,
  dimensions text not null,
  price numeric(10,2) not null,
  image_url text default '',
  images text[] default '{}',
  extras text,
  sold boolean default false,
  featured boolean default false,
  created_at timestamp with time zone default now()
);

-- Orders table
create table orders (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references products(id),
  customer_email text not null,
  customer_name text default '',
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  payment_id text,
  total numeric(10,2) not null,
  created_at timestamp with time zone default now()
);

-- Waitlist table
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  created_at timestamp with time zone default now()
);

-- Contacts table
create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table products enable row level security;
alter table orders enable row level security;
alter table waitlist enable row level security;
alter table contacts enable row level security;

-- Public read access for products
create policy "Products are viewable by everyone"
  on products for select using (true);

-- Public insert for waitlist and contacts
create policy "Anyone can join waitlist"
  on waitlist for insert with check (true);

create policy "Anyone can send contact"
  on contacts for insert with check (true);

-- Service role only for orders and product updates
create policy "Service role manages orders"
  on orders for all using (true);

-- Insert sample products
insert into products (slug, name, hook, description, material, dimensions, price, extras, featured) values
(
  'cinzeiro-das-brasas',
  'cinzeiro das brasas',
  'pra pausa que voce merecia ter dado antes.',
  E'nao e so onde o cigarro descansa.\n\ne a peca que fica em cima da mesa e vira companhia — de conversa, de silencio, de tarde que nao quer terminar.\n\nfeito no torno. temperado no forno.\ntem as marcas de quem fez.\ne assim que deve ser.',
  'argila branca. esmalte brilhante.',
  'aprox. 10cm de diametro x 3,5cm de altura.',
  89.00,
  'acompanha pack de stickers da linha fogo.',
  true
),
(
  'jarra-de-sabado',
  'jarra de sabado',
  'daquelas que as visitas perguntam de onde e antes de sentar.',
  E'jarra em argila branca com listras em esmalte verde oliva.\nacabamento granulado — speckled — que lembra a textura da terra.\n\nfunciona como jarra de agua, vaso,\nou so como peca que fica bonita na mesa\ne faz a sala parecer que voce tem mais gosto do que tem.\n\n(voce tem. mas a jarra ajuda.)',
  'argila branca. esmalte verde oliva e creme.',
  'aprox. 18cm x 10cm.',
  149.00,
  null,
  false
),
(
  'xicara-do-cafe-superfaturado',
  'xicara do cafe superfaturado',
  'sim. e voce vai querer assim mesmo.',
  E'pra acompanhar aquela reuniao que podia ser um e-mail.\npra quando o ceu ficar daquele azul e voce precisar de uma xicara que combine.\npra quem entende que bom cafe merece uma xicara a altura.\n\nfeita a mao, com esmalte acetinado.\npeso certo. tamanho certo.\no tipo que voce lava com cuidado, nao porque tem que lavar —\nporque nao quer arriscar.',
  'argila branca. esmalte acetinado.',
  'aprox. 200ml.',
  79.00,
  'acompanha pack de stickers da linha cafe.',
  false
);
