import { Text } from 'react-native-paper';
import React, { forwardRef, useMemo, useState, useCallback } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useGlobalStyles } from '~/styles/globalStyles';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  title?: string;
  style?: ViewStyle;
  snapPoints: string[];
  children?: React.ReactNode;
}
type Ref = BottomSheet;
const CustomBottomSheet = forwardRef<Ref, Props>(({ title, style, snapPoints, children }, ref) => {
  const Globalstyles = useGlobalStyles();
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      enablePanDownToClose = {true}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: '#DFE2EB' }}
      handleComponent={null}>
      {title ? (
        <View style={styles.contentContainer}>
          <Text style={styles.containerHeadline}>{title}</Text>
        </View>
      ) : null}
      {children}
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: 600,
    padding: 20,
    color: '#000000',
  },
});
export default CustomBottomSheet;
