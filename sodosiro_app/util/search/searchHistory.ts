import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "SEARCH_HISTORY";

export async function getSearchHistory() {
  const data = await AsyncStorage.getItem(KEY);

  return data ? JSON.parse(data) : [];
}

export async function addSearchHistory(keyword: string) {
  const history = await getSearchHistory();

  const next = [
    keyword,
    ...history.filter((item: string) => item !== keyword),
  ].slice(0, 10); // 최근 10개만 저장

  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export async function removeSearchHistory(keyword: string) {
  const history = await getSearchHistory();

  const next = history.filter((item: string) => item !== keyword);

  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

export async function clearSearchHistory() {
  await AsyncStorage.removeItem(KEY);
}
