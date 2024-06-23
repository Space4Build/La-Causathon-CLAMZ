import React from 'react';
import { Box, Button, Heading, VStack, HStack, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import './App.css'; // Asegúrate de importar el archivo CSS

function Landing() {
  return (
    <Box position="relative" width="100%" height="100vh" overflow="hidden">
      <Box className="bg-image" position="absolute" top="0" left="0" width="100%" height="100%" zIndex="0"></Box>
      <Box position="relative" zIndex="1" bg="rgba(0, 0, 0, 0.7)" color="white" minH="100vh" p={10}>
        <HStack spacing={20} align="center">
          <VStack align="flex-start" spacing={6}>
            <Image src="./jsaf.png" alt="Logo" boxSize="150px" />
            <Heading as="h1" size="2xl">Decentralized Load Balancer</Heading>
            <Text fontSize="lg">CLEMZ es una plataforma que ofrece un pipelining de tareas realizadas por asistentes virtuales.</Text>
            <Button as={Link} to="/home" colorScheme="yellow" zIndex="2">
              Task Manager
            </Button>
            <Button as={Link} to="/main" colorScheme="yellow" zIndex="2">
              Metrics
            </Button>
          </VStack>
          <Box>
            <Image src="/illustration.png" alt="." boxSize="600px" />
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}

export { Landing };
