import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BusIcon, CarIcon } from '@/assets/svgs';
import TransportCard from '@/components/trip/TransportCard';
import DatePickerButton from '@/components/trip/DatePickerButton';
import Subtitle from '@/components/common/Subtitle';
import Header from '@/components/common/Header';

type TransportType = 'car' | 'bus';
type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export default function TripScreen() {
  const [transport, setTransport] = useState<TransportType>('car');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(2026, 9, 5),
    endDate: new Date(2026, 9, 8),
  });

  const transportList = [
    {
      key: 'car',
      icon: CarIcon,
      title: '자동차',
      description: '차량 이동 중심',
    },
    {
      key: 'bus',
      icon: BusIcon,
      title: '대중교통',
      description: '버스 · 도보 중심',
    },
  ] as const;

  return (
    <SafeAreaView className="flex-1">
      <Header title="여행 조건 설정" />
      <View className="px-5 pt-3 gap-8">
        <View className="gap-3">
          <Subtitle title="여행 일정" />
          <DatePickerButton
            dateRange={dateRange}
            onPress={() => {
              console.log('달력 열기');
            }}
          />
        </View>
        <View className="gap-3">
          <Subtitle title="이동 수단 선택" />
          <View className="flex-row gap-3">
            {transportList.map((item) => (
              <TransportCard key={item.key} icon={item.icon} title={item.title} description={item.description} selected={transport === item.key} onPress={() => setTransport(item.key)} />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
