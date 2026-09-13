import CustomText from "@/components/common/CustomText";
import Header from "@/components/common/Header";
import { ScrollView, View } from "react-native";

export default function PolicyScreen() {
  // 2. 회원가입 및 로그인 테이블 데이터
  const signUpTableData = [
    {
      category: "개인정보\n항목",
      content:
        "필수: 카카오 회원번호, 카카오 닉네임, 내부 회원번호, 가입·수정·탈퇴 요청 일시, 로그인 토큰\n선택: 카카오계정 이메일",
    },
    {
      category: "처리 목적\n및 근거",
      content: "회원 식별, 로그인 및 계정 관리, 이용자의 동의 또는 서비스 계약의 이행",
    },
    { category: "수집 방법", content: "카카오 로그인 연동" },
  ];

  // 2. 프로필 테이블 데이터
  const profileTableData = [
    { category: "개인정보\n항목", content: "닉네임, 한 줄 소개, 프로필 이미지" },
    {
      category: "처리 목적\n및 근거",
      content: "프로필 제공 및 커뮤니티 표시 이용자의 입력 및 서비스 계약의 이행",
    },
    { category: "수집 방법", content: "이용자가 직접 입력·업로드" },
  ];

  // 3. 처리 및 보유 기간 테이블 데이터
  const retentionTableData = [
    {
      category: "회원 및\n소셜 로그인\n정보",
      content:
        "회원 탈퇴 요청 후 7일의 철회 가능 기간까지 보관한 뒤 삭제. 다만, 부정 재가입 방지 또는 법적 의무가 있는 경우 해당 목적에 필요한 최소 정보만 별도 보관",
    },
    {
      category: "프로필, 찜, 여행 코스, 리뷰, 피드 및 관련 이미지",
      content:
        "회원 탈퇴 요청 후 7일 이내 삭제. 이용자가 개별 콘텐츠를 삭제한 경우에는 지체 없이 삭제하되 백업에서의 삭제는 운영 주기에 따라 이루어질 수 있음",
    },
    {
      category: "푸시 알림용 기기·토큰 정보",
      content: "로그아웃, 토큰 무효화 또는 회원 탈퇴 시까지",
    },
    {
      category: "접속·오류·보안 로그",
      content: "컨테이너 재생성, 시스템 관리상 삭제 또는 서비스 종료 시까지 보관",
    },
  ];

  // 5. 개인정보 처리업무의 위탁 데이터
  const consignmentData = [
    {
      trustee: "수탁자: Amazon Web Services, Inc. (AWS 아시아 태평양(서울) 리전, ap-northeast-2)",
      rows: [
        {
          category: "위탁 업무",
          content: "서버·데이터베이스 운영, 파일 및 이미지 저장·전송",
        },
        {
          category: "처리 정보",
          content: "회원·이용기록·게시물·이미지 등 서비스 운영 정보",
        },
      ],
    },
    {
      trustee: "수탁자: Google LLC Firebase Cloud Messaging",
      rows: [
        { category: "위탁 업무", content: "모바일 푸시 알림 전송" },
        { category: "처리 정보", content: "FCM 토큰, 기기 정보, 알림 내용" },
      ],
    },
    {
      trustee: "수탁자: 주식회사 카카오",
      rows: [
        {
          category: "위탁 업무",
          content: "카카오 로그인 인증, 지도·장소·경로 관련 API 제공",
        },
        {
          category: "처리 정보",
          content: "인증 토큰 및 서비스 요청에 필요한 장소·경로 정보",
        },
      ],
    },
    {
      trustee: "수탁자: OpenAI, L.L.C.",
      rows: [
        {
          category: "위탁 업무",
          content: "AI 여행 코스 생성 및 입력 문구의 임베딩 처리",
        },
        {
          category: "처리 정보",
          content:
            "AI 요청 문구와 코스 생성을 위한 후보 장소 정보. 이용자 실명·이메일은 전송하지 않음",
        },
      ],
    },
  ];

  // 6. 개인정보의 국외 이전 데이터
  const transferData = [
    {
      recipient: "이전받는 자: Google LLC",
      rows: [
        {
          category: "국가·연락처",
          content: "미국 등 글로벌 데이터센터\nPrivacy@Google.com",
        },
        {
          category: "이전 항목·목적",
          content: "FCM 토큰, 기기 정보, 알림 내용\n푸시 알림 전송",
        },
        {
          category: "시점·방법",
          content: "알림 발송 시 암호화 통신망으로 전송",
        },
        {
          category: "보유 기간 및 거부 영향",
          content: "서비스 제공 또는 계약상 처리 기간까지.\n거부 시 푸시 알림 이용 불가",
        },
      ],
    },
    {
      recipient: "이전받는 자: OpenAI, L.L.C.",
      rows: [
        {
          category: "국가·연락처",
          content: "미국\nPrivacy@Openai.Com",
        },
        {
          category: "이전 항목·목적",
          content: "AI 요청 문구, 후보 장소 정보\nAI 코스 생성·임베딩",
        },
        {
          category: "시점·방법",
          content: "AI 추천 요청 시 암호화 통신망으로 전송",
        },
        {
          category: "보유 기간 및 거부 영향",
          content:
            "OpenAI API 요청에 포함된 AI 요청 문구 및 후보 장소 정보는 악용 방지 목적의 로그에 최대 30일간 보관될 수 있습니다. 이용자는 AI 추천 기능을 이용하지 않을 수 있으며, 이 경우 AI 추천 기능이 제한됩니다.",
        },
      ],
    },
  ];

  return (
    <>
      <Header title="개인정보처리방침" />
      <ScrollView className={`px-5 py-3`}>
        <View className={`gap-5 py-3`}>
          <CustomText
            font="body3 review"
            className="text-text-muted"
          >
            소도시로(이하 “서비스”)는 이용자의 개인정보를 중요하게 생각하며 관련 법령에 따라
            개인정보를 안전하게 처리하기 위해 다음과 같이 개인정보처리방침을 안내합니다.
          </CustomText>

          {/* 1. 개인정보의 처리 목적 */}
          <View className={`gap-3`}>
            <CustomText font="body1">1. 개인정보의 처리 목적</CustomText>
            <CustomText
              font="body3 review"
              className="text-text-muted"
            >
              운영자는 다음 목적에 필요한 최소한의 개인정보를 처리합니다. 목적이 변경되는 경우 관계
              법령에 따라 별도 동의를 받는 등 필요한 조치를 합니다.
            </CustomText>
            <View className="gap-1">
              <CustomText
                font="body3 review"
                className="text-text-muted"
              >
                · 카카오 로그인을 통한 회원 식별, 가입 및 계정 관리
              </CustomText>
              <CustomText
                font="body3 review"
                className="text-text-muted"
              >
                · 프로필, 여행 코스 추천·저장, 찜, 리뷰 및 피드 기능 제공
              </CustomText>
              <CustomText
                font="body3 review"
                className="text-text-muted"
              >
                · 단말기 내 GPS를 활용한 방문 인증 기능 제공
              </CustomText>
              <CustomText
                font="body3 review"
                className="text-text-muted"
              >
                · 푸시 알림 발송과 알림 수신 설정 관리
              </CustomText>
              <CustomText
                font="body3 review"
                className="text-text-muted"
              >
                · 문의 처리, 부정 이용 방지, 서비스 안정성 및 보안 유지
              </CustomText>
            </View>
          </View>

          {/* 2. 처리하는 개인정보의 항목과 수집 방법 */}
          <View className={`gap-3`}>
            <CustomText font="body1">2. 처리하는 개인정보의 항목과 수집 방법</CustomText>

            {/* 회원가입 및 로그인 서브 섹션 */}
            <View className="gap-2">
              <CustomText font="body2">회원가입 및 로그인</CustomText>
              <View className="border border-border rounded-sm overflow-hidden">
                {signUpTableData.map((item, index) => (
                  <View
                    key={index}
                    className={`flex-row ${
                      index !== signUpTableData.length - 1 ? "border-b border-border" : ""
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

            {/* 프로필 서브 섹션 */}
            <View className="gap-2 mt-2">
              <CustomText font="body2">프로필</CustomText>
              <View className="border border-border rounded-sm overflow-hidden">
                {profileTableData.map((item, index) => (
                  <View
                    key={index}
                    className={`flex-row ${
                      index !== profileTableData.length - 1 ? "border-b border-border" : ""
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

          {/* 3. 개인정보의 처리 및 보유 기간 */}
          <View className={`gap-3`}>
            <CustomText font="body1">3. 개인정보의 처리 및 보유 기간</CustomText>
            <View className="border border-border rounded-sm overflow-hidden">
              {/* 테이블 헤더 */}
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
                    보유 기간
                  </CustomText>
                </View>
              </View>

              {/* 테이블 바디 */}
              {retentionTableData.map((item, index) => (
                <View
                  key={index}
                  className={`flex-row ${
                    index !== retentionTableData.length - 1 ? "border-b border-border" : ""
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

          {/* 4. 개인정보의 제3자 제공 */}
          <View className={`gap-3`}>
            <CustomText font="body1">4. 개인정보의 제3자 제공</CustomText>
            <CustomText
              font="body3 review"
              className="text-text-muted"
            >
              운영자는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 이용자가
              사전에 동의한 경우 또는 법률에 특별한 규정이 있는 경우에만 필요한 범위에서 제공합니다.
            </CustomText>
            <CustomText
              font="body3 review"
              className="text-text-muted"
            >
              닉네임, 프로필 이미지, 리뷰·피드와 첨부 이미지는 서비스의 공개 화면에 표시될 수
              있습니다. 이는 이용자가 공개 게시 기능을 선택한 범위에서 이루어지며, 이용자는 게시물을
              수정하거나 삭제할 수 있습니다.
            </CustomText>
          </View>

          {/* 5. 개인정보 처리업무의 위탁 */}
          <View className={`gap-3`}>
            <CustomText font="body1">5. 개인정보 처리업무의 위탁</CustomText>
            <CustomText
              font="body3 review"
              className="text-text-muted"
            >
              운영자는 서비스 제공을 위해 다음과 같이 개인정보 처리업무를 위탁할 수 있습니다.
            </CustomText>

            {consignmentData.map((item, cIndex) => (
              <View
                key={cIndex}
                className="gap-2 mt-1"
              >
                <CustomText font="body2">{item.trustee}</CustomText>
                <View className="border border-border rounded-sm overflow-hidden">
                  {item.rows.map((row, rIndex) => (
                    <View
                      key={rIndex}
                      className={`flex-row ${
                        rIndex !== item.rows.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <View className="w-1/4 p-3 border-r border-border items-center justify-center">
                        <CustomText
                          font="body3 review"
                          className="text-text-muted text-center"
                        >
                          {row.category}
                        </CustomText>
                      </View>
                      <View className="w-3/4 p-3 items-center justify-center">
                        <CustomText
                          font="body3 review"
                          className="text-text-muted text-center"
                        >
                          {row.content}
                        </CustomText>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* 6. 개인정보의 국외 이전 */}
          <View className={`gap-3 pb-3`}>
            <CustomText font="body1">6. 개인정보의 국외 이전</CustomText>

            {transferData.map((item, tIndex) => (
              <View
                key={tIndex}
                className="gap-2"
              >
                <CustomText font="body2">{item.recipient}</CustomText>
                <View className="border border-border rounded-sm overflow-hidden">
                  {item.rows.map((row, rIndex) => (
                    <View
                      key={rIndex}
                      className={`flex-row ${
                        rIndex !== item.rows.length - 1 ? "border-b border-border" : ""
                      }`}
                    >
                      <View className="w-1/4 p-3 border-r border-border items-center justify-center">
                        <CustomText
                          font="body3 review"
                          className="text-text-muted text-center"
                        >
                          {row.category}
                        </CustomText>
                      </View>
                      <View className="w-3/4 p-3 items-center justify-center">
                        <CustomText
                          font="body3 review"
                          className="text-text-muted text-center"
                        >
                          {row.content}
                        </CustomText>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            <CustomText
              font="body3 review"
              className="text-text-muted mt-2"
            >
              운영자는 서버, 데이터베이스 및 파일 저장을 위해 AWS 아시아 태평양(서울)
              리전(ap-northeast-2)을 사용합니다. 해당 인프라는 대한민국에 위치하므로, 이 처리 목적의
              개인정보는 AWS를 통해 국외로 이전되지 않습니다.
            </CustomText>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
