import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://blog.tipspedia.kr/",
    title: "여행팁블로그",
    description:
      "교통부터 숙박 거점까지 이어지는 일본 소도시 실전 여행 팁을 전합니다.",
    author: "여행팁블로그 편집팀",
    profile: "https://blog.tipspedia.kr/about/",
    ogImage: "default-og.webp",
    lang: "ko",
    timezone: "Asia/Seoul",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [],
  shareLinks: [
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x", url: "https://x.com/intent/post?url=" },
    {
      name: "mail",
      url: "mailto:?subject=%EC%97%AC%ED%96%89%20%EA%B0%80%EC%9D%B4%EB%93%9C%20%EA%B3%B5%EC%9C%A0&body=",
    },
  ],
});
