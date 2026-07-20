import { Pressable, Text, View } from 'react-native';

type Props = {
  icon: React.ComponentType<{ color?: string }>;
  title: string;
  description: string;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export default function TransportCard({ icon: Icon, title, description, selected = false, disabled = false, onPress }: Props) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      className={`
        flex-1
        items-center
        justify-center
        rounded-2xl
        border-2
        py-4
        px-4
        gap-1
        bg-white
        ${selected ? 'border-[#1A1A1A]' : 'border-border'}
        ${disabled ? 'opacity-40' : ''}
      `}
    >
      <Icon color="#1A1A1A" />

      <Text className="text-base font-semibold text-[#1A1A1A]">{title}</Text>

      <Text className="text-xs text-[#1A1A1A] text-center">{description}</Text>
    </Pressable>
  );
}
