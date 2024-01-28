"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import s from "./MagnetCursor.module.scss";
import { useViewport } from "@/hooks/useViewport";

type Props = {
  children: React.ReactNode;
};

const animationDuration = 0.3;

const width = 50;
const height = 50;

const cursorAnimationOptions: gsap.TweenVars = {
  duration: animationDuration,
};

const MagnetCursor = ({ children }: Props) => {
  const cursor = useRef<HTMLDivElement | null>(null);

  const { isDesktop } = useViewport();

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const magnetElements = document.querySelectorAll("[data-cursor-magnet]");

    gsap.set(cursor.current, {
      width,
      height,
      opacity: 0,
    });

    let isAttracted: HTMLElement[] = [];

    let isInited = false;

    const xTo = gsap.quickTo(cursor.current, "x", cursorAnimationOptions);
    const yTo = gsap.quickTo(cursor.current, "y", cursorAnimationOptions);
    const widthTo = gsap.quickTo(cursor.current, "width", cursorAnimationOptions);
    const heightTo = gsap.quickTo(cursor.current, "height", cursorAnimationOptions);

    const xPercentTo = gsap.quickTo(cursor.current, "xPercent", cursorAnimationOptions);
    const yPercentTo = gsap.quickTo(cursor.current, "yPercent", cursorAnimationOptions);

    const handleAttractElement = (element: HTMLElement) => {
      const bounds = element.getBoundingClientRect();

      xTo(bounds.left);
      yTo(bounds.top);

      widthTo(bounds.width);
      heightTo(bounds.height);

      xPercentTo(0);
      yPercentTo(0);
    };

    const handleMoveMouse = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!isInited) {
        gsap.set(cursor.current, {
          opacity: 1,
          x,
          y,
        });

        isInited = true;
      }

      if (!isAttracted.length) {
        xTo(x);
        yTo(y);
        yPercentTo(-50);
        xPercentTo(-50);
      }
    };

    window.addEventListener("mousemove", handleMoveMouse);

    const handleMouseEnterDocumentBody = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && cursor.current) {
        gsap.to(cursor.current, {
          opacity: 1,
          duration: animationDuration,
        });
      }
    };

    document.body.addEventListener("mouseenter", handleMouseEnterDocumentBody);

    const handleMouseLeaveDocumentBody = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && cursor.current) {
        gsap.to(cursor.current, {
          opacity: 0,
          duration: animationDuration,
        });
      }
    };

    document.body.addEventListener("mouseleave", handleMouseLeaveDocumentBody);

    const magnetElementMouseEnter = (e: Event) => {
      isAttracted.push(e.target as HTMLElement);

      const element = e.target as HTMLElement;

      handleAttractElement(element);
    };

    magnetElements.forEach((item) => {
      item.addEventListener("mouseenter", magnetElementMouseEnter);
    });

    const magnetElementMouseLeave = (e: Event) => {
      isAttracted = isAttracted.filter((item) => item !== e.target);

      if (!isAttracted.length) {
        widthTo(width);
        heightTo(height);
      } else {
        handleAttractElement(isAttracted.at(-1)!);
      }
    };

    magnetElements.forEach((item) => {
      item.addEventListener("mouseleave", magnetElementMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMoveMouse);
      document.body.removeEventListener("mouseenter", handleMouseEnterDocumentBody);
      document.body.removeEventListener("mouseleave", handleMouseLeaveDocumentBody);
      magnetElements.forEach((el) => {
        el.removeEventListener("mouseleave", magnetElementMouseLeave);
        el.removeEventListener("mouseenter", magnetElementMouseEnter);
      });
    };
  }, [isDesktop]);

  return (
    <>
      {children}
      {isDesktop && <div className={s.cursor} ref={cursor} />}
    </>
  );
};

export default MagnetCursor;
