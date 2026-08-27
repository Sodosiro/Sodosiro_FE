import { CheckOffIcon, CheckOnIcon } from "@/assets/svgs";
import CustomText from "@/components/common/CustomText";
import EmptyState from "@/components/common/EmptyState";
import DeleteModal from "@/components/common/modal/DeleteModal";
import Spinner from "@/components/common/Spinner";
import PlaceMini from "@/components/place/PlaceMini";
import { useLikePlaceMutation } from "@/hooks/mutation/place";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, View } from "react-native";

export default function LikeList({
  totalCount,
  places,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  totalCount: number;
  places: PlacePrev[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const { mutate } = useLikePlaceMutation();

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
    if (selectedIds.length === 0) return;

    mutate(selectedIds);

    setSelectedIds([]);
    setIsEditing(false);
    setIsDeleteModalVisible(false);
  };

  return (
    <View className="pt-3 flex-1">
      {places?.length < 0 ? (
        <>
          {/* 상단 */}
          <View className="flex-row justify-between items-center px-5 mb-3">
            {isEditing ? (
              <>
                <CustomText font="body3 tight" className="text-text-secondary">
                  {selectedIds.length}개 선택됨
                </CustomText>

                <View className="flex-row gap-6">
                  <CustomText
                    font="body3 tight"
                    className="text-text-secondary py-2"
                    onPress={handleCancel}
                  >
                    취소
                  </CustomText>

                  <CustomText
                    font="body3 tight"
                    className="text-text-secondary py-2"
                    onPress={handleDelete}
                  >
                    삭제
                  </CustomText>
                </View>
              </>
            ) : (
              <>
                <CustomText font="body3 tight" className="text-text-secondary">
                  총 {totalCount}개
                </CustomText>

                <CustomText
                  font="body3 tight"
                  className="text-text-secondary py-2"
                  onPress={() => setIsEditing(true)}
                >
                  편집
                </CustomText>
              </>
            )}
          </View>

          {/* 목록 */}
          <FlatList
            data={places}
            keyExtractor={(item) => String(item.contentId)}
            contentContainerClassName="px-5 pb-5 gap-4"
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <View className="py-5 items-center">
                  <Spinner />
                </View>
              ) : null
            }
            renderItem={({ item: place }) => {
              const isSelected = selectedIds.includes(place.contentId);

              return (
                <Pressable
                  className="flex-row gap-2 items-center"
                  onPress={
                    isEditing ? () => handleSelect(place.contentId) : undefined
                  }
                >
                  {isEditing &&
                    (isSelected ? <CheckOnIcon /> : <CheckOffIcon />)}

                  <PlaceMini
                    id={place.contentId}
                    imageUrl={place.firstImage}
                    title={place.title}
                    desc={place.title}
                    category={place.category}
                    icon={<></>}
                    onPress={
                      isEditing
                        ? () => handleSelect(place.contentId)
                        : undefined
                    }
                  />
                </Pressable>
              );
            }}
          />

          <DeleteModal
            body="선택한 장소를 삭제할까요?"
            isDeleteModalVisible={isDeleteModalVisible}
            onCancel={() => setIsDeleteModalVisible(false)}
            handleConfirmDelete={handleConfirmDelete}
          />
        </>
      ) : (
        <EmptyState
          title="저장한 장소가 없어요."
          description="관심있는 장소를 저장해보세요."
          actionLabel="탐색하기"
          onPressAction={() => router.push("/(tabs)/explore")}
        />
      )}
    </View>
  );
}
