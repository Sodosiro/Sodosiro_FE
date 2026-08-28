export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 text-gray-900">
      <h1 className="mb-8 text-3xl font-bold">개인정보 처리방침</h1>

      <p className="mb-8 leading-7">
        소도시로(이하 "회사" 또는 "서비스")는 이용자의 개인정보를 중요하게
        생각하며, 「개인정보 보호법」 및 관련 법령을 준수하고 있습니다.
      </p>

      <p className="mb-10 leading-7">
        본 개인정보 처리방침은 소도시로 앱(이하 "앱")에서 이용자의 개인정보를
        어떻게 수집·이용·보관·삭제하는지 안내하기 위해 작성되었습니다.
      </p>

      {/* 1. 개인정보의 수집 및 이용 목적 */}
      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">
          1. 개인정보의 수집 및 이용 목적
        </h2>

        <p className="mb-4 leading-7">
          소도시로는 다음의 목적을 위해 개인정보를 수집 및 이용합니다.
        </p>

        <h3 className="mb-3 text-lg font-semibold">1) 회원 관리 및 로그인</h3>
        <ul className="mb-6 list-disc space-y-2 pl-6 leading-7">
          <li>카카오 로그인을 통한 회원 식별 및 인증</li>
          <li>회원가입 및 회원 관리</li>
          <li>서비스 이용에 따른 회원 식별</li>
          <li>부정 이용 방지 및 서비스 안정성 확보</li>
        </ul>

        <h3 className="mb-3 text-lg font-semibold">2) 여행 서비스 제공</h3>
        <ul className="mb-6 list-disc space-y-2 pl-6 leading-7">
          <li>여행지 탐색 및 추천</li>
          <li>주변 여행지 탐색</li>
          <li>여행 일정 및 여행 코스 제공</li>
          <li>AI 기반 여행 코스 추천</li>
          <li>지역 축제 및 행사 정보 제공</li>
        </ul>

        <h3 className="mb-3 text-lg font-semibold">3) 위치 기반 서비스 제공</h3>
        <ul className="mb-6 list-disc space-y-2 pl-6 leading-7">
          <li>현재 위치를 기반으로 주변 여행지 탐색</li>
          <li>여행지 방문 여부 확인</li>
          <li>여행지 방문 인증</li>
          <li>여행 중 특정 여행지 도착 여부 확인</li>
          <li>여행지 도착에 따른 알림 제공</li>
        </ul>

        <h3 className="mb-3 text-lg font-semibold">4) 피드 서비스 제공</h3>
        <ul className="mb-6 list-disc space-y-2 pl-6 leading-7">
          <li>이용자가 작성한 피드 등록 및 관리</li>
          <li>피드에 첨부한 이미지 저장 및 제공</li>
          <li>피드 조회 및 서비스 운영</li>
        </ul>

        <h3 className="mb-3 text-lg font-semibold">5) 알림 서비스 제공</h3>
        <ul className="list-disc space-y-2 pl-6 leading-7">
          <li>여행지 도착 알림</li>
          <li>서비스 이용에 필요한 안내 및 알림 제공</li>
        </ul>
      </section>

      {/* 2. 수집하는 개인정보 및 수집 방법 */}
      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">
          2. 수집하는 개인정보 및 수집 방법
        </h2>

        <p className="mb-5 leading-7">
          소도시로는 서비스 제공을 위해 다음과 같은 정보를 수집할 수 있습니다.
        </p>

        <h3 className="mb-3 text-lg font-semibold">1) 카카오 로그인 이용 시</h3>
        <ul className="mb-3 list-disc space-y-2 pl-6 leading-7">
          <li>카카오 계정 식별에 필요한 정보</li>
          <li>카카오에서 제공하는 이용자 식별 정보</li>
          <li>서비스 이용에 필요한 카카오 계정 정보</li>
        </ul>

        <h3 className="mb-3 text-lg font-semibold">2) 위치 정보</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6 leading-7">
          <li>현재 위치의 위도 및 경도</li>
          <li>위치 정보 수집 시점</li>
        </ul>

        <p className="mb-4 leading-7">
          위치 정보는 주변 여행지 탐색, 여행지 방문 인증 및 여행지 도착 여부
          확인 등의 목적으로 이용됩니다.
        </p>

        <p className="mb-6 leading-7">
          앱에서 위치 기반 여행 기능을 이용하는 경우, 앱이 백그라운드 상태에서도
          위치 정보가 사용될 수 있습니다. 백그라운드 위치 정보는 여행지 도착
          여부 확인 및 방문 인증과 같은 위치 기반 기능 제공을 위해 사용됩니다.
        </p>

        <h3 className="mb-3 text-lg font-semibold">
          3) 이용자가 직접 제공하는 정보
        </h3>
        <ul className="mb-6 list-disc space-y-2 pl-6 leading-7">
          <li>피드 작성 내용</li>
          <li>피드에 첨부한 이미지</li>
          <li>여행 일정 및 여행 코스와 관련된 정보</li>
        </ul>

        <h3 className="mb-3 text-lg font-semibold">
          4) 서비스 이용 과정에서 자동으로 생성되는 정보
        </h3>
        <p className="leading-7">
          서비스 이용 과정에서 접속 기록, 서비스 이용 기록, 오류 기록 및 기기
          관련 정보가 생성·수집될 수 있습니다.
        </p>
      </section>

      {/* 3. 개인정보의 보유 및 이용 기간 */}
      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">
          3. 개인정보의 보유 및 이용 기간
        </h2>

        <p className="mb-4 leading-7">
          소도시로는 개인정보를 수집 및 이용 목적이 달성될 때까지
          보유·이용합니다.
        </p>

        <p className="leading-7">
          이용자가 회원 탈퇴를 요청하거나 개인정보의 보유 기간이 종료된 경우
          관련 개인정보를 지체 없이 삭제합니다.
        </p>

        <p className="mt-4 leading-7">
          다만 관계 법령에 따라 일정 기간 보관이 필요한 정보는 해당 법령에서
          정한 기간 동안 보관할 수 있습니다.
        </p>
      </section>

      {/* 4. 개인정보의 제3자 제공 */}
      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">4. 개인정보의 제3자 제공</h2>

        <p className="mb-4 leading-7">
          소도시로는 이용자의 개인정보를 원칙적으로 이용자의 동의 없이 제3자에게
          제공하지 않습니다.
        </p>

        <p className="mb-3 leading-7">다만 다음의 경우에는 예외로 합니다.</p>

        <ul className="list-disc space-y-2 pl-6 leading-7">
          <li>이용자가 사전에 동의한 경우</li>
          <li>법령에 따라 제공이 요구되는 경우</li>
          <li>수사기관 등 관계 기관의 적법한 요청이 있는 경우</li>
        </ul>
      </section>

      {/* 5. 개인정보 처리의 위탁 및 외부 서비스 */}
      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">
          5. 개인정보 처리의 위탁 및 외부 서비스
        </h2>

        <p className="mb-6 leading-7">
          서비스의 원활한 운영을 위해 개인정보 처리를 외부 서비스 제공업체에
          위탁하거나 외부 서비스를 이용할 수 있습니다.
        </p>

        <h3 className="mb-3 text-lg font-semibold">카카오</h3>
        <ul className="mb-6 list-disc space-y-2 pl-6 leading-7">
          <li>이용 목적: 카카오 로그인 및 회원 인증</li>
          <li>처리 정보: 카카오 로그인 과정에서 제공되는 이용자 정보</li>
        </ul>

        <h3 className="mb-3 text-lg font-semibold">Firebase / Google</h3>
        <ul className="mb-4 list-disc space-y-2 pl-6 leading-7">
          <li>이용 목적: 푸시 알림 등 서비스 제공</li>
          <li>처리 정보: 서비스 제공에 필요한 기기 및 알림 관련 정보</li>
        </ul>
      </section>

      {/* 6. 위치 정보의 이용 */}
      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">6. 위치 정보의 이용</h2>

        <p className="mb-4 leading-7">
          소도시로는 이용자의 위치 정보를 다음과 같은 목적으로 이용합니다.
        </p>

        <ul className="mb-6 list-disc space-y-2 pl-6 leading-7">
          <li>현재 위치 기반 주변 여행지 탐색</li>
          <li>여행지 방문 인증</li>
          <li>여행지 도착 여부 확인</li>
          <li>여행지 도착 알림</li>
        </ul>

        <p className="mb-4 leading-7">
          여행 중 위치 기반 기능을 이용하는 경우 앱이 백그라운드 상태에서도 위치
          정보가 처리될 수 있습니다.
        </p>

        <p className="mb-4 leading-7">
          백그라운드 위치 정보는 여행지 도착 여부를 확인하고 방문 인증 및 알림
          기능을 제공하기 위한 목적으로만 이용합니다.
        </p>

        <p className="leading-7">
          이용자는 기기의 설정을 통해 위치 정보 접근 권한을 변경할 수 있습니다.
        </p>
      </section>

      {/* 7. 개인정보의 안전성 확보 조치 */}
      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">
          7. 개인정보의 안전성 확보 조치
        </h2>

        <p className="mb-4 leading-7">
          소도시로는 이용자의 개인정보를 안전하게 보호하기 위해 다음과 같은
          조치를 취하고 있습니다.
        </p>

        <ul className="list-disc space-y-2 pl-6 leading-7">
          <li>개인정보에 대한 접근 권한 최소화</li>
          <li>개인정보 접근 권한 관리</li>
          <li>개인정보의 안전한 전송을 위한 보안 통신 적용</li>
          <li>개인정보 처리 시스템에 대한 접근 통제</li>
          <li>개인정보 보호를 위한 기술적·관리적 조치</li>
        </ul>
      </section>

      {/* 8. 이용자의 권리 및 행사 방법 */}
      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">
          8. 이용자의 권리 및 행사 방법
        </h2>

        <p className="mb-4 leading-7">
          이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제 및 회원
          탈퇴를 요청할 수 있습니다.
        </p>

        <p className="mb-4 leading-7">
          회원 탈퇴 및 개인정보 삭제는 앱에서 제공하는 회원 탈퇴 기능을 통해
          요청할 수 있으며, 앱에서 처리가 어려운 경우 아래 문의처를 통해 요청할
          수 있습니다.
        </p>

        <p className="leading-7">
          문의 이메일:
          <a href="mailto:[개인정보 보호 문의 이메일]" className="underline">
            [sodosiro0921@gmail.com]
          </a>
        </p>

        <p className="mt-4 leading-7">
          이용자의 개인정보 삭제 요청이 접수되면 관련 법령에서 정한 보존 의무가
          있는 정보를 제외하고 지체 없이 삭제합니다.
        </p>
      </section>

      {/* 9. 개인정보의 삭제 */}
      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">9. 개인정보의 삭제</h2>

        <p className="mb-4 leading-7">
          이용자가 회원 탈퇴를 요청하거나 개인정보의 보유 및 이용 목적이 달성된
          경우 해당 개인정보를 지체 없이 삭제합니다.
        </p>

        <p className="leading-7">
          전자적 파일 형태로 저장된 개인정보는 복구하거나 재생할 수 없도록
          삭제하며, 별도의 보관이 필요한 경우 관련 법령에서 정한 기간 동안
          안전하게 보관한 후 삭제합니다.
        </p>
      </section>

      {/* 10. 개인정보 보호책임자 및 문의처 */}
      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">
          10. 개인정보 보호책임자 및 문의처
        </h2>

        <p className="mb-4 leading-7">
          개인정보 처리와 관련한 문의, 불만 처리 및 피해 구제 등을 위해 아래의
          연락처로 문의할 수 있습니다.
        </p>

        <ul className="space-y-2 leading-7">
          <li>서비스명: 소도시로</li>
          <li>이메일: [sodosiro0921@gmail.com]</li>
        </ul>
      </section>

      {/* 11. 개인정보 처리방침의 변경 */}
      <section className="mb-10">
        <h2 className="mb-5 text-2xl font-bold">
          11. 개인정보 처리방침의 변경
        </h2>

        <p className="mb-4 leading-7">
          본 개인정보 처리방침은 법령, 서비스 변경 및 개인정보 처리 방식의 변경
          등에 따라 수정될 수 있습니다.
        </p>

        <p className="leading-7">
          개인정보 처리방침이 변경되는 경우 변경 사항을 앱 또는 서비스 내에서
          안내합니다.
        </p>
      </section>

      {/* 시행일자 */}
      <section className="border-t pt-8">
        <h2 className="mb-3 text-xl font-bold">시행일자</h2>
        <p className="leading-7">
          본 개인정보 처리방침은 <strong>[2026년 8월 31일]</strong>부터
          시행합니다.
        </p>
      </section>
    </main>
  );
}
