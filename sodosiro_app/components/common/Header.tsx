import { LeftIcon, PencilIcon, XIcon } from "@/assets/svgs";
import { Heading1Class } from "@/styles/Typography";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Modal, Pressable, TextInput, View } from "react-native";
import CustomText from "./CustomText";

type Props = {
  title: string;
  showBackButton?: boolean;
  showPencil?: boolean;
  rightComponent?: React.ReactNode;
  onTitleChange?: (title: string) => void;
};

const HEADER_HEIGHT = 64; // h-14

export default function Header({
  title,
  showBackButton = true,
  rightComponent,
  showPencil = false,
  onTitleChange,
}: Props) {
  const navigation = useNavigation();

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const inputRef = useRef<TextInput>(null);

  // title prop이 외부에서 바뀌면 draft도 동기화
  useEffect(() => {
    setDraftTitle(title);
  }, [title]);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const startEditing = () => {
    setDraftTitle(title);
    setIsEditing(true);
    // Modal 마운트 직후 포커스
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
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
    <View className="h-16 flex-row items-center px-5 bg-white">
      {showBackButton ? (
        <Pressable onPress={handleBack} hitSlop={12} className="mr-2">
          <LeftIcon color="#1A1A1A" />
        </Pressable>
      ) : null}

      <CustomText
        font="heading1"
        className={`${Heading1Class} ${!showPencil && `flex-1`}`}
      >
        {title}
      </CustomText>
      {showPencil ? (
        <Pressable onPress={startEditing} hitSlop={12} className="ml-1">
          <PencilIcon color="#1A1A1A" />
        </Pressable>
      ) : null}

      {rightComponent ?? <View className="w-6" />}

      {/* 편집 모드: 헤더는 그대로 보이고 나머지 화면은 dimm 처리 */}
      <Modal
        visible={isEditing}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={cancelEdit}
      >
        <View className="flex-1">
          {/* 헤더 자리 (dimm 되지 않음, 흰 배경) */}
          <View
            style={{ height: HEADER_HEIGHT }}
            className="flex-row items-center px-5 bg-white"
          >
            {showBackButton ? (
              <View className="mr-2 opacity-40">
                <LeftIcon color="#1A1A1A" />
              </View>
            ) : (
              <View className="w-6 mr-4" />
            )}

            <TextInput
              ref={inputRef}
              value={draftTitle}
              onChangeText={setDraftTitle}
              onSubmitEditing={commitEdit}
              returnKeyType="done"
              selectTextOnFocus
              maxLength={30}
              className="flex-1 p-0"
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#1A1A1A",
              }}
            />

            <Pressable onPress={cancelEdit} hitSlop={12} className="ml-2">
              <XIcon color="#1A1A1A" />
            </Pressable>
          </View>

          {/* dimm 오버레이: 탭하면 확정 후 종료 */}
          <Pressable className="flex-1 bg-black/50" onPress={commitEdit} />
        </View>
      </Modal>
    </View>
  );
}
