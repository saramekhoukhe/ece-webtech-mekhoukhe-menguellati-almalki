import { supabase } from "../api/supabase";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout.js'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const Create = ({user}) => {
 const initialState = {
   title: "",
   text: ""
 };

 const router = useRouter();
 const [postData, setPost] = useState(initialState);

 const { title, text } = postData;

 const handleChange = (e) => {
   setPost({ ...postData, [e.target.name]: e.target.value });
 };

 const createPost = async () => {
   try {
     
     const { data, error } = await supabase
       .from("article")
       .insert([
         {
           title,
           text,
           user_id: user?.id,
         },
       ])
       .single();
     if (error) throw error;
     alert("Post created successfully");
     setPost(initialState);
     router.push("/myarticles");
   } catch (error) {
     console.log(error.message);
   }
 };

 return (
    <Layout>
      <Head>
        <title>ECE WebTech Blogs - add article</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="contact">
          <div className="my-10">
            <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">Add Article</h1>
            <div className="mb-5">
              <label className="sr-only"> Title:</label>
              <input
                type="text"
                placeholder="Title"
                name="title"
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4"
              />
            </div>
            <div className="mb-5">
              <label className="sr-only"> Text:</label>
              <textarea
                id="text"
                name="text"
                placeholder="Your Article"
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900   rounded-md outline-none  h-36 focus:ring-4"
              />
            </div>
            <button onClick={createPost}                 
                    className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black ">
            
              Add 
            </button>
          </div>
        </div>
      </div>
    </Layout>
 );
};
export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
      user: session.user
    },
  }
}
export default Create;