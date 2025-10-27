import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  StatusBar,
  Dimensions,
  Easing
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Dados das elipses (TAMANHOS AUMENTADOS 0.5X - 50% MAIORES)
const ellipseImages = [
  {
    className: "top-[89px] left-[93px] w-[960px] h-[783px]",
    src: "https://c.animaapp.com/mh6yuqnhRPXYmj/img/ellipse-16.png",
    alt: "Ellipse",
    delay: "100",
  },
  {
    className: "top-[239px] left-[234px] w-[675px] h-[491px]",
    src: "https://c.animaapp.com/mh6yuqnhRPXYmj/img/ellipse-17.png",
    alt: "Ellipse",
    delay: "150",
  },
  {
    className: "top-[332px] left-[360px] w-[423px] h-[300px]",
    src: "https://c.animaapp.com/mh6yuqnhRPXYmj/img/ellipse-18.png",
    alt: "Ellipse",
    delay: "200",
  },
  {
    className: "top-[135px] left-[146px] w-[854px] h-[686px]",
    src: "https://c.animaapp.com/mh6yuqnhRPXYmj/img/ellipse-13.png",
    alt: "Ellipse",
    delay: "250",
  },
  {
    className: "top-[218px] left-[233px] w-[678px] h-[519px]",
    src: "https://c.animaapp.com/mh6yuqnhRPXYmj/img/ellipse-14.png",
    alt: "Ellipse",
    delay: "300",
  },
  {
    className: "top-[305px] left-[320px] w-[504px] h-[353px]",
    src: "https://c.animaapp.com/mh6yuqnhRPXYmj/img/ellipse-12.png",
    alt: "Ellipse",
    delay: "350",
  },
  {
    className: "top-[372px] left-[414px] w-[315px] h-[216px]",
    src: "https://c.animaapp.com/mh6yuqnhRPXYmj/img/ellipse-11.png",
    alt: "Ellipse",
    delay: "400",
  },
  {
    className: "top-[435px] left-[411px] w-[321px] h-[84px]",
    src: "https://c.animaapp.com/mh6yuqnhRPXYmj/img/logo-1.png",
    alt: "Logo",
    delay: "500",
  }
];

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Animações para cada elipse
  const animations = ellipseImages.map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    // Animação principal de fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animações sequenciais para as elipses
    const ellipseAnimations = ellipseImages.map((ellipse, index) => {
      return Animated.timing(animations[index], {
        toValue: 1,
        duration: 800,
        delay: parseInt(ellipse.delay) || index * 100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      });
    });

    Animated.stagger(100, ellipseAnimations).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, []);

  const renderEllipse = (ellipse, index) => {
    const isLogo = ellipse.src.includes('logo');
    
    return (
      <Animated.Image
        key={index}
        source={{ uri: ellipse.src }}
        style={[
          styles.ellipse,
          getEllipseStyle(ellipse.className),
          {
            opacity: animations[index],
            transform: [
              {
                scale: animations[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1]
                })
              }
            ]
          }
        ]}
        resizeMode={isLogo ? "contain" : "cover"}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#414A00" barStyle="light-content" />
      
      <Animated.View style={[styles.mainContainer, { opacity: fadeAnim }]}>
        {/* Fundo principal */}
        <Image
          source={{ uri: "https://c.animaapp.com/mh6yuqnhRPXYmj/img/ellipse-15.png" }}
          style={styles.background}
          resizeMode="cover"
        />
        
        {/* Renderizar todas as elipses */}
        {ellipseImages.map(renderEllipse)}
      </Animated.View>
    </View>
  );
};

// Função para converter classes Tailwind para StyleSheet
const getEllipseStyle = (className) => {
  const styles = {};
  
  // Extrair valores das classes
  const topMatch = className.match(/top-\[(\d+)px\]/);
  const leftMatch = className.match(/left-\[(\d+)px\]/);
  const widthMatch = className.match(/w-\[(\d+)px\]/);
  const heightMatch = className.match(/h-\[(\d+)px\]/);
  
  // Valores padrão do Tailwind (multiplicados por 1.5)
  const tailwindValues = {
    'left-60': 360, // 240 * 1.5 = 360
    'h-36': 216,    // 144 * 1.5 = 216
    'h-14': 84,     // 56 * 1.5 = 84
  };

  if (topMatch) styles.top = parseInt(topMatch[1]);
  if (leftMatch) styles.left = parseInt(leftMatch[1]);
  if (widthMatch) styles.width = parseInt(widthMatch[1]);
  if (heightMatch) styles.height = parseInt(heightMatch[1]);
  
  // Lidar com classes Tailwind específicas (multiplicadas por 1.5)
  if (className.includes('left-60')) styles.left = 360;
  if (className.includes('h-36')) styles.height = 216;
  if (className.includes('h-14')) styles.height = 84;

  return styles;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#414A00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContainer: {
    width: 1146, // 764 * 1.5 = 1146
    height: 957, // 638 * 1.5 = 957
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.3,
  },
  ellipse: {
    position: 'absolute',
  },
});

export default SplashScreen;