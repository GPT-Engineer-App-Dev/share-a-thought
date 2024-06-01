import { Container, Text, VStack, Box, Heading, Textarea, Button, List, ListItem, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { usePosts, useAddPost } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const addPostMutation = useAddPost();
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      addPostMutation.mutate({ title: newPost, body: newPost, author_id: "some-author-id", likes_count: 0 });
      setNewPost("");
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Public Post Board</Heading>
        <Box width="100%">
          <Textarea
            placeholder="Write your post here..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            size="md"
          />
          <Button mt={2} colorScheme="blue" onClick={handlePostSubmit}>Post</Button>
        </Box>
        <Divider />
        <Box width="100%">
          <Heading as="h2" size="lg" mb={4}>Posts</Heading>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : isError ? (
            <Text>Error loading posts</Text>
          ) : (
            <List spacing={3}>
              {posts.map((post) => (
                <ListItem key={post.id} p={3} shadow="md" borderWidth="1px" borderRadius="md">
                  {post.title}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;