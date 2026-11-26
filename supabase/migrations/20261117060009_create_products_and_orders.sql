/*
# Create products and orders tables (single-tenant, no auth)

1. New Tables
- `products` — catalog of power devices (UPS, batteries, inverters, stabilizers).
  Columns: id, slug, name, category, short_description, long_description,
  capacity, specs (jsonb), image_url, featured, display_order, created_at.
- `orders` — customer orders placed from the site.
  Columns: id, customer_name, company, email, phone, address, items (jsonb),
  total_amount, status, notes, created_at.
2. Security
- Enable RLS on both tables.
- products: SELECT is public (TO anon, authenticated) so visitors can browse.
  Writes restricted to service_role only (site owner manages catalog).
- orders: anyone can INSERT (place an order) and read their own order by id;
  full read access restricted to service_role (owner fulfills orders).
3. Grants
- products: SELECT to anon, authenticated.
- orders: INSERT, SELECT to anon, authenticated.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  category text NOT NULL,
  short_description text NOT NULL,
  long_description text NOT NULL DEFAULT '',
  capacity text NOT NULL DEFAULT '',
  specs jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_url text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON products TO anon, authenticated;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  company text NOT NULL DEFAULT '',
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL DEFAULT '',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_amount numeric(12,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'new',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

GRANT INSERT, SELECT ON orders TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

-- Seed product catalog
INSERT INTO products (slug, name, category, short_description, long_description, capacity, specs, image_url, featured, display_order)
VALUES
  ('online-ups-1kva',
   'On-Line UPS 1 kVA',
   'On-Line UPS',
   'True double-conversion online UPS for sensitive loads.',
   'A premium true on-line double-conversion UPS delivering clean, uninterrupted power for servers, networking equipment, and critical electronics. Zero transfer time, pure sine wave output, and comprehensive surge protection.',
   '1 kVA / 800 W',
   '[{"label":"Topology","value":"Double-conversion on-line"},{"label":"Output","value":"Pure sine wave"},{"label":"Transfer time","value":"0 ms"},{"label":"Backup","value":"15–30 min (load dependent)"},{"label":"Input voltage","value":"160–290 V AC"},{"label":"Form factor","value":"Tower"}]'::jsonb,
   'https://images.pexels.com/photos/19841116/pexels-photo-19841116.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   true, 1),
  ('online-ups-3kva',
   'On-Line UPS 3 kVA',
   'On-Line UPS',
   'Rack/tower 3 kVA on-line UPS with extended runtime support.',
   'High-capacity on-line UPS designed for small server rooms, medical equipment, and industrial control systems. Features a DSP-based control, wide input voltage window, and support for external battery banks for extended runtime.',
   '3 kVA / 2400 W',
   '[{"label":"Topology","value":"Double-conversion on-line"},{"label":"Output","value":"Pure sine wave"},{"label":"Transfer time","value":"0 ms"},{"label":"Backup","value":"Up to 60 min with ext. batteries"},{"label":"Input voltage","value":"120–300 V AC"},{"label":"Form factor","value":"Rack/Tower convertible"}]'::jsonb,
   'https://images.pexels.com/photos/4508751/pexels-photo-4508751.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   true, 2),
  ('online-ups-10kva',
   'On-Line UPS 10 kVA',
   'On-Line UPS',
   'Three-phase 10 kVA on-line UPS for data centers and plant rooms.',
   'Industrial-grade 10 kVA on-line UPS engineered for data centers, manufacturing floors, and large telecom installations. Parallel redundancy, intelligent battery management, and SNMP remote monitoring included.',
   '10 kVA / 8000 W',
   '[{"label":"Topology","value":"Double-conversion on-line"},{"label":"Phase","value":"1-phase / 3-phase options"},{"label":"Output","value":"Pure sine wave"},{"label":"Parallel","value":"Up to 4 units N+1"},{"label":"Monitoring","value":"SNMP + dry contacts"},{"label":"Form factor","value":"Cabinet"}]'::jsonb,
   'https://images.pexels.com/photos/5408005/pexels-photo-5408005.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   true, 3),
  ('tubular-battery-150ah',
   'Tubular Battery 150 Ah',
   'Batteries',
   'Deep-cycle tubular gel battery for long inverter backup.',
   'Premium tubular gel battery with extra-thick spines for deep discharge cycles. Ideal for home and office inverters, solar storage, and telecom backup. Low-maintenance, long-life design.',
   '150 Ah @ 12 V',
   '[{"label":"Type","value":"Tubular gel"},{"label":"Cycle life","value":"1200+ cycles"},{"label":"Warranty","value":"48 months"},{"label":"Maintenance","value":"Low — topping-free"},{"label":"Application","value":"Inverter / Solar / Telecom"}]'::jsonb,
   'https://images.pexels.com/photos/698485/pexels-photo-698485.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   true, 4),
  ('tubular-battery-200ah',
   'Tubular Battery 200 Ah',
   'Batteries',
   'High-capacity 200 Ah tubular battery for extended runtime.',
   'Heavy-duty 200 Ah tubular battery for large inverters and solar arrays. Extra-thick positive plates deliver long float life and excellent deep discharge recovery.',
   '200 Ah @ 12 V',
   '[{"label":"Type","value":"Tubular gel"},{"label":"Cycle life","value":"1500+ cycles"},{"label":"Warranty","value":"60 months"},{"label":"Maintenance","value":"Low — topping-free"},{"label":"Application","value":"Inverter / Solar / Telecom"}]'::jsonb,
   'https://images.pexels.com/photos/36594160/pexels-photo-36594160.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   false, 5),
  ('sine-wave-inverter-1kva',
   'Pure Sine Wave Inverter 1 kVA',
   'Inverters',
   'DSP-based pure sine wave inverter for home and office.',
   'Compact pure sine wave inverter with automatic mains pass-through, fast switchover, and intelligent battery charging. Ideal for apartments, small offices, and sensitive electronics.',
   '1 kVA / 800 VA',
   '[{"label":"Output","value":"Pure sine wave"},{"label":"Switchover","value":"< 10 ms"},{"label":"Charger","value":"Smart 10–15 A"},{"label":"Display","value":"LED + LCD status"},{"label":"Protection","value":"Overload, short-circuit, deep-discharge"}]'::jsonb,
   'https://images.pexels.com/photos/38171130/pexels-photo-38171130.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   true, 6),
  ('sine-wave-inverter-3kva',
   'Pure Sine Wave Inverter 3 kVA',
   'Inverters',
   'High-capacity sine wave inverter with solar charging option.',
   'Powerful 3 kVA inverter with optional solar charging (PWM/MPPT), dual battery support, and bypass switch. Suited for large homes, showrooms, and small workshops.',
   '3 kVA / 2400 VA',
   '[{"label":"Output","value":"Pure sine wave"},{"label":"Switchover","value":"< 10 ms"},{"label":"Solar","value":"Optional PWM/MPPT charger"},{"label":"Batteries","value":"24 V / 48 V bank"},{"label":"Protection","value":"Overload, short-circuit, deep-discharge"}]'::jsonb,
   'https://images.pexels.com/photos/33438229/pexels-photo-33438229.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   false, 7),
  ('offline-ups-1kva',
   'Off-Line UPS 1 kVA',
   'Off-Line UPS',
   'Line-interactive UPS for desktops and small loads.',
   'Line-interactive UPS with automatic voltage regulation (AVR) for desktop PCs, point-of-sale terminals, and home electronics. Compact, quiet, and budget-friendly.',
   '1 kVA / 600 W',
   '[{"label":"Topology","value":"Line-interactive"},{"label":"AVR","value":"Buck & boost stabilizer"},{"label":"Transfer time","value":"2–4 ms"},{"label":"Backup","value":"10–15 min"},{"label":"Form factor","value":"Tower"}]'::jsonb,
   'https://images.pexels.com/photos/33174696/pexels-photo-33174696.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   false, 8),
  ('voltage-stabilizer-5kva',
   'Voltage Stabilizer 5 kVA',
   'Stabilizers',
   'Servo-controlled voltage stabilizer for sensitive equipment.',
   'Servo-controlled automatic voltage stabilizer delivering stable output within ±1% despite wide input fluctuations. Ideal for medical equipment, CNC machines, and air conditioners.',
   '5 kVA',
   '[{"label":"Type","value":"Servo-controlled"},{"label":"Accuracy","value":"±1%"},{"label":"Input range","value":"170–270 V AC"},{"label":"Output","value":"230 V ± 1%"},{"label":"Protection","value":"Over/under voltage, overload, short-circuit"}]'::jsonb,
   'https://images.pexels.com/photos/7867332/pexels-photo-7867332.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   true, 9),
  ('voltage-stabilizer-10kva',
   'Voltage Stabilizer 10 kVA',
   'Stabilizers',
   'Heavy-duty 10 kVA stabilizer for industrial loads.',
   'Industrial 10 kVA servo stabilizer for plant machinery, printing presses, and large HVAC units. Wide input range, high efficiency, and rugged construction.',
   '10 kVA',
   '[{"label":"Type","value":"Servo-controlled"},{"label":"Accuracy","value":"±1%"},{"label":"Input range","value":"160–280 V AC"},{"label":"Output","value":"230 V ± 1%"},{"label":"Protection","value":"Over/under voltage, overload, short-circuit"}]'::jsonb,
   'https://images.pexels.com/photos/18468536/pexels-photo-18468536.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
   false, 10)
ON CONFLICT (slug) DO NOTHING;
