import { CheckOffIcon, CheckOnIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import DeleteModal from "@/components/common/modal/DeleteModal";
import PlaceMini from "@/components/place/PlaceMini";
import { invalidateQueries } from "@/util/query/invalidateQueries";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

export default function LikeList({ places }: { places: PlacePrev[] }) {
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
    // 좋아요 토글 api 호출 추가 필요

    invalidateQueries([["likePlaces"]]);

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
              총 {places.length}개
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
        {places.map((place) => {
          const isSelected = selectedIds.includes(place.contentId);
          return (
            <Pressable
              key={place.contentId}
              className={`flex-row gap-2 items-center`}
              onPress={
                isEditing ? () => handleSelect(place.contentId) : undefined
              }
            >
              {isEditing && (isSelected ? <CheckOnIcon /> : <CheckOffIcon />)}
              <PlaceMini
                id={place.contentId}
                imageUrl={place.firstImage}
                title={place.title}
                desc={place.title}
                category={1}
                icon={<></>}
                onPress={
                  isEditing ? () => handleSelect(place.contentId) : undefined
                }
              />
            </Pressable>
          );
        })}
      </ScrollView>
      <DeleteModal
        body="선택한 장소를 삭제할까요?"
        isDeleteModalVisible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        handleConfirmDelete={handleConfirmDelete}
      />
    </View>
  );
}
