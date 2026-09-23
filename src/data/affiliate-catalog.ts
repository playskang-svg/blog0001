// data/affiliate-links.json은 `npm run sync:affiliate`가 생성한다 — 직접 고치지 않는다.
import centralLinksData from "../../data/affiliate-links.json";

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
  "coupang-partners" | "expedia" | "direct" | "other";

export type Offer = {
  linkKey: string;
  productKey: string;
  seller: string;
  affiliateNetwork?: AffiliateNetwork;
  /** 이 URL을 직접 하드코딩하는 대신 쓸 때: 제휴링크 중앙 저장소(affiliatelink)의 link_key.
   *  있으면 이 값으로 url을 대체해서 가져온다 (offerUrl 참고). */
  centralKey?: string;
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
};

export function getActiveOffer(productKey: string) {
  return Object.values(offers).find(
    offer => offer.productKey === productKey && offer.status === "active"
  );
}

/**
 * offer의 실제 URL. centralKey가 있으면 제휴링크 중앙 저장소(affiliatelink)의
 * data/affiliate-links.json에서 조회하고, 없으면 offer.url을 그대로 쓴다.
 * (오늘 등록된 offer는 전부 centralKey가 없다 — 새로 커미션 붙는 offer부터 centralKey로 옮긴다.)
 */
export function offerUrl(offer: Offer): string {
  if (!offer.centralKey) return offer.url;
  return getCentralLink(offer.centralKey).url;
}

type CentralLink = {
  key: string;
  url: string;
  status: "active" | "collected" | "review" | "retired";
  issue?: string;
};

const centralLinks = centralLinksData.links as CentralLink[];

function getCentralLink(key: string): CentralLink {
  const link = centralLinks.find(l => l.key === key);
  if (!link) throw new Error(`[affiliate] unknown central link_key: ${key}`);
  if (link.status === "retired") {
    throw new Error(
      `[affiliate] retired central link_key: ${key} (${link.issue ?? "사용 중단"})`
    );
  }
  return link;
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
