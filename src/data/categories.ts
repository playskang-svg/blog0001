export const CATEGORY_SLUGS = [
  "airport-to-stay",
  "no-car-small-city",
  "island-and-port",
  "stay-base",
  "late-arrival",
] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type CategoryDefinition = {
  slug: CategorySlug;
  name: string;
  shortDescription: string;
  description: string;
  question: string;
  nextDecision: string;
  launchRegions: string[];
  status: "launch" | "expand";
};

export const CATEGORIES: Record<CategorySlug, CategoryDefinition> = {
  "airport-to-stay": {
    slug: "airport-to-stay",
    name: "공항에서 숙소까지",
    shortDescription: "도착 직후의 버스·철도·택시 선택과 숙박 거점을 함께 판단합니다.",
    description:
      "소도시 공항에서 시내로 들어가는 방법을 도착 시각, 짐, 동행자, 막차 기준으로 비교하고 첫날 숙소를 어느 권역에 잡아야 하는지 연결합니다.",
    question: "도착 시간에 맞춰 어떤 교통편을 타고 어디에 묵어야 할까?",
    nextDecision: "공항버스 정류장·역에서 걷기 쉬운 숙소 권역 선택",
    launchRegions: ["마쓰야마", "기타큐슈", "다카마쓰", "사가"],
    status: "launch",
  },
  "no-car-small-city": {
    slug: "no-car-small-city",
    name: "렌터카 없는 소도시",
    shortDescription: "기차와 버스만으로 가능한 동선과 숙박 위치를 설계합니다.",
    description:
      "렌터카 없이 가기 까다로운 소도시와 근교 관광지를 대중교통 시간표, 환승 횟수, 짐 보관, 돌아오는 막차 관점에서 풀어냅니다.",
    question: "차 없이도 다녀올 수 있을까, 아니면 현지에서 1박해야 할까?",
    nextDecision: "당일치기와 1박 중 선택하고 환승 거점 주변 숙소 검토",
    launchRegions: ["구마모토·아소", "사가·우레시노", "돗토리·마쓰에"],
    status: "launch",
  },
  "island-and-port": {
    slug: "island-and-port",
    name: "섬·항구 환승",
    shortDescription: "페리 시간과 항구 이동을 기준으로 전날·당일 숙박지를 고릅니다.",
    description:
      "배편을 놓치기 쉬운 섬 여행에서 공항·역·항구 사이 이동, 승선 준비, 짐 보관과 전날 숙박 여부를 한 흐름으로 안내합니다.",
    question: "첫 배와 마지막 배를 놓치지 않으려면 어느 항구 근처에 묵어야 할까?",
    nextDecision: "항구 도보권 호텔·게스트하우스·단기임대 숙소 비교",
    launchRegions: ["다카마쓰·나오시마", "가고시마·야쿠시마", "시모노세키·모지코"],
    status: "launch",
  },
  "stay-base": {
    slug: "stay-base",
    name: "관광지 가까운 숙소거점",
    shortDescription: "관광지보다 역·정류장·항구를 기준으로 숙소 권역을 비교합니다.",
    description:
      "호텔, 게스트하우스, 에어비앤비 같은 단기임대 숙소를 단순 추천하지 않고 이동시간, 계단, 짐, 식사와 다음 날 출발 동선으로 비교합니다.",
    question: "관광지 바로 앞과 교통 거점 중 어디에 묵는 편이 실제로 편할까?",
    nextDecision: "숙소 유형과 예약 판매처 비교",
    launchRegions: ["마쓰야마 도고온천", "고쿠라·모지코", "다카마쓰항"],
    status: "expand",
  },
  "late-arrival": {
    slug: "late-arrival",
    name: "늦은 도착·이른 출발",
    shortDescription: "막차와 첫차 때문에 생기는 숙박 문제를 해결합니다.",
    description:
      "저녁 항공편, 새벽 출발, 첫 배처럼 시간 제약이 큰 일정에서 이동 실패 가능성을 줄이고 전날 숙박이 필요한 조건을 정리합니다.",
    question: "막차 뒤에 도착하거나 첫차 전에 출발하면 어디에서 자야 할까?",
    nextDecision: "공항·역·항구 인접 숙소와 셔틀 제공 여부 확인",
    launchRegions: ["기타큐슈공항", "마쓰야마공항", "다카마쓰항"],
    status: "expand",
  },
};

export const categoryList = CATEGORY_SLUGS.map(slug => CATEGORIES[slug]);

export function getCategory(slug: string) {
  return CATEGORIES[slug as CategorySlug];
}
