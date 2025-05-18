// 단계별 계획 문자열 파싱 함수
const parsePlan = (planStr: string) => {
  try {
    // Step1 | 설명 형식으로 파싱
    const steps = planStr.split(/Step\s*\d+\s*[:|]/i);

    // 첫 번째 요소가 빈 문자열일 경우 제거
    if (steps[0].trim() === "") {
      steps.shift();
    }

    return steps.map((step, index) => ({
      id: index + 1,
      description: step.trim(),
    }));
  } catch (e) {
    console.error("계획 파싱 오류:", e);
    return [{ id: 1, description: planStr }];
  }
};

export const GroupPlan = ({ plan }: { plan: string }) => {
  const steps = parsePlan(plan);

  return (
    <div className="bg-common-100 rounded-md p-4 shadow-xs">
      {steps.map((step) => (
        <div key={step.id} className="mb-4 last:mb-0">
          <h4 className="text-body-1 text-label-assistive bg-primary-light rounded-ctn-sm mb-2 inline-block px-2 py-1 font-medium">
            Step{step.id}
          </h4>
          <div className="text-body-2 text-label-assistive pl-4 whitespace-pre-line">
            {step.description}
          </div>
        </div>
      ))}
    </div>
  );
};
