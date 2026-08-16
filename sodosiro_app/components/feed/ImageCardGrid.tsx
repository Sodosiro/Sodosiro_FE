import { RemoveIcon } from "@/assets/svgs";
import { ImagePickerAsset } from "expo-image-picker";
import { Image, Pressable, View } from "react-native";

export default function ImageCardGrid({
  images,
  canRemove = false,
  onRemove,
  onPhotoPress,
}: {
  images: (ImagePickerAsset | { imageUrl: string })[];
  canRemove?: boolean;
  onRemove?: (index: number) => void;
  onPhotoPress?: (imageUrl: string) => void;
}) {
  const imageUrls = images.map((image) =>
    "uri" in image ? image.uri : image.imageUrl,
  );

  if (imageUrls.length === 0) {
    return null;
  }

  const renderImage = (imageUrl: string, index: number, className: string) => (
    <Pressable
      key={imageUrl}
      className={className}
      onPress={onPhotoPress ? () => onPhotoPress(imageUrl) : undefined}
    >
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-full rounded-xl"
        resizeMode="cover"
      />

      {canRemove && (
        <Pressable
          onPress={() => onRemove?.(index)}
          hitSlop={8}
          className="absolute top-3 right-3 size-6 rounded-full bg-black/50 items-center justify-center"
        >
          <RemoveIcon color="white" width={24} hitSlop={32} />
        </Pressable>
      )}
    </Pressable>
  );

  if (imageUrls.length === 1) {
    return (
      <View className="w-full aspect-square">
        {renderImage(imageUrls[0], 0, "w-full h-full")}
      </View>
    );
  }

  if (imageUrls.length === 2) {
    return (
      <View className="w-full aspect-square flex-row gap-1">
        {imageUrls.map((imageUrl, index) =>
          renderImage(imageUrl, index, "h-full flex-1"),
        )}
      </View>
    );
  }

  if (imageUrls.length === 3) {
    return (
      <View className="w-full aspect-square flex-row gap-1">
        {renderImage(imageUrls[0], 0, "h-full flex-1")}

        <View className="flex-1 gap-1">
          {imageUrls
            .slice(1)
            .map((imageUrl, index) =>
              renderImage(imageUrl, index + 1, "h-full flex-1"),
            )}
        </View>
      </View>
    );
  }

  if (imageUrls.length === 4) {
    return (
      <View className="w-full aspect-square gap-1">
        <View className="flex-1 flex-row gap-1">
          {imageUrls
            .slice(0, 2)
            .map((imageUrl, index) =>
              renderImage(imageUrl, index, "h-full flex-1"),
            )}
        </View>

        <View className="flex-1 flex-row gap-1">
          {imageUrls
            .slice(2, 4)
            .map((imageUrl, index) =>
              renderImage(imageUrl, index + 2, "h-full flex-1"),
            )}
        </View>
      </View>
    );
  }

  return (
    <View className="w-full aspect-square gap-1">
      {/* 위 2개 */}
      <View className="flex-1 flex-row gap-1">
        {imageUrls
          .slice(0, 2)
          .map((imageUrl, index) =>
            renderImage(imageUrl, index, "h-full flex-1"),
          )}
      </View>

      {/* 아래 3개 */}
      <View className="flex-1 flex-row gap-1">
        {imageUrls
          .slice(2, 5)
          .map((imageUrl, index) =>
            renderImage(imageUrl, index + 2, "h-full flex-1"),
          )}
      </View>
    </View>
  );
}
