import { BackButton } from "@/shared/ui";

export default function TermsPage() {
  return (
    <div className="p-ctn-lg relative min-h-screen pb-24">
      <header className="relative flex h-14 items-center justify-center border-gray-200 px-4">
        <BackButton className="absolute left-0" />
        <h1 className="text-headline-1 font-semibold">이용약관</h1>
      </header>
      <main className="mt-2 space-y-8">
        {/* 서문 */}
        <section>
          <p className="text-body-2 text-label-normal leading-relaxed">
            본 약관은 &ldquo;네모를 찾아라&rdquo;가 운영하는 &lsquo;네모&rsquo;
            서비스를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을
            규정합니다.
          </p>
        </section>

        {/* 제1장 총칙 */}
        <section>
          <h2 className="text-title-3 text-label-strong-1 border-primary mb-6 border-l-4 pl-3 font-bold">
            제1장 총칙
          </h2>

          {/* 제1조 목적 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제1조 (목적)
            </h3>
            <p className="text-body-2 text-label-normal leading-relaxed">
              본 약관은 (주)팀 네모(이하 &ldquo;회사&rdquo;라 합니다)이 운영하는
              &lsquo;네모&rsquo; (이하 &ldquo;웹사이트&rdquo;라 합니다)에서
              제공하는 온라인 서비스(이하 &ldquo;서비스&rdquo;라 한다)를
              이용함에 있어 사이버몰과 이용자의 권리, 의무 및 책임사항을
              규정함을 목적으로 합니다.
            </p>
          </div>

          {/* 제2조 용어의 정의 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제2조 (용어의 정의)
            </h3>
            <p className="text-body-2 text-label-normal mb-3 leading-relaxed">
              본 약관에서 사용하는 용어는 다음과 같이 정의한다.
            </p>
            <div className="text-body-2 text-label-normal ml-4 space-y-3 leading-relaxed">
              <div>
                <span className="font-semibold">&ldquo;웹사이트&rdquo;</span>란
                회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등
                정보통신설비를 이용하여 재화 또는 용역을 거래 할 수 있도록
                설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는
                사업자의 의미로도 사용합니다.
              </div>
              <div>
                <span className="font-semibold">&ldquo;이용자&rdquo;</span>란
                &ldquo;웹사이트&rdquo;에 접속하여 서비스를 이용하는 회원 및
                비회원을 말합니다.
              </div>
              <div>
                <span className="font-semibold">&ldquo;회원&rdquo;</span>이라
                함은 &ldquo;웹사이트&rdquo;에 개인정보를 제공하여 회원등록을 한
                자로서, &ldquo;웹사이트&rdquo;의 정보를 지속적으로 제공받으며,
                &ldquo;웹사이트&rdquo;이 제공하는 서비스를 계속적으로 이용할 수
                있는 자를 말합니다.
              </div>
              <div>
                <span className="font-semibold">&ldquo;비회원&rdquo;</span>이라
                함은 회원에 가입하지 않고, &ldquo;웹사이트&rdquo;이 제공하는
                서비스를 이용하는 자를 말합니다.
              </div>
              <div>
                <span className="font-semibold">&ldquo;ID&rdquo;</span>라 함은
                이용자가 회원가입당시 등록한 사용자 &ldquo;개인이용문자&rdquo;를
                말합니다.
              </div>
              <div>
                <span className="font-semibold">&ldquo;멤버십&rdquo;</span>이라
                함은 회원등록을 한 자로서, 별도의 온/오프라인 상에서 추가
                서비스를 제공 받을 수 있는 회원을 말합니다.
              </div>
            </div>
          </div>

          {/* 제3조 약관의 공시 및 효력과 변경 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제3조 (약관의 공시 및 효력과 변경)
            </h3>
            <div className="text-body-2 text-label-normal space-y-2 leading-relaxed">
              <p>
                본 약관은 회원가입 화면에 게시하여 공시하며 회사는 사정변경 및
                영업상 중요한 사유가 있을 경우 약관을 변경할 수 있으며 변경된
                약관은 공지사항을 통해 공시한다.
              </p>
              <p>
                본 약관 및 차후 회사사정에 따라 변경된 약관은 이용자에게
                공시함으로써 효력을 발생한다.
              </p>
            </div>
          </div>

          {/* 제4조 약관 외 준칙 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제4조 (약관 외 준칙)
            </h3>
            <p className="text-body-2 text-label-normal leading-relaxed">
              본 약관에 명시되지 않은 사항이 전기통신기본법, 전기통신사업법,
              정보통신촉진법, &lsquo;전자상거래등에서의 소비자 보호에 관한
              법률&rsquo;, &lsquo;약관의 규제에관한법률&rsquo;,
              &lsquo;전자거래기본법&rsquo;, &lsquo;전자서명법&rsquo;,
              &lsquo;정보통신망 이용촉진등에 관한 법률&rsquo;,
              &lsquo;소비자보호법&rsquo; 등 기타 관계 법령에 규정되어 있을
              경우에는 그 규정을 따르도록 한다.
            </p>
          </div>
        </section>

        {/* 제2장 이용계약 */}
        <section>
          <h2 className="text-title-3 text-label-strong-1 border-primary mb-6 border-l-4 pl-3 font-bold">
            제2장 이용계약
          </h2>

          {/* 제5조 이용신청 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제5조 (이용신청)
            </h3>
            <div className="text-body-2 text-label-normal space-y-2 leading-relaxed">
              <p>
                이용신청자가 회원가입 안내에서 본 약관과 개인정보보호정책에
                동의하고 등록절차(회사의 소정 양식의 가입 신청서 작성)를 거쳐
                &lsquo;확인&rsquo; 버튼을 누르면 이용신청을 할 수 있다.
              </p>
              <p>
                이용신청자는 반드시 실명과 실제 정보를 사용해야 하며 1개의
                생년월일에 대하여 1건의 이용신청을 할 수 있다.
              </p>
              <p>
                실명이나 실제 정보를 입력하지 않은 이용자는 법적인 보호를 받을
                수 없으며, 서비스 이용에 제한을 받을 수 있다.
              </p>
            </div>
          </div>

          {/* 제6조 이용신청의 승낙 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제6조 (이용신청의 승낙)
            </h3>
            <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
              <p>
                회사는 제5조에 따른 이용신청자에 대하여 제2항 및 제3항의 경우를
                예외로 하여 서비스 이용을 승낙한다.
              </p>
              <div>
                <p className="mb-2">
                  회사는 아래 사항에 해당하는 경우에 그 제한사유가 해소될 때까지
                  승낙을 유보할 수 있다.
                </p>
                <div className="text-label-assistive ml-4 space-y-1">
                  <p>가. 서비스 관련 설비에 여유가 없는 경우</p>
                  <p>나. 기술상 지장이 있는 경우</p>
                  <p>다. 기타 회사 사정상 필요하다고 인정되는 경우</p>
                </div>
              </div>
              <div>
                <p className="mb-2">
                  회사는 아래 사항에 해당하는 경우에 승낙을 하지 않을 수 있다.
                </p>
                <div className="text-label-assistive ml-4 space-y-1">
                  <p>가. 다른 사람의 명의를 사용하여 신청한 경우</p>
                  <p>나. 이용자 정보를 허위로 기재하여 신청한 경우</p>
                  <p>
                    다. 사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한
                    경우
                  </p>
                  <p>라. 기타 회사가 정한 이용신청 요건이 미비한 경우</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 제3장 계약 당사자의 의무 */}
        <section>
          <h2 className="text-title-3 text-label-strong-1 border-primary mb-6 border-l-4 pl-3 font-bold">
            제3장 계약 당사자의 의무
          </h2>

          {/* 제7조 회사의 의무 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제7조 (회사의 의무)
            </h3>
            <div className="text-body-2 text-label-normal space-y-2 leading-relaxed">
              <p>회사는 사이트를 안정적이고 지속적으로 운영할 의무가 있다.</p>
              <p>
                회사는 이용자로부터 제기되는 의견이나 불만이 정당하다고 인정될
                경우에는 즉시 처리해야 한다. 단, 즉시 처리가 곤란한 경우에는
                이용자에게 그 사유와 처리일정을 공지사항 또는 전자우편을 통해
                통보해야 한다.
              </p>
              <p>
                제1항의 경우 수사상의 목적으로 관계기관 및 정보통신윤리위원회의
                요청이 있거나 영장 제시가 있는 경우, 기타 관계 법령에 의한
                경우는 예외로 한다.
              </p>
            </div>
          </div>

          {/* 제8조 이용자의 의무 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제8조 (이용자의 의무)
            </h3>
            <div className="text-body-2 text-label-normal space-y-2 leading-relaxed">
              <p>
                이용자는 본 약관 및 회사의 공지사항, 사이트 이용안내 등을
                숙지하고 준수해야 하며 기타 회사의 업무에 방해되는 행위를 해서는
                안된다.
              </p>
              <p>
                이용자는 회사의 사전 승인 없이 본 사이트를 이용해 어떠한
                영리행위도 할 수 없다.
              </p>
              <p>
                이용자는 본 사이트를 통해 얻는 정보를 회사의 사전 승낙 없이
                복사, 복제, 변경, 번역, 출판, 방송 및 기타의 방법으로 사용하거나
                이를 타인에게 제공할 수 없다.
              </p>
            </div>
          </div>
        </section>

        {/* 제4장 서비스의 제공 및 이용 */}
        <section>
          <h2 className="text-title-3 text-label-strong-1 border-primary mb-6 border-l-4 pl-3 font-bold">
            제4장 서비스의 제공 및 이용
          </h2>

          {/* 제9조 서비스 이용 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제9조 (서비스 이용)
            </h3>
            <div className="text-body-2 text-label-normal space-y-2 leading-relaxed">
              <p>이용자는 본 약관의 규정된 사항을 준수해 사이트를 이용한다.</p>
              <p>
                본 약관에 명시되지 않은 서비스 이용에 관한 사항은 회사가 정해
                &lsquo;공지사항&rsquo;에 게시하거나 또는 별도로 공지하는 내용에
                따른다.
              </p>
            </div>
          </div>

          {/* 제10조 정보의 제공 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제10조 (정보의 제공)
            </h3>
            <p className="text-body-2 text-label-normal leading-relaxed">
              회사는 회원이 서비스 이용 중 필요하다고 인정되는 다양한 정보에
              대하여 전자메일이나 서신우편 등의 방법으로 회원에게 정보를 제공할
              수 있다.
            </p>
          </div>

          {/* 제11조 광고게재 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제11조 (광고게재)
            </h3>
            <div className="text-body-2 text-label-normal space-y-2 leading-relaxed">
              <p>
                회사는 서비스의 운용과 관련하여 서비스 화면, 홈페이지, 전자우편
                등에 광고 등을 게재할 수 있다.
              </p>
              <p>
                회사는 사이트에 게재되어 있는 광고주의 판촉활동에 회원이
                참여하거나 교신 또는 거래의 결과로서 발생하는 모든 손실 또는
                손해에 대해 책임을 지지 않는다.
              </p>
            </div>
          </div>

          {/* 제12조 서비스 이용의 제한 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제12조 (서비스 이용의 제한)
            </h3>
            <div className="text-body-2 text-label-normal space-y-3 leading-relaxed">
              <p>
                본 사이트 이용 및 행위가 다음 각 항에 해당하는 경우 회사는 해당
                이용자의 이용을 제한할 수 있다.
              </p>
              <div className="text-label-assistive ml-4 space-y-1">
                <p>• 공공질서 및 미풍양속, 기타 사회질서를 해하는 경우</p>
                <p>
                  • 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된다고
                  객관적으로 인정되는 경우
                </p>
                <p>
                  • 타인의 명예를 손상시키거나 타인의 서비스 이용을 현저히
                  저해하는 경우
                </p>
                <p>
                  • 타인의 의사에 반하는 내용이나 광고성 정보 등을 지속적으로
                  전송하는 경우
                </p>
                <p>
                  • 해킹 및 컴퓨터 바이러스 유포 등으로 서비스의 건전한 운영을
                  저해하는 경우
                </p>
                <p>
                  • 다른 이용자 또는 제3자의 지적재산권을 침해하거나
                  지적재산권자가 지적 재산권의 침해를 주장할 수 있다고 판단되는
                  경우
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 네모 서비스 특화 추가 조항 */}
        <section>
          <h2 className="text-title-3 text-label-strong-1 border-primary mb-6 border-l-4 pl-3 font-bold">
            제5장 모임 서비스 특별 조항
          </h2>

          {/* 제13조 모임 서비스 이용 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제13조 (모임 서비스 이용)
            </h3>
            <div className="text-body-2 text-label-normal space-y-2 leading-relaxed">
              <p>
                이용자는 네모 플랫폼을 통해 다양한 모임을 생성하거나 참여할 수
                있습니다.
              </p>
              <p>
                모임 생성 시 제공하는 정보는 사실에 기반해야 하며, 허위 정보로
                인한 피해에 대해서는 모임 생성자가 책임을 집니다.
              </p>
              <p>
                모임 참여자는 해당 모임의 규칙과 일정을 준수해야 하며, 무단 불참
                시 다른 참여자에게 피해를 주지 않도록 사전에 알려야 합니다.
              </p>
            </div>
          </div>

          {/* 제14조 AI 챗봇 서비스 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제14조 (AI 챗봇 서비스)
            </h3>
            <div className="text-body-2 text-label-normal space-y-2 leading-relaxed">
              <p>
                회사는 이용자의 모임 매칭을 위해 AI 챗봇 &lsquo;탱글이&rsquo;
                서비스를 제공합니다.
              </p>
              <p>
                AI 챗봇이 제공하는 추천은 이용자가 제공한 정보를 바탕으로 한
                참고사항이며, 최종 선택과 책임은 이용자에게 있습니다.
              </p>
              <p>
                이용자는 AI 챗봇과의 대화에서 정확하고 적절한 정보를 제공해야
                하며, 부적절한 내용을 입력해서는 안됩니다.
              </p>
            </div>
          </div>

          {/* 제15조 개인정보 보호 */}
          <div className="mb-6">
            <h3 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
              제15조 (개인정보 보호)
            </h3>
            <div className="text-body-2 text-label-normal space-y-2 leading-relaxed">
              <p>
                회사는 이용자의 개인정보를 보호하기 위해 개인정보보호법 및 관련
                법령을 준수합니다.
              </p>
              <p>
                개인정보의 수집, 이용, 제공에 관한 세부사항은 별도의 개인정보
                처리방침에 따릅니다.
              </p>
              <p>
                이용자는 언제든지 본인의 개인정보 처리에 대해 열람, 정정, 삭제를
                요구할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* 부칙 */}
        <section className="rounded-lg bg-gray-50 p-6">
          <h2 className="text-heading-2 text-label-strong-1 mb-4 font-semibold">
            부칙
          </h2>
          <div className="text-body-2 text-label-normal space-y-2">
            <p>본 약관은 2025년 01월 01일부터 적용합니다.</p>
            <p>
              개정된 약관이 있을 경우, 회사는 시행일 7일 전부터 서비스 내
              공지사항을 통해 이용자에게 알립니다.
            </p>
          </div>
        </section>

        {/* 하단 안내 */}
        <section className="bg-primary-light rounded-lg p-6">
          <div className="space-y-2 text-center">
            <p className="text-body-2 text-primary-strong font-semibold">
              이용약관 문의
            </p>
            <p className="text-label-2 text-label-normal">
              이용약관과 관련한 문의사항이 있으시면
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
