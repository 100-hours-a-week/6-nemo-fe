import { versionHistory } from "@/shared/constants";
import { BackButton } from "@/shared/ui";

export default function VersionHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 flex h-14 items-center border-b border-gray-200 bg-white px-4">
        <BackButton href="/my-profile" />
        <h1 className="text-headline-1 flex-1 pr-9 text-center font-semibold">
          서비스 버전 히스토리
        </h1>
      </header>

      <div className="space-y-4 p-4">
        {versionHistory.map((version) => (
          <div
            key={version.version}
            className="rounded-lg bg-white p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-heading-2 text-primary font-bold">
                v{version.version}
              </h2>
              <span className="text-caption-1 text-label-normal">
                {version.date}
              </span>
            </div>
            <div className="space-y-2">
              {version.changes.map((change, index) => (
                <div key={index} className="text-body-2 flex items-start gap-2">
                  <span
                    className={`text-caption-1 flex-shrink-0 rounded px-2 py-0.5 font-medium ${
                      change.type === "추가"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {change.type}
                  </span>
                  <span className="text-label-normal">{change.content}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 하단 여백 */}
      <div className="h-20" />
    </div>
  );
}
