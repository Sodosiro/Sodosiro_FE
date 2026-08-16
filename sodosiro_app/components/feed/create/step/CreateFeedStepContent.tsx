import TripHistoryPlaceItem from "@/components/feed/create/TripHistoryPlaceItem";
import * as ImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction, useRef } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import CreateFeedPhotoSection from "./CreateFeedPhotoSection";
import CreateFeedTextSection from "./CreateFeedTextSection";

export default function CreateFeedStepContent({
  selectedPlace,
  text,
  setText,
  images,
  setImages,
  isPicking,
  setIsPicking,
}: {
  selectedPlace: TripHistoryPlaceType | null;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  images: ImagePicker.ImagePickerAsset[];
  setImages: Dispatch<SetStateAction<ImagePicker.ImagePickerAsset[]>>;
  isPicking: boolean;
  setIsPicking: Dispatch<SetStateAction<boolean>>;
}) {
  const scrollViewRef = useRef<ScrollView>(null);

  if (!selectedPlace) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        ref={scrollViewRef}
        className="px-5 py-3"
        contentContainerClassName="gap-8 pb-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TripHistoryPlaceItem place={selectedPlace} />

        <CreateFeedPhotoSection
          images={images}
          setImages={setImages}
          isPicking={isPicking}
          setIsPicking={setIsPicking}
        />

        <CreateFeedTextSection text={text} setText={setText} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
