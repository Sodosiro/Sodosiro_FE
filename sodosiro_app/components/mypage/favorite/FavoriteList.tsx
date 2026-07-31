import { CheckOffIcon, CheckOnIcon, TrashIcon } from "@/assets/svgs";
import AnimatedButton from "@/components/common/AnimatedButton";
import CustomText from "@/components/common/CustomText";
import PlaceMini from "@/components/place/PlaceMini";
import { useFavoriteStore } from "@/stores/useFavoriteStore";
import { Dispatch, SetStateAction, useState } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";

export default function FavoriteList() {
  const { favoritePlaces, removeFavorites } = useFavoriteStore();

  const [isEditing, setIsEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return;

    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setSelectedIds([]);
    setIsEditing(false);
  };

  const handleConfirmDelete = () => {
    removeFavorites(selectedIds);
    setSelectedIds([]);
    setIsEditing(false);
    setIsDeleteModalVisible(false);
  };

  return (
    <View className={`pt-3 gap-3 flex-1`}>
      <View className={`flex-row justify-between items-center px-5`}>
        {isEditing ? (
          <>
            <CustomText font="body3 tight" className={`text-text-secondary`}>
              {selectedIds.length}개 선택됨
            </CustomText>
            <View className={`flex-row gap-6`}>
              <CustomText
                font="body3 tight"
                className={`text-text-secondary py-2`}
                onPress={handleCancel}
              >
                취소
              </CustomText>
              <CustomText
                font="body3 tight"
                className={`text-text-secondary py-2`}
                onPress={handleDelete}
              >
                삭제
              </CustomText>
            </View>
          </>
        ) : (
          <>
            <CustomText font="body3 tight" className={`text-text-secondary`}>
              총 {favoritePlaces.length}개
            </CustomText>
            <CustomText
              font="body3 tight"
              className={`text-text-secondary py-2`}
              onPress={() => setIsEditing(true)}
            >
              편집
            </CustomText>
          </>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        {favoritePlaces.map((place) => {
          const isSelected = selectedIds.includes(place.id);
          return (
            <Pressable
              key={place.id}
              className={`flex-row gap-2 items-center`}
              onPress={isEditing ? () => handleSelect(place.id) : undefined}
            >
              {isEditing && (isSelected ? <CheckOnIcon /> : <CheckOffIcon />)}
              <PlaceMini
                id={place.id}
                imageSource={place.imageSource}
                title={place.title}
                desc={place.desc}
                icon={<></>}
                onPress={isEditing ? () => handleSelect(place.id) : undefined}
              />
            </Pressable>
          );
        })}
      </ScrollView>
      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
        handleConfirmDelete={handleConfirmDelete}
      />
    </View>
  );
}

const DeleteModal = ({
  isDeleteModalVisible,
  setIsDeleteModalVisible,
  handleConfirmDelete,
}: {
  isDeleteModalVisible: boolean;
  setIsDeleteModalVisible: Dispatch<SetStateAction<boolean>>;
  handleConfirmDelete: () => void;
}) => {
  return (
    <Modal
      visible={isDeleteModalVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setIsDeleteModalVisible(false)}
    >
      <Pressable
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onPress={() => setIsDeleteModalVisible(false)}
      >
        <View
          className="w-[80%] rounded-2xl bg-bg py-5 px-8 gap-4 items-center"
          onStartShouldSetResponder={() => true}
        >
          <View className={`p-3 rounded-full bg-bg-subtle`}>
            <TrashIcon />
          </View>
          <CustomText font="title">선택한 장소를 삭제할까요?</CustomText>

          <View className="flex-row gap-2">
            <AnimatedButton
              backgroundColor={["#F5F5F5", "#EDEDED"]}
              className="flex-1 items-center rounded-full py-4 border border-border"
              onPress={() => setIsDeleteModalVisible(false)}
            >
              <CustomText font="body3 tight">취소</CustomText>
            </AnimatedButton>

            <AnimatedButton
              backgroundColor={["#F04452", "#DD3846"]}
              className="flex-1 items-center rounded-full py-4"
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
};
