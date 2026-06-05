"use client";

import { TourProvider } from "@reactour/tour";
import { StepType } from "@reactour/tour";
import Image from "next/image";

import ADDICON from "@/app/assets/images/ic-clip.png";

export const steps: StepType[] = [
  {
    selector: ".add-img",
    content: (
      <div className="tour-style">
        이미지를 드래그해서 첨부하거나, 첨부 아이콘 (
        <Image src={ADDICON} width={15} height={15} alt="첨부 아이콘" />
        )을 눌러서 파일을 선택할 수 있다.
      </div>
    ),
    position: "right",
  },
  {
    selector: ".tour-input",
    content: (
      <div className="tour-style">
        이미지와 함께 자유롭게 원하는 질문을 입력해서 사용할 수도 있다.
      </div>
    ),
    position: "right",
  },
  // {
  //   selector: ".tour-quesion",
  //   content: (
  //     <div className="tour-style">
  //       자주 하는 질문들을 모아 놓았습니다. 원하는 질문을 클릭해서 좀 더 쉽게
  //       질문할 수 있습니다.
  //     </div>
  //   ),
  //   position: "right",
  // },
  {
    selector: ".tour-results",
    content: (
      <div className="tour-style">코드가 생성되는 result-area입니다.</div>
    ),
    position: [250, 50],
  },
  {
    selector: ".tour-preview",
    content: (
      <div className="tour-style">
        생성된 코드의 미리보기가 보여지는 영역입니다.
      </div>
    ),
    position: "left",
  },
  {
    selector: ".tour-codebox",
    content: (
      <div className="tour-style">
        jsx, scss로 이루어진 코드를 확인, 복사할 수 있습니다.
      </div>
    ),
    position: "left",
  },
];

export default function ClientTourProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TourProvider
      steps={steps}
      onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        if (steps) {
          if (currentStep === steps.length - 1) {
            setIsOpen(false);
          }
          setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1));
        }
      }}
      scrollSmooth
    >
      {children}
    </TourProvider>
  );
}
