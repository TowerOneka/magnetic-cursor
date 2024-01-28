"use client";

import { useEffect, useState } from "react";

enum ViewportEnum {
  desktop = "desktop",
  mobile = "mobile",
  tablet = "tablet",
}

enum Viewport {
  mobile = 768,
  tablet = 1024,
}

export type ViewportValues = keyof typeof ViewportEnum;

export const getViewport = () => {
  const mediaQueryMobile = window.matchMedia(`(max-width: ${Viewport.mobile}px)`);
  const mediaQueryTablet = window.matchMedia(`(max-width: ${Viewport.tablet}px)`);

  if (mediaQueryMobile.matches) {
    return ViewportEnum.mobile;
  }

  if (mediaQueryTablet.matches) {
    return ViewportEnum.tablet;
  }

  return ViewportEnum.desktop;
};

export const useViewport = () => {
  const [currentViewPort, setCurrentViewport] = useState<ViewportValues | null>(null);

  useEffect(() => {
    const resize = () => {
      setCurrentViewport(getViewport());
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return {
    isDesktop: currentViewPort === ViewportEnum.desktop,
    isTablet: currentViewPort === ViewportEnum.tablet,
    isMobile: currentViewPort === ViewportEnum.mobile,
    isDefined: currentViewPort !== null,
  };
};
