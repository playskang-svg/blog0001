import type { UIStrings } from "../types";

export default {
  nav: {
    home: "홈",
    posts: "전체 가이드",
    categories: "카테고리",
    tags: "지역·상황",
    about: "운영 안내",
    archives: "글 보관함",
    search: "검색",
  },
  post: {
    publishedAt: "발행",
    updatedAt: "업데이트",
    sharePostIntro: "이 글 공유하기",
    sharePostOn: "{{platform}}에 이 글 공유하기",
    sharePostViaEmail: "이메일로 이 글 공유하기",
    tagLabel: "지역·상황",
    backToTop: "맨 위로",
    goBack: "이전 화면",
    editPage: "글 수정",
    previousPost: "이전 글",
    nextPost: "다음 글",
  },
  pagination: {
    prev: "이전",
    next: "다음",
    page: "페이지",
  },
  home: {
    socialLinks: "소셜 링크",
    featured: "먼저 읽을 가이드",
    recentPosts: "최근 발행 가이드",
    allPosts: "전체 가이드 보기",
  },
  footer: {
    copyright: "저작권",
    allRightsReserved: "모든 권리를 보유합니다.",
  },
  pages: {
    tagTitle: "지역·상황",
    tagDesc: "이 주제와 관련된 모든 여행 가이드",

    tagsTitle: "지역·상황별 보기",
    tagsDesc: "도시, 교통수단, 동행 조건으로 필요한 글을 찾으세요.",

    categoriesTitle: "교통 문제별 카테고리",
    categoriesDesc:
      "도착부터 숙소까지 실제로 막히는 지점을 기준으로 정리했습니다.",
    categoryTitle: "카테고리",

    postsTitle: "전체 여행 가이드",
    postsDesc: "일본 소도시의 이동과 숙박 거점을 함께 해결하는 글입니다.",

    archivesTitle: "글 보관함",
    archivesDesc: "발행 시기별로 여행 가이드를 확인하세요.",

    searchTitle: "가이드 검색",
    searchDesc: "도시, 공항, 역, 항구 또는 교통수단을 검색하세요.",
  },
  a11y: {
    skipToContent: "본문으로 바로가기",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    toggleTheme: "화면 테마 변경",
    searchPlaceholder: "여행 가이드 검색",
    noResults: "검색 결과가 없습니다.",
    goToPreviousPage: "이전 페이지로 이동",
    goToNextPage: "다음 페이지로 이동",
  },
  notFound: {
    title: "페이지를 찾을 수 없습니다",
    message: "요청한 페이지가 없거나 이동되었습니다.",
    goHome: "홈으로 돌아가기",
  },
} satisfies UIStrings;
