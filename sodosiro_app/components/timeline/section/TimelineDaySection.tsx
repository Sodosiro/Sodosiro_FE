import {
  CourseDayItem,
  CourseStatus,
  SpotItem,
  TransportMode,
} from "@/api/course";
import BottomSheet from "@/components/common/BottomSheet";
import CustomText from "@/components/common/CustomText";
import TripPlacesSection from "@/components/tripCondition/TripPlacesSection";
import VerificationBottomSheet from "@/components/verification/VerificationBottomSheet";
import { useToast } from "@/contexts/ToastProvider";
import { formatDateWithDay } from "@/util/date/date";
import { RenderSpotItem } from "@/util/route/route";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { LayoutChangeEvent, View } from "react-native";
import DraggableFlatList, {
  OpacityDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import TimelineItem from "../TimelineItem";

type TimelineDaySectionProps = {
  courseId: number;
  dayPlan: CourseDayItem;
  dayIndex: number;
  mode: CourseStatus | "TEMP";
  isEditing?: boolean;
  transformedSpots?: RenderSpotItem[];
  transportMode?: TransportMode;
  setPlan?: Dispatch<SetStateAction<CourseDayItem[]>>;
  setOnDrag?: Dispatch<SetStateAction<boolean>>;
  onLayout: (e: LayoutChangeEvent) => void;
  onPlaceChanged?: (params: {
    dayDate: string;
    changeTargetId: number;
    changedPlace: SpotItem;
  }) => void;
  onRouteSpotChange?: (spotIndex: number) => void;
};

function TimelineDaySection({
  courseId,
  dayPlan,
  dayIndex,
  mode,
  isEditing = false,
  transformedSpots,
  transportMode,
  setPlan,
  setOnDrag,
  onLayout,
  onPlaceChanged,
  onRouteSpotChange,
}: TimelineDaySectionProps) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedId, setSelectedId] = useState<string | number | null>(
    dayPlan.spots?.[0] ? `${dayPlan.day}_${dayPlan.spots[0]?.contentId}` : null,
  );
  const [showLocation, setShowLocation] = useState(false);
  const [changeTargetId, setChangeTargetId] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<SpotItem | null>(null);
  const { showToast } = useToast();

  const handleToggle = useCallback(
    (placeId: number) => {
      const uniqueKey = `${dayPlan.day}_${placeId}`;
      setSelectedId((prev) => (prev === uniqueKey ? null : uniqueKey));
    },
    [dayPlan.day],
  );

  const renderEditableItem = useCallback(
    ({ item, getIndex, drag }: RenderItemParams<SpotItem>) => {
      const index = getIndex() ?? 0;

      return (
        <OpacityDecorator>
          <TimelineItem
            place={item}
            isExpanded={item.contentId === selectedId && !isEditing}
            isEditing={isEditing}
            onToggle={() => handleToggle(item.contentId)}
            order={index + 1}
            mode={mode}
            onLongPress={isEditing ? drag : undefined}
            isFirstIndex={index === 0}
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
    ({ data }: { data: SpotItem[] }) => {
      setOnDrag?.(false);
      setPlan?.((prev) =>
        prev.map((day) =>
          day.date === dayPlan.date
            ? {
                ...day,
                spots: data,
              }
            : day,
        ),
      );
    },
    [setOnDrag, setPlan, dayPlan.date],
  );

  // 장소 선택
  const handleSelectPlace = useCallback(
    (selectedPlace: SpotItem) => {
      if (changeTargetId === null) return;

      if (selectedPlace.contentId === changeTargetId) {
        setShowLocation(false);
        setChangeTargetId(null);
        return;
      }

      const isDuplicatePlace = dayPlan.spots.some(
        (item) =>
          item.contentId === selectedPlace.contentId &&
          item.contentId !== changeTargetId,
      );

      if (isDuplicatePlace) {
        setShowLocation(false);
        showToast("이미 해당 일차에 추가된 장소입니다.");
        return;
      }

      setPlan?.((prev) =>
        prev.map((day) =>
          day.date === dayPlan.date
            ? {
                ...day,
                spots: day.spots.map((place) =>
                  place.contentId === changeTargetId
                    ? { ...place, ...selectedPlace }
                    : place,
                ),
              }
            : day,
        ),
      );

      setShowLocation(false);
      setChangeTargetId(null);

      onPlaceChanged?.({
        dayDate: dayPlan.date,
        changeTargetId,
        changedPlace: selectedPlace,
      });
    },
    [
      changeTargetId,
      dayPlan.date,
      dayPlan.spots,
      setPlan,
      showToast,
      onPlaceChanged,
    ],
  );

  // 장소 변경 버튼
  const handleChangePlace = useCallback((placeId: number) => {
    setChangeTargetId(placeId);
    setShowLocation(true);
  }, []);

  return (
    <View
      onLayout={onLayout}
      className="mb-6 px-5 rounded-2xl border border-border bg-white py-1 overflow-hidden"
    >
      <View className="pt-3 flex-row items-center gap-2">
        <CustomText font="title" className="text-primary-dark">
          {`${dayPlan.day}일차`}
        </CustomText>
        <CustomText
          font="body3"
          className="text-primary-dark bg-primary-light px-1 py-0.5 rounded"
        >
          {`${formatDateWithDay(dayPlan.date)}`}
        </CustomText>
      </View>

      {isEditing ? (
        <DraggableFlatList
          onDragBegin={setOnDrag ? handleDragBegin : undefined}
          data={dayPlan.spots ?? []}
          onDragEnd={setOnDrag && setPlan ? handleDragEnd : undefined}
          activationDistance={10}
          scrollEnabled={false}
          keyExtractor={(item) => `place-${item.contentId}`}
          renderItem={renderEditableItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View>
          {dayPlan.spots?.map((place, index) => {
            const uniqueKey = `${dayPlan.day}_${place.contentId}`;
            const isExpanded = uniqueKey === selectedId;
            const nextPlace = dayPlan.spots?.[index + 1];
            const transformedSpot = transformedSpots?.[index];

            return (
              <TimelineItem
                key={`place-${uniqueKey}`}
                place={place}
                nextPlace={nextPlace}
                isExpanded={isExpanded}
                isEditing={false}
                transportMode={transportMode}
                routeDetail={transformedSpot?.nextTransitRouteDetail ?? null}
                carRouteLeg={transformedSpot?.nextCarRouteLeg ?? null}
                onToggle={() => {
                  handleToggle(place.contentId);
                  onRouteSpotChange?.(index);
                }}
                order={index + 1}
                mode={mode}
                isFirstIndex={index === 0}
                onChangePlace={() => {
                  handleChangePlace(place.contentId);
                  setShowLocation(true);
                }}
                onVerificationPlace={() => {
                  setSelectedItem(place);
                  bottomSheetRef.current?.present();
                }}
              />
            );
          })}
          {showLocation && (
            <BottomSheet
              visible={showLocation}
              onClose={() => setShowLocation(false)}
            >
              {changeTargetId && (
                <TripPlacesSection
                  onSelectPlace={handleSelectPlace}
                  contentId={changeTargetId}
                />
              )}
              <View className="pt-5" />
            </BottomSheet>
          )}
          <VerificationBottomSheet
            ref={bottomSheetRef}
            selectedItem={
              {
                ...selectedItem,
                latitude: selectedItem?.mapY,
                longitude: selectedItem?.mapX,
                day: dayPlan?.day,
                courseId,
              } as GpsVerificationItem
            }
            onClose={() => bottomSheetRef?.current?.close()}
          />
        </View>
      )}
    </View>
  );
}

export default memo(TimelineDaySection);
