-- Profiles (for instructors/admins)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique,
  role text default 'user' check (role in ('user', 'admin', 'instructor')),
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Bookings table
create table public.bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users, -- Optional for guest bookings if supported
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  pickup_address text,
  lesson_type text not null,
  booking_date date not null,
  booking_time time not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_status text default 'unpaid' check (payment_status in ('unpaid', 'paid', 'refunded')),
  stripe_payment_id text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for bookings
alter table public.bookings enable row level security;

-- Policies for bookings
-- Admins can view all bookings
create policy "Admins can view all bookings" on public.bookings
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Admins can update bookings
create policy "Admins can update bookings" on public.bookings
  for update using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Anyone can insert bookings (for guest checkout)
create policy "Anyone can create bookings" on public.bookings
  for insert with check (true);

-- Enquiries table (Contact form / NDIS)
create table public.enquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  message text,
  type text default 'general' check (type in ('general', 'ndis', 'driving_lesson', 'careers')),
  status text default 'new' check (status in ('new', 'in_progress', 'resolved')),
  metadata jsonb, -- For extra fields like NDIS details
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for enquiries
alter table public.enquiries enable row level security;

-- Policies for enquiries
create policy "Admins can view all enquiries" on public.enquiries
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

create policy "Admins can update enquiries" on public.enquiries
  for update using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

create policy "Anyone can create enquiries" on public.enquiries
  for insert with check (true);

-- Instructor Availability (Optional for now, but good for future)
create table public.availability (
  id uuid default gen_random_uuid() primary key,
  instructor_id uuid references public.profiles(id),
  day_of_week integer check (day_of_week between 0 and 6), -- 0=Sunday
  start_time time not null,
  end_time time not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.availability enable row level security;
