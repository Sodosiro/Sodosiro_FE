import BottomSheet from "@/components/common/BottomSheet";
import CustomText from "@/components/common/CustomText";
import TripPlacesSection from "@/components/tripCondition/TripPlacesSection";
import VerificationBottomSheet from "@/components/verification/VerificationBottomSheet";
import { useToast } from "@/contexts/ToastProvider";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Dispatch, memo, SetStateAction, useCallback, useRef, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import DraggableFlatList, {
  OpacityDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import TimelineItem from "../TimelineItem";

type TimelineDaySectionProps = {
  dayPlan: DayPlan;
  dayIndex: number;
  mode: "isOngoing" | "isUpcoming" | "completed";
  isEditing?: boolean;
  setPlan?: Dispatch<SetStateAction<DayPlan[]>>;
  setOnDrag?: Dispatch<SetStateAction<boolean>>;
  onLayout: (e: LayoutChangeEvent) => void;
};

function TimelineDaySection({
  dayPlan,
  dayIndex,
  mode,
  isEditing = false,
  setPlan,
  setOnDrag,
  onLayout,
}: TimelineDaySectionProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedId, setSelectedId] = useState<number | null>(dayPlan.places[0]?.id);
  const [showLocation, setShowLocation] = useState(false);
  const [changeTargetId, setChangeTargetId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<PlaceType | null>(null);
  const { showToast } = useToast();

  const handleToggle = useCallback((placeId: number) => {
    setSelectedId((prev) => (prev === placeId ? null : placeId));
  }, []);

  const renderEditableItem = useCallback(
    ({ item, getIndex, drag }: RenderItemParams<PlaceType>) => {
      const index = getIndex() ?? 0;

      return (
        <OpacityDecorator>
          <TimelineItem
            place={item}
            isExpanded={item.id === selectedId && !isEditing}
            isEditing={isEditing}
            onToggle={() => handleToggle(item.id)}
            order={index + 1}
            mode={mode}
            onLongPress={isEditing ? drag : undefined}
            isFirstIndex={index == 0}
          />
        </OpacityDecorator>
      );
    },
    [selectedId, isEditing, handleToggle, mode],
  );

  const handleDragBegin = useCallback(() => {
    setOnDrag?.(true);
  }, [setOnDrag]);

  const handleDragEnd = useCallback(
    ({ data }: { data: PlaceType[] }) => {
      setOnDrag?.(false);
      setPlan?.((prev) =>
        prev.map((day) =>
          day.id === dayPlan.id
            ? {
                ...day,
                places: data,
              }
            : day,
        ),
      );
    },
    [setOnDrag, setPlan, dayPlan.id],
  );

  // 장소 선택
  const handleSelectPlace = useCallback(
    (selectedPlace: PopularPlaceType) => {
      if (changeTargetId === null) return;

      // 기존 장소와 동일한 장소를 선택한 경우 변경하지 않음
      if (selectedPlace.id === changeTargetId) {
        setShowLocation(false);
        setChangeTargetId(null);
        return;
      }

      // 현재 변경하려는 장소가 이미 같은 일차에 존재하는 경우
      const isDuplicatePlace = dayPlan.places.some(
        (item) => item.id === selectedPlace.id && item.id !== changeTargetId,
      );

      if (isDuplicatePlace) {
        setShowLocation(false);
        showToast("이미 해당 일차에 추가된 장소입니다.");
        return;
      }

      setPlan?.((prev) =>
        prev.map((day) => {
          if (day.id !== dayPlan.id) {
            return day;
          }

          return {
            ...day,
            places: day.places.map((place) =>
              place.id === changeTargetId
                ? {
                    ...place,
                    ...selectedPlace,
                  }
                : place,
            ),
          };
        }),
      );

      setShowLocation(false);
      setChangeTargetId(null);
    },
    [changeTargetId, dayPlan.id, setPlan],
  );

  // 장소 변경 버튼 클릭
  const handleChangePlace = useCallback((placeId: number) => {
    setChangeTargetId(placeId);
    setShowLocation(true);
  }, []);

  return (
    <View
      onLayout={onLayout}
      className="mb-6 px-5 rounded-2xl border border-border bg-white py-1 overflow-hidden"
    >
      <CustomText font="title" className="text-primary-dark pt-3">
        {dayPlan.dateLabel}
      </CustomText>

      {isEditing ? (
        <DraggableFlatList
          onDragBegin={setOnDrag ? handleDragBegin : undefined}
          data={dayPlan.places ?? []}
          onDragEnd={setOnDrag && setPlan ? handleDragEnd : undefined}
          activationDistance={10}
          scrollEnabled={false}
          keyExtractor={(item) => `place-${item.id}`}
          renderItem={renderEditableItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View>
          {dayPlan.places?.map((place, index) => (
            <TimelineItem
              key={`place-${place.id}`}
              place={place}
              isExpanded={place.id === selectedId}
              isEditing={false}
              onToggle={() => handleToggle(place.id)}
              order={index + 1}
              mode={mode}
              isFirstIndex={index == 0}
              onChangePlace={() => {
                handleChangePlace(place.id);
                setShowLocation(true);
              }}
              onVerificationPlace={() => {
                setSelectedItem(place);
                bottomSheetRef.current?.present();
              }}
            />
          ))}
          {showLocation && (
            <BottomSheet visible={showLocation} onClose={() => setShowLocation(false)}>
              <TripPlacesSection onSelectPlace={handleSelectPlace} />
              <View className="pt-5"></View>
            </BottomSheet>
          )}
          <VerificationBottomSheet
            ref={bottomSheetRef}
            selectedItem={selectedItem}
            showToast={showToast}
            onClose={() => bottomSheetRef?.current?.close()}
          />
        </View>
      )}
    </View>
  );
}

export default memo(TimelineDaySection);
