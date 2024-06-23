import React, { useState } from 'react';
import { Center, HStack, VStack, Button, Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ChatBar from './components/ChatBar'; // Importa el ChatBar
import './Home.css';
import { FaStar } from 'react-icons/fa'; // Importa el icono de estrella
import { Comp_1 } from './Button_change';
import { ReadState } from './ReadState';
import { Comp_2 } from './retrive_but';

function Home() {
  const [circleColor, setCircleColor] = useState('red');
  const [colorChangeCount, setColorChangeCount] = useState(0);
  const [ratings, setRatings] = useState({ llamas: 0, claude: 0, chatgpt: 0 }); // Estado para las calificaciones
  const [showOutput, setShowOutput] = useState(false); // Estado para mostrar/ocultar el cuadro de salida
  const [output, setOutput] = useState(); // Estado para almacenar el vector de strings

  const handleWorkClick = () => {
    setCircleColor(prevColor => prevColor === 'red' ? 'green' : 'red');
    setColorChangeCount(prevCount => prevCount + 1);
  };

  const handleRetrieveClick = () => {
    const outputData = ["La Constitución Política del Perú no contempla la posibilidad de adquirir la propiedad de un terreno de tierra simplemente por habitarlo durante un período de tiempo determinado, como dos años. La adquisición de la propiedad por posesión (usucapión) está regulada en el Código Civil peruano. El Código Civil del Perú establece que la posesión continuada y pacífica de un bien inmueble puede llevar a la adquisición de su propiedad a través de la usucapión. Para ello, se deben cumplir ciertos requisitos: Posesión continua y pacífica y Plazo legal.",""]; // Vector de strings
    setOutput(outputData);
    setShowOutput(true);
  };

  // Función para manejar la selección de estrellas
  const handleStarClick = (assistant, ratingValue) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [assistant]: ratingValue
    }));
  };

  return (
    <div className="home-container">
      <HStack spacing={10}>
        <VStack>
          <Button as={Link} to="/home">
            Route 1
          </Button>
          <Button as={Link} to="/main">
            Metricas
          </Button>
        </VStack>
        <VStack>
          <Box className="floating-box" p={5} borderWidth="1px" borderRadius="lg">
            <Heading as="h3" size="lg">Welcome back 👋</Heading>
            <Heading as="h1" size="2xl">This is CLAMZ,</Heading>
            <HStack spacing={5}>
              <Box className="assistant" textAlign="center">
                <ReadState/>
                <Heading as="h3" size="md">Llamas Assistant</Heading>
                <Text>Completed Tasks</Text>
                <Text>{colorChangeCount}</Text>
              </Box>
              <Box className="assistant" textAlign="center">
                <ReadState/>
                <Heading as="h3" size="md">Claude Assistant</Heading>
                <Text>Completed Tasks</Text>
                <Text>{colorChangeCount}</Text>
              </Box>
              <Box className="assistant" textAlign="center">
                <ReadState/>
                <Heading as="h3" size="md">ChatGPT Assistant</Heading>
                <Text>Completed Tasks</Text>
                <Text>{colorChangeCount}</Text> 
              </Box>
            </HStack>

            {showOutput && (
              <Box mt={5} textAlign="center" borderWidth="1px" borderRadius="lg" p={5} backgroundColor="white" color="black">
                <Heading as="h3" size="md">Output</Heading>
                <Text>{output.join(', ')}</Text>
                <Box mt={5}>
                  <Heading as="h3" size="md">Rate Us</Heading>
                  <HStack spacing={1} justifyContent="center">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <FaStar
                        key={value}
                        size={30}
                        color={value <= ratings.llamas ? "gold" : "gray"}
                        onClick={() => handleStarClick('llamas', value)}
                        style={{ cursor: 'pointer' }}
                      />
                    ))}
                  </HStack>
                  <Text mt={2}>{ratings.llamas}/5</Text>
                </Box>
              </Box>
            )}

            <Center>
              <HStack spacing={4} mt={5} >
                <Box onClick={handleWorkClick}>
                <Comp_1 />
                </Box>
                <Box onClick={handleRetrieveClick}>
                  <Comp_2/>
                </Box>
              </HStack>
            </Center>
          </Box>
        </VStack>
      </HStack>
      <div className="task-manager">
        <ChatBar />
      </div>
    </div>
  );
}

export { Home };
