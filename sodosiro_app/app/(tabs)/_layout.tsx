import AnimatedTabLabel from '@/components/AnimatedTabLabel';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: 'Pretendard',
          fontSize: 11,
          fontWeight: '700',
        },
        tabBarActiveTintColor: '#1A1A1A',
        tabBarInactiveTintColor: '#CCCCCC',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => <AnimatedTabLabel focused={focused} title="홈"/>,
          tabBarIcon: ({ }) => {},
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: ({ focused }) => <AnimatedTabLabel focused={focused} title="탐색"/>,
          tabBarIcon: ({ }) => {},
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          tabBarLabel: ({ focused }) => <AnimatedTabLabel focused={focused} title="내 여행"/>,
          tabBarIcon: ({ }) => {},
        }}
      />
      <Tabs.Screen
        name="bingo"
        options={{
          tabBarLabel: ({ focused }) => <AnimatedTabLabel focused={focused} title="빙고"/>,
          tabBarIcon: ({ }) => {},
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          tabBarLabel: ({ focused }) => <AnimatedTabLabel focused={focused} title="마이"/>,
          tabBarIcon: ({ }) => {},
        }}
      />
    </Tabs>
  );
}
