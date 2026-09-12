import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import { ScrollView, View } from "react-native";

export default function TermsScreen() {
  const tableData = [
    { category: "서비스명", content: "소도시로" },
    { category: "운영형태", content: "개인 운영 비상업적 공모전·시범 서비스" },
    { category: "운영자", content: "랜더스" },
    { category: "이메일", content: "문의 이메일" },
    { category: "전화번호", content: "번호" },
    { category: "주소", content: "주소" },
  ];

  return (
    <>
      <Header title="서비스 이용 약관" />
      <ScrollView className={`px-5 py-3`}>
        <View className={`gap-5 py-3`}>
          <CustomText
            font="body3 review"
            className="text-text-muted"
          >
            이 약관은 개인 운영자가 제공하는 소도시로 서비스의 이용 조건과 운영자 및 이용자의
            권리·의무를 정합니다. 서비스는 공모전 출품과 비상업적 시범 운영을 목적으로 제공되며,
            유료 결제 기능은 제공하지 않습니다.
          </CustomText>
          <View className={`gap-3`}>
            <CustomText font="body1">제1조 목적</CustomText>
            <CustomText
              font="body3 review"
              className="text-text-muted"
            >
              이 약관은 소도시로 운영자(이하 ‘운영자’)가 모바일 앱과 관련 웹 화면을 통해 제공하는
              서비스의 이용과 관련하여 운영자와 이용자 사이의 권리, 의무 및 책임사항을 정하는 것을
              목적으로 합니다.
            </CustomText>
          </View>
          <View className={`gap-3`}>
            <CustomText font="body1">제2조 용어의 정의</CustomText>
            <View>
              <CustomText
                font="body3 review"
                className="text-text-muted"
              >
                1. ‘서비스’란 지역·관광지 정보, 지도, 여행 코스 추천·저장, 단말기 내 GPS 방문 인증,
                리뷰·피드 및 그 밖의 관련 기능을 말합니다.
              </CustomText>
              <CustomText
                font="body3 review"
                className="text-text-muted"
              >
                2. ‘이용자’란 이 약관에 따라 서비스를 이용하는 사람을 말합니다.
              </CustomText>
              <CustomText
                font="body3 review"
                className="text-text-muted"
              >
                3. ‘회원’이란 카카오 로그인을 통해 서비스 이용계정을 만든 이용자를 말합니다.
              </CustomText>
              <CustomText
                font="body3 review"
                className="text-text-muted"
              >
                4. ‘게시물’이란 회원이 서비스에 작성하거나 업로드한 리뷰, 피드, 글, 사진, 별점 및
                프로필 정보를 말합니다.
              </CustomText>
            </View>
          </View>
          <View className={`gap-3`}>
            <CustomText font="body1">제3조 운영자 정보</CustomText>
            <View className="border border-border rounded-sm overflow-hidden">
              <View className="flex-row border-b border-border">
                <View className="w-1/4 p-3 border-r border-border items-center justify-center">
                  <CustomText
                    font="body3"
                    className="text-text-primary"
                  >
                    구분
                  </CustomText>
                </View>
                <View className="w-3/4 p-3 items-center justify-center">
                  <CustomText
                    font="body3"
                    className="text-text-primary"
                  >
                    내용
                  </CustomText>
                </View>
              </View>

              {tableData.map((item, index) => (
                <View
                  key={index}
                  className={`flex-row ${
                    index !== tableData.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <View className="w-1/4 p-3 border-r border-border items-center justify-center">
                    <CustomText
                      font="body3 review"
                      className="text-text-muted text-center"
                    >
                      {item.category}
                    </CustomText>
                  </View>
                  <View className="w-3/4 p-3 items-center justify-center">
                    <CustomText
                      font="body3 review"
                      className="text-text-muted text-center"
                    >
                      {item.content}
                    </CustomText>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
