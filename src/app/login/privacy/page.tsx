import { BackButton } from "@/shared/ui";

export default function PrivacyPage() {
  return (
    <div className="p-ctn-lg relative min-h-screen pb-24">
      <header className="relative flex h-14 items-center justify-center border-gray-200 px-4">
        <BackButton className="absolute left-0" />
        <h1 className="text-headline-1 font-semibold">개인정보 처리방침</h1>
      </header>
      <main className="mt-2 space-y-8">
        {/* 서문 */}
        <section>
          <p className="text-body-2 text-label-normal leading-relaxed">
            팀 네모(또는 &ldquo;네모를 찾아라&rdquo;)는 개인정보보호법 제30조에
            따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고
            원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보
            처리방침을 수립&middot;공개합니다.
          </p>
        </section>

        {/* 제1조 개인정보의 처리목적 */}
        <section>
          <h2 className="text-heading-2 text-label-strong-1 border-primary mb-4 border-l-4 pl-3 font-semibold">
            제1조 개인정보의 처리목적
          </h2>
          <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
            <p>
              네모는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
              개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용목적이
              변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는
              등 필요한 조치를 이행할 예정입니다.
            </p>

            <div className="ml-4 space-y-2">
              <p>
                <strong>1. 회원가입 및 관리</strong>
              </p>
              <p className="text-label-assistive ml-4">
                회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증,
                회원자격 유지·관리, 서비스 부정이용 방지 목적으로 개인정보를
                처리합니다.
              </p>

              <p>
                <strong>2. 재화 또는 서비스 제공</strong>
              </p>
              <p className="text-label-assistive ml-4">
                모임 매칭 서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증을
                목적으로 개인정보를 처리합니다.
              </p>

              <p>
                <strong>3. 마케팅 및 광고에의 활용</strong>
              </p>
              <p className="text-label-assistive ml-4">
                신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성
                정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공
                및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의
                서비스 이용에 대한 통계를 목적으로 개인정보를 처리합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 제2조 개인정보의 처리 및 보유기간 */}
        <section>
          <h2 className="text-heading-2 text-label-strong-1 border-primary mb-4 border-l-4 pl-3 font-semibold">
            제2조 개인정보의 처리 및 보유기간
          </h2>
          <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
            <p>
              ① 네모는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
              개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서
              개인정보를 처리·보유합니다.
            </p>

            <p>② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</p>

            <div className="ml-4 space-y-2">
              <p>
                <strong>1. 회원가입 및 관리</strong>
              </p>
              <p className="text-label-assistive ml-4">
                - 보존항목: 이름, 이메일, 프로필 사진, 가입일시
                <br />
                - 보존근거: 회원제 서비스 이용에 따른 본인확인, 개인식별
                <br />- 보존기간: 회원탈퇴 시까지
              </p>

              <p>
                <strong>2. 모임 서비스 제공</strong>
              </p>
              <p className="text-label-assistive ml-4">
                - 보존항목: 모임 참여 기록, 일정 참여 기록, 서비스 이용 기록
                <br />
                - 보존근거: 서비스 제공, 분쟁 해결
                <br />- 보존기간: 서비스 이용 종료 후 3년
              </p>
            </div>
          </div>
        </section>

        {/* 제3조 개인정보의 제3자 제공 */}
        <section>
          <h2 className="text-heading-2 text-label-strong-1 border-primary mb-4 border-l-4 pl-3 font-semibold">
            제3조 개인정보의 제3자 제공
          </h2>
          <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
            <p>
              ① 네모는 개인정보를 제1조(개인정보의 처리목적)에서 명시한 범위
              내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등
              개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를
              제3자에게 제공합니다.
            </p>

            <p>② 네모는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.</p>

            <div className="ml-4 space-y-2">
              <p>
                <strong>카카오</strong>
              </p>
              <p className="text-label-assistive ml-4">
                - 개인정보를 제공받는 자: 카카오
                <br />
                - 제공받는 자의 개인정보 이용목적: 소셜 로그인 서비스 제공
                <br />
                - 제공하는 개인정보 항목: 카카오 계정 정보(이메일, 닉네임,
                프로필 사진)
                <br />- 제공받는 자의 보유·이용기간: 회원탈퇴 시 또는 제공 동의
                철회 시까지
              </p>
            </div>
          </div>
        </section>

        {/* 제4조 개인정보처리 위탁 */}
        <section>
          <h2 className="text-heading-2 text-label-strong-1 border-primary mb-4 border-l-4 pl-3 font-semibold">
            제4조 개인정보처리 위탁
          </h2>
          <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
            <p>
              ① 네모는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
              처리업무를 위탁하고 있습니다.
            </p>

            <div className="ml-4 space-y-2">
              <p>
                <strong>Amazon Web Services (AWS)</strong>
              </p>
              <p className="text-label-assistive ml-4">
                - 위탁받는 자(수탁자): Amazon Web Services
                <br />
                - 위탁하는 업무의 내용: 클라우드 서비스 운영, 데이터 저장 및
                관리
                <br />- 위탁기간: 서비스 제공 기간
              </p>
            </div>

            <p>
              ② 네모는 위탁계약 체결시 개인정보보호법 제26조에 따라 위탁업무
              수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁
              제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을
              계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
              처리하는지를 감독하고 있습니다.
            </p>
          </div>
        </section>

        {/* 제5조 정보주체의 권리·의무 및 행사방법 */}
        <section>
          <h2 className="text-heading-2 text-label-strong-1 border-primary mb-4 border-l-4 pl-3 font-semibold">
            제5조 정보주체의 권리·의무 및 행사방법
          </h2>
          <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
            <p>
              ① 정보주체는 네모에 대해 언제든지 다음 각 호의 개인정보 보호 관련
              권리를 행사할 수 있습니다.
            </p>

            <div className="ml-4 space-y-1">
              <p>1. 개인정보 열람요구</p>
              <p>2. 오류 등이 있을 경우 정정·삭제 요구</p>
              <p>3. 처리정지 요구</p>
            </div>

            <p>
              ② 제1항에 따른 권리 행사는 네모에 대해 개인정보보호법 시행령
              제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실
              수 있으며 네모는 이에 대해 지체없이 조치하겠습니다.
            </p>

            <p>
              ③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한
              경우에는 네모는 정정 또는 삭제를 완료할 때까지 당해 개인정보를
              이용하거나 제공하지 않습니다.
            </p>
          </div>
        </section>

        {/* 제6조 처리하는 개인정보의 항목 */}
        <section>
          <h2 className="text-heading-2 text-label-strong-1 border-primary mb-4 border-l-4 pl-3 font-semibold">
            제6조 처리하는 개인정보의 항목
          </h2>
          <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
            <p>네모는 다음의 개인정보 항목을 처리하고 있습니다.</p>

            <div className="ml-4 space-y-2">
              <p>
                <strong>회원가입 및 관리</strong>
              </p>
              <p className="text-label-assistive ml-4">
                - 필수항목: 이메일, 닉네임, 프로필 사진(선택), 서비스 이용 기록,
                접속 로그, 쿠키, 접속 IP 정보
              </p>
            </div>
          </div>
        </section>

        {/* 제7조 개인정보의 파기 */}
        <section>
          <h2 className="text-heading-2 text-label-strong-1 border-primary mb-4 border-l-4 pl-3 font-semibold">
            제7조 개인정보의 파기
          </h2>
          <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
            <p>
              ① 네모는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
              불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
            </p>

            <p>② 개인정보 파기의 절차, 기한 및 방법은 다음과 같습니다.</p>

            <div className="ml-4 space-y-2">
              <p>
                <strong>파기절차</strong>
              </p>
              <p className="text-label-assistive ml-4">
                네모는 파기 사유가 발생한 개인정보를 선정하고, 네모의 개인정보
                보호책임자의 승인을 받아 개인정보를 파기합니다.
              </p>

              <p>
                <strong>파기기한</strong>
              </p>
              <p className="text-label-assistive ml-4">
                개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터
                5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지,
                사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의
                처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그
                개인정보를 파기합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 제8조 개인정보의 안전성 확보 조치 */}
        <section>
          <h2 className="text-heading-2 text-label-strong-1 border-primary mb-4 border-l-4 pl-3 font-semibold">
            제8조 개인정보의 안전성 확보 조치
          </h2>
          <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
            <p>
              네모는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에
              필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
            </p>

            <div className="ml-4 space-y-2">
              <p>1. 정기적인 자체 감사 실시</p>
              <p>2. 개인정보 취급 직원의 최소화 및 교육</p>
              <p>3. 내부관리계획의 수립 및 시행</p>
              <p>4. 해킹 등에 대비한 기술적 대책</p>
              <p>5. 개인정보의 암호화</p>
              <p>6. 접속기록의 보관 및 위변조 방지</p>
              <p>7. 개인정보에 대한 접근 제한</p>
              <p>8. 개인정보를 보관하는 물리적 보관 장소에 대한 접근통제</p>
            </div>
          </div>
        </section>

        {/* 제9조 개인정보 보호책임자 */}
        <section>
          <h2 className="text-heading-2 text-label-strong-1 border-primary mb-4 border-l-4 pl-3 font-semibold">
            제9조 개인정보 보호책임자
          </h2>
          <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
            <p>
              ① 네모는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
              처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
              같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>

            <div className="ml-4 rounded-lg bg-gray-50 p-4">
              <p>
                <strong>▶ 개인정보 보호책임자</strong>
              </p>
              <p>성명: 개인정보보호담당자</p>
              <p>직책: 개발팀</p>
              <p>연락처: privacy@nemo.team</p>
            </div>

            <p>
              ② 정보주체께서는 네모의 서비스(또는 사업)를 이용하시면서 발생한
              모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을
              개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 네모는
              정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.
            </p>
          </div>
        </section>

        {/* 제10조 권익침해 구제방법 */}
        <section>
          <h2 className="text-heading-2 text-label-strong-1 border-primary mb-4 border-l-4 pl-3 font-semibold">
            제10조 권익침해 구제방법
          </h2>
          <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
            <p>
              정보주체는 아래의 기관에 대해 개인정보 침해신고를 할 수 있습니다.
              아래의 기관은 네모와는 별개의 기관으로서, 네모의 자체적인 개인정보
              불만처리, 피해구제 결과에 만족하지 못하시거나 보다 자세한 도움이
              필요하시면 문의하여 주시기 바랍니다.
            </p>

            <div className="ml-4 space-y-4">
              <div className="rounded-lg bg-gray-50 p-4">
                <p>
                  <strong>
                    ▶ 개인정보 침해신고센터 (개인정보보호위원회 운영)
                  </strong>
                </p>
                <p>- 소관업무: 개인정보 침해신고접수 및 조사처리</p>
                <p>- 홈페이지: privacy.go.kr</p>
                <p>- 전화: (국번없이) 182</p>
                <p>
                  - 주소: (01530) 서울특별시 종로구 세종대로 209 정부서울청사
                  4층
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p>
                  <strong>▶ 개인정보 분쟁조정위원회</strong>
                </p>
                <p>
                  - 소관업무: 개인정보 분쟁조정신청, 집단분쟁조정 (민사적 해결)
                </p>
                <p>- 홈페이지: www.kopico.go.kr</p>
                <p>- 전화: (국번없이) 1833-6972</p>
                <p>
                  - 주소: (03171) 서울특별시 종로구 세종대로 209 정부서울청사
                  4층
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p>
                  <strong>▶ 대검찰청 사이버범죄수사단</strong>
                </p>
                <p>- 홈페이지: www.spo.go.kr</p>
                <p>- 전화: 02-3480-3573</p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p>
                  <strong>▶ 경찰청 사이버테러대응센터</strong>
                </p>
                <p>- 홈페이지: www.netan.go.kr</p>
                <p>- 전화: (국번없이) 182</p>
              </div>
            </div>
          </div>
        </section>

        {/* 제11조 개인정보 처리방침 변경 */}
        <section>
          <h2 className="text-heading-2 text-label-strong-1 border-primary mb-4 border-l-4 pl-3 font-semibold">
            제11조 개인정보 처리방침 변경
          </h2>
          <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
            <p>① 이 개인정보처리방침은 2025년 1월 1일부터 적용됩니다.</p>
            <p>② 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.</p>
            <p className="text-label-assistive ml-4">
              - 2025. 01. 01 ~ 현재: 현재 공시중인 개인정보처리방침
            </p>
          </div>
        </section>

        {/* 하단 안내 */}
        <section className="bg-primary-light rounded-lg p-6">
          <div className="space-y-2 text-center">
            <p className="text-body-2 text-primary-strong font-semibold">
              개인정보 보호 문의
            </p>
            <p className="text-label-2 text-label-normal">
              개인정보 처리와 관련한 문의사항이 있으시면
            </p>
            <p className="text-label-2 text-label-normal">
              아래 연락처로 언제든지 문의해 주세요.
            </p>
            <p className="text-body-2 text-primary mt-3 font-medium">
              rlawlsdn9583@gmail.com
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
