
create table public.contacts (
    created_at timestamp with time zone DEFAULT now(),
    "Full name" character varying,
    email character varying,
    message text,
    id_contact uuid DEFAULT extensions.uuid_generate_v4()
);

alter table public.contacts enable row level security;

CREATE POLICY "Anonymous write access to contacts" ON "public"."contacts"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true)
