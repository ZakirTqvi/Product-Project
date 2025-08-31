import {
  Box,
  Button,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  Input,
  useToast} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { set } from "mongoose";
const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toasts = useToast();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if(!success) {
      toasts({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toasts({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }

    setNewProduct({
      name: "",
      price: "",
      image: "",
    });
    
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={4}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
          </VStack>
          <Button colorScheme="blue" onClick={handleAddProduct} w="full">
            Add Product
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
