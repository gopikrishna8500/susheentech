/*
# Add capacity_options to products and restructure catalog as product lines

1. Schema change
- Add `capacity_options` (jsonb, default '[]') to `products`.
  Each product becomes a product LINE with multiple selectable capacities/ranges
  (e.g. On-Line UPS Tower: 1 / 2 / 3 kVA), so customers choose a spec when ordering.
2. Data updates (non-destructive UPDATEs keyed on existing slugs)
- Rename each product slug/name to represent a line, set `capacity` to a display
  range, and populate `capacity_options` with the selectable specs.
- No tables dropped, no columns removed, no types changed.
3. Security
- No RLS/policy changes. New column inherits existing SELECT policy.
*/

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS capacity_options jsonb NOT NULL DEFAULT '[]'::jsonb;

UPDATE products SET
  slug = 'online-ups-tower',
  name = 'On-Line UPS — Tower Series',
  short_description = 'True double-conversion on-line UPS for sensitive home and office loads.',
  long_description = 'A premium true on-line double-conversion UPS delivering clean, uninterrupted power for desktops, networking equipment, and critical electronics. Zero transfer time, pure sine wave output, and comprehensive surge protection. Choose the capacity that matches your load.',
  capacity = '1–3 kVA',
  capacity_options = '["1 kVA / 800 W","2 kVA / 1600 W","3 kVA / 2400 W"]'::jsonb
WHERE slug = 'online-ups-1kva';

UPDATE products SET
  slug = 'online-ups-rack-tower',
  name = 'On-Line UPS — Rack/Tower Series',
  short_description = 'Rack/tower on-line UPS with extended runtime support for server rooms.',
  long_description = 'High-capacity on-line UPS designed for small server rooms, medical equipment, and industrial control systems. DSP-based control, wide input voltage window, and support for external battery banks for extended runtime. Choose the capacity that matches your load.',
  capacity = '3–10 kVA',
  capacity_options = '["3 kVA / 2400 W","6 kVA / 4800 W","10 kVA / 8000 W"]'::jsonb
WHERE slug = 'online-ups-3kva';

UPDATE products SET
  slug = 'online-ups-industrial',
  name = 'On-Line UPS — Industrial 3-Phase',
  short_description = 'Three-phase industrial on-line UPS for data centers and plant rooms.',
  long_description = 'Industrial-grade three-phase on-line UPS engineered for data centers, manufacturing floors, and large telecom installations. Parallel redundancy, intelligent battery management, and SNMP remote monitoring included. Choose the capacity that matches your load.',
  capacity = '10–40 kVA',
  capacity_options = '["10 kVA / 8 kW","15 kVA / 12 kW","20 kVA / 16 kW","30 kVA / 24 kW","40 kVA / 32 kW"]'::jsonb
WHERE slug = 'online-ups-10kva';

UPDATE products SET
  slug = 'tubular-battery',
  name = 'Tubular Gel Battery',
  short_description = 'Deep-cycle tubular gel battery for long inverter and solar backup.',
  long_description = 'Premium tubular gel battery with extra-thick spines for deep discharge cycles. Ideal for home and office inverters, solar storage, and telecom backup. Low-maintenance, long-life design. Choose the capacity (Ah) that matches your backup requirement.',
  capacity = '100–220 Ah @ 12 V',
  capacity_options = '["100 Ah @ 12 V","150 Ah @ 12 V","180 Ah @ 12 V","200 Ah @ 12 V","220 Ah @ 12 V"]'::jsonb
WHERE slug = 'tubular-battery-150ah';

UPDATE products SET
  slug = 'smf-battery',
  name = 'SMF (Sealed Maintenance-Free) Battery',
  short_description = 'Sealed maintenance-free battery for UPS and telecom applications.',
  long_description = 'VRLA sealed maintenance-free battery for UPS systems, telecom racks, and emergency lighting. Spill-proof, no topping-up, and compact. Choose the capacity that matches your UPS runtime requirement.',
  capacity = '26–120 Ah @ 12 V',
  capacity_options = '["26 Ah @ 12 V","40 Ah @ 12 V","65 Ah @ 12 V","80 Ah @ 12 V","100 Ah @ 12 V","120 Ah @ 12 V"]'::jsonb
WHERE slug = 'tubular-battery-200ah';

UPDATE products SET
  slug = 'sine-wave-inverter',
  name = 'Pure Sine Wave Inverter',
  short_description = 'DSP-based pure sine wave inverter for home and office.',
  long_description = 'Compact pure sine wave inverter with automatic mains pass-through, fast switchover, and intelligent battery charging. Ideal for apartments, small offices, and sensitive electronics. Choose the capacity that matches your load.',
  capacity = '600 VA – 5 kVA',
  capacity_options = '["600 VA / 500 W","1 kVA / 800 W","1.5 kVA / 1200 W","2 kVA / 1600 W","3 kVA / 2400 W","5 kVA / 4000 W"]'::jsonb
WHERE slug = 'sine-wave-inverter-1kva';

UPDATE products SET
  slug = 'solar-hybrid-inverter',
  name = 'Solar Hybrid Inverter',
  short_description = 'Sine wave inverter with built-in solar charging (PWM/MPPT).',
  long_description = 'Hybrid inverter with built-in solar charging, dual battery support, and bypass switch. Suited for large homes, showrooms, and small workshops looking to combine grid and solar power. Choose the capacity that matches your load.',
  capacity = '1–5 kVA',
  capacity_options = '["1 kVA / 800 W","2 kVA / 1600 W","3 kVA / 2400 W","5 kVA / 4000 W"]'::jsonb
WHERE slug = 'sine-wave-inverter-3kva';

UPDATE products SET
  slug = 'offline-ups',
  name = 'Off-Line UPS (Line-Interactive)',
  short_description = 'Line-interactive UPS with AVR for desktops and small loads.',
  long_description = 'Line-interactive UPS with automatic voltage regulation (AVR) for desktop PCs, point-of-sale terminals, and home electronics. Compact, quiet, and budget-friendly. Choose the capacity that matches your load.',
  capacity = '600 VA – 2 kVA',
  capacity_options = '["600 VA / 360 W","1 kVA / 600 W","2 kVA / 1200 W"]'::jsonb
WHERE slug = 'offline-ups-1kva';

UPDATE products SET
  slug = 'servo-stabilizer',
  name = 'Servo Voltage Stabilizer',
  short_description = 'Servo-controlled voltage stabilizer for sensitive equipment.',
  long_description = 'Servo-controlled automatic voltage stabilizer delivering stable output within ±1% despite wide input fluctuations. Ideal for medical equipment, CNC machines, air conditioners, and industrial loads. Choose the capacity that matches your load.',
  capacity = '1–50 kVA',
  capacity_options = '["1 kVA","3 kVA","5 kVA","10 kVA","15 kVA","25 kVA","50 kVA"]'::jsonb
WHERE slug = 'voltage-stabilizer-5kva';

UPDATE products SET
  slug = 'auto-stabilizer',
  name = 'Automatic Voltage Stabilizer (Relay)',
  short_description = 'Relay-based automatic stabilizer for home appliances.',
  long_description = 'Relay-type automatic voltage stabilizer for refrigerators, TVs, and home appliances. Compact and affordable with wide input range and overload protection. Choose the capacity that matches your appliance.',
  capacity = '2–10 kVA',
  capacity_options = '["2 kVA","3 kVA","5 kVA","10 kVA"]'::jsonb
WHERE slug = 'voltage-stabilizer-10kva';
