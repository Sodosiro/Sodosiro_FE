import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ReactNode, useCallback, useEffect, useMemo, useRef } from "react";

type Props = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  minHeight?: number;
};

export default function BottomSheet({
  visible,
  onClose,
  children,
  minHeight,
}: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => {
    if (minHeight) {
      return [`${minHeight}px`, "80%"];
    }

    return [280, "80%"];
  }, [minHeight]);

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [visible]);

  const handleDismiss = useCallback(() => {
    onClose();
  }, [onClose]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      onDismiss={handleDismiss}
      handleIndicatorStyle={{
        width: 48,
        height: 4,
        borderRadius: 999,
        backgroundColor: "#D9D9D9",
      }}
      backgroundStyle={{
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
      }}
    >
      <BottomSheetView className="flex-1">{children}</BottomSheetView>
    </BottomSheetModal>
  );
}
