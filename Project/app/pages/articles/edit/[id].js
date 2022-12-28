import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from '../../api/supabase'
import Layout from '../../../components/Layout.js'
import Head from 'next/head'

const Edit = () => {
  const [post, setPost] = useState(null);
  const router = useRouter();

  const { id } = router.query;
  useEffect(() => {
    const getPost = async () => {
      if (!id) return;

      const { data } = await supabase
        .from("article")
        .select("*")
        .filter("id", "eq", id)
        .single();
      setPost(data);
    };
    getPost();
  }, [id]);

  const handleOnChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const updatePost = async () => {
    const { title, text} = post;
    const user = supabase.auth.user
    console.log(user)
    const { error } = await supabase
      .from("article")
      .update({
        title,
        text,
      })
      .eq("id", id)
    
    if(error){
      console.log(error)
    }
    router.push("/myarticles");
  };
  return (
    <Layout>
      <Head>
        <title>ECE WebTech Blogs - edit article</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="contact">
          <div className="my-10">
            <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">Edit Article</h1>
            <div className="mb-5">
              <label className="sr-only"> Title:</label>
              <input
                type="text"
                name="title"
                value={post?.title}
                onChange={handleOnChange}
                className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900   focus:ring-4"
              />
            </div>
            <div className="mb-5">
              <label className="sr-only"> Text:</label>
              <textarea
                id="text"
                name="text"
                value={post?.text}
                onChange={handleOnChange}
                placeholder="Your Article"
                className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900   rounded-md outline-none  h-36 focus:ring-4"
              />
            </div>
            <button onClick={updatePost} className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black ">
              Update 
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Edit;