import { useEffect, useState } from 'react';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function Demo() {
  const [isLoading, setIsLoading] = useState(false); // Fixed typo in setIsLoading
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true); // Moved inside fetchPosts to properly track loading state
      
      try {
        const response = await fetch(`${BASE_URL}/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const postsData = await response.json();
        setPosts(postsData.slice(0, 30)); // Limiting to 30 posts as per your comment
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false); // Moved to finally block to ensure loading state is always reset
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading posts...</div>; // Added proper loading state return
  }

  return (
    <div className="tutorial">
      <h1 className='mb-4 text-2xl'>Data fetching in React</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}