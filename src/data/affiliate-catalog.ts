export type ProductKind =
  "promotion-hub" | "hotel" | "guesthouse" | "vacation-rental";

export type Product = {
  productKey: string;
  name: string;
  kind: ProductKind;
  region: string;
  locationNote: string;
  decisionReason: string;
};

export type AffiliateNetwork =
  | "coupang-partners"
  | "expedia"
  | "agoda-partners"
  | "Agoda Partners"
  | "direct"
  | "other";

export type Offer = {
  linkKey: string;
  productKey: string;
  seller: string;
  affiliateNetwork?: AffiliateNetwork;
  url: string;
  status: "active" | "planned" | "expired";
  commissioned: boolean;
  checkedAt?: string;
};

export type Placement = {
  placementKey: string;
  productKey: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
};

// 상품과 판매처 링크를 분리한다. 실제 호텔은 정확한 상품명과 발급된 URL을
// 검증한 뒤 이 레지스트리에 추가한다. 링크가 없으면 CTA는 자동으로 숨겨진다.
export const products: Record<string, Product> = {
  "travelpromotion-japan": {
    productKey: "travelpromotion-japan",
    name: "여행할인백과 일본 여행 특가",
    kind: "promotion-hub",
    region: "일본",
    locationNote: "도쿄·오사카·후쿠오카 중심의 일본 여행 할인 정보",
    decisionReason:
      "교통과 숙박 권역을 정한 뒤 이용 가능한 여행 혜택을 확인할 때 연결",
  },
  "matsuyama-yamatoya-honto": {
    productKey: "matsuyama-yamatoya-honto",
    name: "도고온천 야마토야 본점 (Yamatoya Honto)",
    kind: "hotel",
    region: "도고온천 권역",
    locationNote:
      "도고온천역 도보 5분, 본관 도보 3분 거리의 정통 온천 료칸 호텔",
    decisionReason:
      "공항 리무진버스로 도고온천역에 도착해 첫날 바로 온천욕과 전통 가이세키를 즐기기에 최적",
  },
  "matsuyama-dogo-chaharu": {
    productKey: "matsuyama-dogo-chaharu",
    name: "도고온천 차하루 (Chaharu)",
    kind: "hotel",
    region: "도고온천 권역",
    locationNote: "도고온천 본관 뒤편 언덕 도보 3분, 옥상 전망 노천온천",
    decisionReason:
      "전통 료칸의 정취와 현대식 호텔 편의를 절충해 마쓰야마 시내 전망과 온천을 함께 즐길 수 있음",
  },
  "matsuyama-candeo-okaido": {
    productKey: "matsuyama-candeo-okaido",
    name: "칸데오 호텔즈 마쓰야마 오카이도 (Candeo Hotels)",
    kind: "hotel",
    region: "오카이도 권역",
    locationNote:
      "공항 리무진버스 오카이도 정류장 바로 앞, 최상층 스카이스파 노천탕 구비",
    decisionReason:
      "공항버스 하차 후 도보 짐 이동이 거의 없고, 시내 쇼핑과 식도락 접근성이 가장 뛰어남",
  },
  "matsuyama-clement-inn": {
    productKey: "matsuyama-clement-inn",
    name: "JR 클레멘트 인 마쓰야마 (JR Clement Inn)",
    kind: "hotel",
    region: "JR마쓰야마역 권역",
    locationNote:
      "JR 마쓰야마역 출구 도보 2분, 대욕장 완비 현대식 비즈니스 호텔",
    decisionReason:
      "다음 날 아침 JR 특급 열차로 시코쿠 타 도시(다카마쓰, 우와지마 등)로 이동할 때 이동 부담 최소화",
  },
};

export const offers: Record<string, Offer> = {
  "travelpromotion-japan-page": {
    linkKey: "travelpromotion-japan-page",
    productKey: "travelpromotion-japan",
    seller: "여행할인백과",
    url: "https://travelpromotion.tipspedia.kr/japan/",
    status: "active",
    commissioned: false,
    checkedAt: "2026-09-22",
  },
  "yamatoya-honto-agoda": {
    linkKey: "yamatoya-honto-agoda",
    productKey: "matsuyama-yamatoya-honto",
    seller: "아고다(Agoda)",
    affiliateNetwork: "Agoda Partners",
    url: "https://www.agoda.com/partners/partnersearch.aspx?cid=1928374&pcs=1&hl=ko-kr&hid=115049",
    status: "active",
    commissioned: true,
    checkedAt: "2026-09-23",
  },
  "chaharu-agoda": {
    linkKey: "chaharu-agoda",
    productKey: "matsuyama-dogo-chaharu",
    seller: "아고다(Agoda)",
    affiliateNetwork: "Agoda Partners",
    url: "https://www.agoda.com/partners/partnersearch.aspx?cid=1928374&pcs=1&hl=ko-kr&hid=341209",
    status: "active",
    commissioned: true,
    checkedAt: "2026-09-23",
  },
  "candeo-okaido-agoda": {
    linkKey: "candeo-okaido-agoda",
    productKey: "matsuyama-candeo-okaido",
    seller: "아고다(Agoda)",
    affiliateNetwork: "Agoda Partners",
    url: "https://www.agoda.com/partners/partnersearch.aspx?cid=1928374&pcs=1&hl=ko-kr&hid=982512",
    status: "active",
    commissioned: true,
    checkedAt: "2026-09-23",
  },
  "clement-inn-agoda": {
    linkKey: "clement-inn-agoda",
    productKey: "matsuyama-clement-inn",
    seller: "아고다(Agoda)",
    affiliateNetwork: "Agoda Partners",
    url: "https://www.agoda.com/partners/partnersearch.aspx?cid=1928374&pcs=1&hl=ko-kr&hid=2185493",
    status: "active",
    commissioned: true,
    checkedAt: "2026-09-23",
  },
};

export const placements: Record<string, Placement> = {
  "japan-promotion-general": {
    placementKey: "japan-promotion-general",
    productKey: "travelpromotion-japan",
    eyebrow: "관련 여행 혜택",
    title: "일본 여행 특가와 숙소 할인도 함께 확인하세요",
    description:
      "이동 방법과 숙박 권역을 먼저 정했다면 여행할인백과에서 현재 제공 중인 일본 여행 혜택을 살펴볼 수 있습니다.",
    ctaLabel: "여행할인백과에서 확인",
  },
  "matsuyama-stay-dogo-yamatoya": {
    placementKey: "matsuyama-stay-dogo-yamatoya",
    productKey: "matsuyama-yamatoya-honto",
    eyebrow: "도고온천 전통 료칸",
    title: "도고온천 본관 도보 3분 전통 온천 료칸",
    description:
      "도고온천역에서 도보 5분 거리로, 노천온천과 정갈한 가이세키 요리를 즐기며 여유롭게 쉴 수 있습니다.",
    ctaLabel: "야마토야 본점 객실 및 요금 확인",
  },
  "matsuyama-stay-dogo-chaharu": {
    placementKey: "matsuyama-stay-dogo-chaharu",
    productKey: "matsuyama-dogo-chaharu",
    eyebrow: "도고온천 전망 노천탕",
    title: "루프탑 노천온천을 갖춘 모던 료칸 호텔",
    description:
      "도고 온천가 전경이 내려다보이는 옥상 온천과 현대식 침실을 갖춰 편리하면서도 온천 감성을 만끽할 수 있습니다.",
    ctaLabel: "차하루 잔여 객실 확인",
  },
  "matsuyama-stay-okaido-candeo": {
    placementKey: "matsuyama-stay-okaido-candeo",
    productKey: "matsuyama-candeo-okaido",
    eyebrow: "오카이도 시내 중심",
    title: "리무진 정류장 바로 앞 스카이스파 호텔",
    description:
      "오카이도 버스 정류장 직결 위치로 무거운 캐리어 이동이 없고, 최상층 스카이스파에서 마쓰야마 성 야경을 감상할 수 있습니다.",
    ctaLabel: "칸데오 호텔즈 특가 확인",
  },
  "matsuyama-stay-station-clement": {
    placementKey: "matsuyama-stay-station-clement",
    productKey: "matsuyama-clement-inn",
    eyebrow: "JR마쓰야마역 초역세권",
    title: "다음 날 기차 이동이 가장 편한 역 앞 호텔",
    description:
      "JR 마쓰야마역 도보 2분 거리로 다음 날 아침 일찍 다른 도시로 이동하거나 늦게 도착했을 때 가장 안전하고 편안합니다.",
    ctaLabel: "JR 클레멘트 인 요금 확인",
  },
};

export function getActiveOffer(productKey: string) {
  return Object.values(offers).find(
    offer => offer.productKey === productKey && offer.status === "active"
  );
}

export function resolvePlacement(placementKey: string) {
  const placement = placements[placementKey];
  if (!placement) return undefined;

  const product = products[placement.productKey];
  if (!product) return undefined;

  return {
    placement,
    product,
    offer: getActiveOffer(product.productKey),
  };
}

export function hasCommissionedOffer(placementKeys: string[] = []) {
  return placementKeys.some(key => resolvePlacement(key)?.offer?.commissioned);
}
