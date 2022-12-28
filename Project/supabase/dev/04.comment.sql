CREATE TABLE public.comment (
    created_at timestamp with time zone DEFAULT now(),
    text text,
    user_id uuid,
    article_id uuid,
    id_comment uuid DEFAULT extensions.uuid_generate_v4() NOT NULL
);


ALTER TABLE public.comment OWNER TO supabase_admin;