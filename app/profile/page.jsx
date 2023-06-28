'use client';

import React, {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {

  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if(session?.user.id){
      fetchPosts();
    }
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirm = confirm('Are you sure you want to delete');
    if(hasConfirm){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,
        {
          method: 'DELETE',
        });

        const newData = posts.filter(x=>x._id !== post._id);
        setPosts(newData);
        
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name="Quoc Cuong"
      desc="Chào mừng bạn đến với thông tin cá nhân"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default MyProfile;