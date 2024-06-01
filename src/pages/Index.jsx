import { Container, Text, VStack, Box, Heading, Textarea, Button, List, ListItem, Divider } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, newPost]);
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
          <List spacing={3}>
            {posts.map((post, index) => (
              <ListItem key={index} p={3} shadow="md" borderWidth="1px" borderRadius="md">
                {post}
              </ListItem>
            ))}
          </List>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;