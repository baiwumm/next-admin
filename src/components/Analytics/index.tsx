/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2025-11-17 13:59:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2025-11-17 14:28:43
 * @Description: 统计代码
 */
"use client"
import clarity from "@microsoft/clarity";
import Script from 'next/script';
import { useEffect } from 'react';

/**
 * @description: Umami 统计代码
 */
export const UmamiAnalytics = () => {
  return process.env.NEXT_PUBLIC_UMAMI_ID && process.env.NODE_ENV === 'production' ? (
    <Script src="https://um.baiwumm.com/script.js" data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID} />
  ) : null;
};


/**
 * @description: Plausible 统计代码
 */
export const PlausibleAnalytics = () => {
  // 只在生产环境加载
  if (!process.env.NEXT_PUBLIC_APP_DOMAIN || process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      {/* 官方 Plausible 脚本 */}
      <Script
        async
        src="https://plausible.io/js/pa--JHahCEH7eI9qR23tPlfu.js"
        strategy="afterInteractive"
      />

      {/* 初始化 Plausible */}
      <Script id="plausible-init" strategy="afterInteractive">
        {`
          window.plausible = window.plausible || function() {
            (plausible.q = plausible.q || []).push(arguments)
          };
          plausible.init = plausible.init || function(i){plausible.o=i||{}};
          plausible.init();
        `}
      </Script>
    </>
  );
};

/**
 * @description: Microsoft Clarity 统计代码
 */
export const ClarityAnalytics = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      clarity.init(process.env.NEXT_PUBLIC_CLARITY_ID!);
    }
  }, []);

  return null;
};

/**
 * @description: Google 统计
 */
export const GoogleAnalytics = () => {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  if (!GA_ID || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {/* 加载 GA 主脚本 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* 初始化 Gtag */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
};