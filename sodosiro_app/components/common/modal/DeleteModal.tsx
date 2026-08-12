import { TrashIcon } from "@/assets/svgs";
import { Modal, Pressable, View } from "react-native";
import CustomText from "../CustomText";
import AnimatedButton from "../animated/AnimatedButton";

export default function DeleteModal({
  body,
  isDeleteModalVisible,
  onCancel,
  handleConfirmDelete,
}: {
  body: string;
  isDeleteModalVisible: boolean;
  onCancel: () => void;
  handleConfirmDelete: () => void;
}) {
  return (
    <Modal
      visible={isDeleteModalVisible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onPress={onCancel}
      >
        <View
          className="w-[80%] rounded-2xl bg-bg py-5 px-8 gap-6 items-center"
          onStartShouldSetResponder={() => true}
        >
          <View className={`p-3 rounded-full bg-[#FFD4D7]`}>
            <TrashIcon color={"#F04452"} />
          </View>
          <CustomText font="title">{body}</CustomText>

          <View className="flex-row gap-2">
            <AnimatedButton
              backgroundColor={["#F5F5F5", "#EDEDED"]}
              className="flex-1 items-center rounded-xl py-4"
              onPress={onCancel}
            >
              <CustomText font="body3 tight">취소</CustomText>
            </AnimatedButton>

            <AnimatedButton
              backgroundColor={["#F04452", "#DD3846"]}
              className="flex-1 items-center rounded-xl py-4"
              onPress={handleConfirmDelete}
            >
              <CustomText font="body3 tight" className={`text-white`}>
                삭제
              </CustomText>
            </AnimatedButton>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
