

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getDeviceType() {
  const ua = navigator.userAgent.toLowerCase();
  const uaDataMobile = navigator.userAgentData?.mobile;
  const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
  const isMobileUA = /mobi|android|iphone|ipod|ipad|tablet|windows phone/i.test(ua);

  if (uaDataMobile || isMobileUA || isTouch) return "mobile";
  return "desktop";
}