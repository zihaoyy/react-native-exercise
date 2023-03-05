import React from 'react';
import {
  Animated,
  PanResponder,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { WINDOW_HEIGHT } from "./src/utils";
import { Colors } from "react-native/Libraries/NewAppScreen";

import FloatingBottomSheet from "./src/components/animation/FloatingBottomSheet";
import FlatListAndAnimatedAPI from "./src/components/animation/HorizontalCardFlatList";
import GalleryViewSyncedFlatList from "./src/components/animation/GalleryViewSyncedFlatList";
import ScrollFlatListItem from "./src/components/animation/ScrollFlatListItem";
import Carousel3DFlatList from "./src/components/animation/Carousel3DFlatList";
import ParallaxCarouselFlatList from "./src/components/animation/ParallaxCarouselFlatList";
// import PrgressBarIndicator from "./src/components/animation/ProgressBarIndicator";
// import ZaraMobile from "./src/components/animation/ZaraMobile";
import Loading from './src/components/animation/Loading';

import 'react-native-reanimated';
import 'react-native-gesture-handler';

export default () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    flex: 1,
    backgroundColor: true ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Loading />
    </SafeAreaView>
  );
};