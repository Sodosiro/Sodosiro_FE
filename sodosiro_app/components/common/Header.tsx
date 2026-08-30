import { LeftIcon, PencilIcon, XIcon } from "@/assets/svgs";
import { Heading1Class } from "@/styles/Typography";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Modal, Pressable, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomText from "./CustomText";

type Props = {
  title: string;
  showBackButton?: boolean;
  showPencil?: boolean;
  rightComponent?: React.ReactNode;
  onTitleChange?: (title: string) => void;
  isBgWhite?: boolean;
  handleBack?: () => void;
};

const HEADER_HEIGHT = 64; // h-14

export default function Header({
  title,
  showBackButton = true,
  rightComponent,
  showPencil = false,
  onTitleChange,
  isBgWhite = true,
  handleBack,
}: Props) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    setDraftTitle(title);
  }, [title]);

  const defaultHandleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const startEditing = () => {
    setDraftTitle(title);
    setIsEditing(true);
  };

  const handleModalShow = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const commitEdit = () => {
    const trimmed = draftTitle.trim();
    const nextTitle = trimmed.length > 0 ? trimmed : title;
    setDraftTitle(nextTitle);
    onTitleChange?.(nextTitle);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setDraftTitle(title);
    setIsEditing(false);
  };

  return (
    <View
      className={`h-16 flex-row items-center px-5 ${isBgWhite && `bg-white`}`}
    >
      {showBackButton ? (
        <Pressable
          onPress={handleBack ?? defaultHandleBack}
          hitSlop={12}
          className="mr-2"
        >
          <LeftIcon color="#1A1A1A" />
        </Pressable>
      ) : null}

      <CustomText
        font="heading1"
        className={`${Heading1Class} ${!showPencil && `flex-1`}`}
        numberOfLines={1}
      >
        {title}
      </CustomText>
      {showPencil ? (
        <Pressable onPress={startEditing} hitSlop={12} className="ml-1">
          <PencilIcon color="#1A1A1A" width={16} />
        </Pressable>
      ) : null}

      {rightComponent ?? <View className="w-6" />}

      <Modal
        visible={isEditing}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={cancelEdit}
        onShow={handleModalShow}
      >
        <View className="flex-1" style={{ backgroundColor: "transparent" }}>
          {/* 상태바 영역 */}
          <View style={{ height: insets.top - 4 }} className="bg-white" />

          {/* 헤더 자리 */}
          <View
            style={{ height: HEADER_HEIGHT }}
            className="flex-row items-center px-5 bg-white"
          >
            {showBackButton ? (
              <View className="mr-2 opacity-50">
                <LeftIcon color="#1A1A1A" />
              </View>
            ) : (
              <View className="w-6 mr-4" />
            )}

            <TextInput
              ref={inputRef}
              autoFocus
              value={draftTitle}
              onChangeText={setDraftTitle}
              onSubmitEditing={commitEdit}
              returnKeyType="done"
              maxLength={14}
              className="flex-1 p-0"
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: "#1A1A1A",
              }}
            />

            <Pressable
              onPress={() => setDraftTitle("")}
              hitSlop={12}
              className="ml-2"
            >
              <XIcon color="#1A1A1A" />
            </Pressable>
          </View>

          {/* dimm 오버레이 */}
          <Pressable
            style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onPress={commitEdit}
          />
        </View>
      </Modal>
    </View>
  );
}
