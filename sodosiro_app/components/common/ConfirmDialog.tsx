import CustomText from "@/components/common/CustomText";
import { Modal, Pressable, View } from "react-native";

type ConfirmDialogProps = {
  visible: boolean;
  title: string;
  cancelText?: string;
  confirmText?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  visible,
  title,
  cancelText = "취소",
  confirmText = "확인",
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      {/* Dimmed Backdrop */}
      <View className="flex-1 justify-center items-center bg-black/40 px-6">
        {/* Modal Box */}
        <View className="w-full max-w-xs bg-white rounded-2xl p-6 shadow-lg">
          {/* Title */}
          <CustomText font="title" className="text-text-primary text-base mb-8">
            {title}
          </CustomText>

          {/* Action Buttons */}
          <View className="flex-row justify-end items-center gap-5">
            <Pressable onPress={onClose} hitSlop={8}>
              <CustomText font="body2" className="text-text-muted">
                {cancelText}
              </CustomText>
            </Pressable>

            <Pressable onPress={onConfirm} hitSlop={8}>
              <CustomText font="body2" className="text-text-primary font-bold">
                {confirmText}
              </CustomText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
