"use client";

import { useChatbot } from "@/entities/chatbot/api/use-chatobt";
import { GroupCard } from "@/entities/group";
import {
  location_icon,
  party,
  reload,
  send,
  sparkle,
  users_icon,
} from "@/shared/assets/images";
import { cn } from "lib/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const ChatbotPage = () => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    session,
    isLoading,
    sendAnswer,
    startNewChat,
    initializeChatbot,
    isHydrated,
  } = useChatbot();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session.messages]);

  useEffect(() => {
    if (isHydrated) {
      initializeChatbot();
    }
  }, [isHydrated]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || isLoading) return;
    sendAnswer(inputValue);
    setInputValue("");
  };

  const handleOptionClick = (option: string) => {
    if (isLoading) return;
    sendAnswer(option);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isHydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-58px-64px)] flex-col bg-gray-50">
      {/* Header */}
      <div className="p-ctn-md flex items-center gap-3 border-b border-gray-200 bg-white">
        <div className="from-primary to-primary-heavy flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r">
          <Image src={sparkle} width={24} height={24} alt="ai icon" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-label-assistive text-lg font-semibold">
              탱글이
            </h1>
            <div className="bg-primary h-2 w-2 animate-pulse rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500">네모 AI</p>
        </div>
        <button
          onClick={startNewChat}
          className="flex h-8 w-8 items-center justify-center rounded-full transition hover:scale-110 hover:animate-spin"
          title="새로운 대화"
        >
          <Image src={reload} width={20} height={20} alt="reload icon" />
        </button>
      </div>

      {/* Messages */}
      <div className="p-ctn-lg flex-1 space-y-4 overflow-y-auto">
        {session.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] ${message.role === "user" ? "order-2" : "order-1"}`}
            >
              {message.role === "ai" && (
                <div className="mb-1 flex items-center gap-2">
                  <div className="from-primary to-primary-heavy flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r">
                    <Image src={sparkle} width={14} height={14} alt="ai icon" />
                  </div>
                  <span className="text-sm text-gray-500">탱글이</span>
                </div>
              )}

              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-primary text-white"
                    : "border border-gray-200 bg-white text-gray-800"
                }`}
              >
                <div className="text-label-1 leading-relaxed whitespace-pre-line">
                  {message.text}
                </div>
              </div>

              {/* 선택지 버튼들 */}
              {message.role === "ai" &&
                message.options &&
                message.options.length > 0 &&
                !session.isRecommendationComplete && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {message.options.map((option, index) => {
                      const colors = [
                        "bg-blue-50 text-blue-300 hover:border-blue-400",
                        "bg-green-50 text-green-300 hover:border-green-400",
                        "bg-purple-50 text-purple-300 hover:border-purple-400",
                        "bg-orange-50 text-orange-300 hover:border-orange-400",
                      ];
                      const colorClass = colors[index % 4];

                      return (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          disabled={isLoading}
                          className={`rounded-xl border border-gray-200 p-3 text-center opacity-90 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${colorClass}`}
                        >
                          <div className="text-sm font-medium">{option}</div>
                        </button>
                      );
                    })}
                  </div>
                )}
            </div>
          </div>
        ))}

        {/* 추천 모임 카드 */}
        {session.recommendedGroup && (
          <div className="flex justify-start">
            <div className="w-full max-w-[90%]">
              <div className="mb-2 flex items-center gap-2">
                <div className="from-primary to-primary-heavy flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r">
                  <Image src={sparkle} width={16} height={16} alt="ai icon" />
                </div>
                <span className="text-sm text-gray-500">탱글이</span>
              </div>

              <div className="mb-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <Image src={party} alt="party icon" width={32} height={32} />
                  <h3 className="text-headline-1 text-primary font-bold">
                    추천 모임을 찾았어요!
                  </h3>
                </div>
              </div>

              <div className="mb-3 space-y-2 rounded-2xl border border-gray-200 bg-white px-4 py-4">
                {/* 메인 헤드라인 */}

                <h3 className="text-body-2 text-label-normal font-bold">
                  * 추천 모임 *
                </h3>

                <div className="text-heading-2 text-label-assistive font-bold">
                  {session.recommendedGroup.name}
                </div>

                {/* 모임 정보 */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Image
                      src={location_icon}
                      alt="location icon"
                      width={16}
                      height={16}
                    />
                    <span className="text-body-2 text-label-normal font-medium">
                      위치:
                    </span>{" "}
                    {session.recommendedGroup.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Image
                      src={users_icon}
                      alt="users icon"
                      width={16}
                      height={16}
                    />
                    <span className="text-body-2 text-label-normal font-medium">
                      인원:
                    </span>{" "}
                    {session.recommendedGroup.currentUserCount}/
                    {session.recommendedGroup.maxUserCount}명
                  </div>
                </div>

                {/* 모임 요약 */}
                {session.recommendedGroup.summary && (
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <div className="text-body-2 leading-relaxed text-gray-600">
                      {session.recommendedGroup.summary}
                    </div>
                  </div>
                )}
              </div>
              <GroupCard
                group={{
                  groupId: session.recommendedGroup.groupId,
                  name: session.recommendedGroup.name,
                  category: session.recommendedGroup.category,
                  summary: session.recommendedGroup.summary,
                  location: session.recommendedGroup.location,
                  currentUserCount: session.recommendedGroup.currentUserCount,
                  maxUserCount: session.recommendedGroup.maxUserCount,
                  imageUrl: session.recommendedGroup.imageUrl,
                  tags: session.recommendedGroup.tags,
                }}
                className="shadow-sm transition-shadow hover:shadow-md"
              />

              {/* 추천 이유 메시지 */}
              {session.recommendationReason && (
                <div className="mt-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
                  <div className="mb-1 text-sm font-medium text-gray-700">
                    💡 추천 이유
                  </div>
                  <div className="text-label-1 leading-relaxed text-gray-600">
                    {session.recommendationReason}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 로딩 인디케이터 */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%]">
              <div className="mb-1 flex items-center gap-2">
                <div className="from-primary to-primary-heavy flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r">
                  <Image src={sparkle} width={16} height={16} alt="ai icon" />
                </div>
                <span className="text-sm text-gray-500">탱글이</span>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="flex space-x-1">
                    <div className="bg-primary h-1.5 w-1.5 animate-bounce rounded-full"></div>
                    <div
                      className="bg-primary h-1.5 w-1.5 animate-bounce rounded-full"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="bg-primary h-1.5 w-1.5 animate-bounce rounded-full"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-label-1 ml-2 text-gray-500">
                    답변을 준비하고 있어요...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {!session.isRecommendationComplete && (
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="직접 답변을 입력하거나 위의 선택지를 눌러주세요..."
                disabled={isLoading}
                className="focus:ring-primary w-full rounded-full border-0 bg-gray-100 px-4 py-3 text-sm transition-all focus:bg-white focus:ring-2 focus:outline-none disabled:opacity-50"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={cn(
                "relative flex h-10 w-10 items-center justify-center rounded-full transition-all",
                inputValue.trim() && !isLoading
                  ? "bg-primary hover:bg-primary-strong"
                  : "cursor-not-allowed bg-green-200"
              )}
              title="답변 전송"
            >
              <Image
                src={send}
                alt="send icon"
                width={18}
                height={18}
                className="absolute top-3 left-2.5"
              />
            </button>
          </div>

          <div className="mt-3 text-center">
            <p className="text-xs text-gray-400">
              AI가 추천하는 정보는 실제 모임이며, 사용자의 답변을 기반으로
              추천합니다.
            </p>
          </div>
        </div>
      )}

      {/* 추천 완료 후 새로운 대화 버튼 */}
      {session.isRecommendationComplete && (
        <div className="border-t border-gray-200 bg-white p-4">
          <button
            onClick={startNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-400 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-500"
          >
            <Image src={reload} width={20} height={20} alt="reload icon" />
            새로운 추천 받기
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatbotPage;
