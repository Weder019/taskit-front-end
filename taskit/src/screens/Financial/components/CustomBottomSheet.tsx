import {Text} from 'react-native-paper';
import React, { forwardRef, useMemo } from 'react';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useGlobalStyles } from '~/styles/globalStyles';
import { View,ViewStyle, StyleSheet } from 'react-native';

interface Props {
  title?: string;
  style?: ViewStyle;
}
type Ref = BottomSheet;
const CustomBottomSheet = forwardRef<Ref, Props>(
  ({ title, style}, ref) => {
    const Globalstyles = useGlobalStyles();

    const snapPoints = useMemo(() => ['55%', '90%'], []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        enableDynamicSizing={false}
        // onChange={OnChange}
        // backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: '#37618E' }}
        handleIndicatorStyle={{ backgroundColor: '#FFF' }}>
        <View style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>{title}</Text>
        </View>
        <BottomSheetView>{'se'}</BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: 600,
    padding: 20,
    color: '#fff',
  },
});
export default CustomBottomSheet;