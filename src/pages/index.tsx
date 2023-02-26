import { Box, chakra, shouldForwardProp, Text } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import Head from 'next/head';
import { useState } from 'react';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
    weight: '200',
    style: 'italic',
    subsets: ['latin'],
});

const MotionBox = chakra(motion.div, {
    shouldForwardProp: (prop) =>
        isValidMotionProp(prop) || shouldForwardProp(prop),
});

export default function Home() {
    const [xy, setXy] = useState([0, 0]);
    const [glareOpacity, setGlareOpacity] = useState(0.1);
    const [glareStartXy, setGlareStartXy] = useState(['left', 'bottom']);
    return (
        <>
            <Head>
                <title>Glare Glassmorphism With Tilt Effect</title>
                <meta
                    name="description"
                    content="Glare Glassmorphism With Tilt Effect"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href="/favicon.ico"
                />
            </Head>
            <Box
                className={poppins.className}
                bgColor="blue"
                h="100vh"
                p="5%"
                _after={{
                    content: '""',
                    pos: 'absolute',
                    left: 0,
                    top: 0,
                    w: '100%',
                    h: '100%',
                    clipPath: 'circle(24.3% at 17% 16%)',
                    bgColor: 'blue.500',
                    blur: '4px',
                }}
                _before={{
                    content: '""',
                    pos: 'absolute',
                    left: 0,
                    top: 0,
                    w: '100%',
                    h: '100%',
                    clipPath: 'circle(42.3% at 89% 88%)',
                    bgColor: 'blue.500',
                }}
                sx={{
                    perspective: '3500px',
                    transformStyle: 'preserve-3d',
                }}
            >
                <Box
                    borderRadius="16px"
                    borderLeft="rgba(255, 255, 255, 0.3) solid 1px"
                    borderTop="rgba(255, 255, 255, 0.3) solid 1px"
                    boxShadow="10px 10px 50px rgba(0,0,0,0.5)"
                    bg={`radial-gradient(circle at ${glareStartXy[0]} ${glareStartXy[1]}, rgba(255, 255, 255, ${glareOpacity}), rgba(255, 255, 255, 0.1))`}
                    w="80%"
                    h="100%"
                    mx="auto"
                    textAlign="center"
                    backdropFilter="auto"
                    backdropBlur="4px"
                    onMouseMove={(e) => {
                        const position =
                            e.currentTarget.getBoundingClientRect();
                        const centerX = (position.left + position.right) / 2;
                        const centerY = (position.top + position.bottom) / 2;
                        const diffX =
                            (e.clientX - centerX) /
                            (e.currentTarget.clientWidth / 2);
                        const diffY =
                            (e.clientY - centerY) /
                            (e.currentTarget.clientHeight / 2);
                        setGlareOpacity(
                            Math.max(
                                Math.sqrt(diffX ** 2 + diffY ** 2) * 0.5,
                                0.1
                            )
                        );
                        setGlareStartXy([
                            e.clientX - centerX > 0 ? 'right' : 'left',
                            e.clientY - centerY > 0 ? 'bottom' : 'top',
                        ]);
                        setXy([10 * diffY, -10 * diffX]);
                    }}
                    onMouseOut={() => {
                        setXy([0, 0]), setGlareOpacity(0.1);
                    }}
                    transform={`translateZ(300px) rotateX(${xy[0]}deg) rotateY(${xy[1]}deg)`}
                >
                    <Text
                        color="whiteAlpha.900"
                        fontSize="6xl"
                        h="100%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        Glare Glassmorphism With Tilt Effect
                    </Text>
                </Box>
            </Box>
        </>
    );
}
