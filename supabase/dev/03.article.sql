CREATE TABLE public.article (
    created_at date DEFAULT now(),
    text text,
    title character varying,
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid
);


ALTER TABLE public.article OWNER TO supabase_admin;