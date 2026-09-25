# 여행팁블로그 (hub.tipspedia.kr)

일본 소도시 교통과 숙박 거점 실전 가이드를 전하는 블로그 사이트. 팁스피디아(tipspedia.kr)의 서브도메인 사이트다.
기존 구글 블로그스팟(Blogger)에서 Astro + AstroPaper 기반 Cloudflare Workers 정적 사이트로 전환되었다.

`AGENTS.md`는 이 파일의 링크다.

## 구조 (Astro + AstroPaper v6 테마)

- 시스템 한글 폰트(`Pretendard, "Noto Sans KR", ...`) 적용으로 웹폰트 요청 없이 최적 속도 유지
- Pagefind 정적 검색 내장 (`npm run build` 시 자동 색인)
- Cloudflare Workers 정적 에셋(Static Assets) 서빙

| 경로 | 내용 |
|---|---|
| `src/content/posts/published/<카테고리>/<slug>.mdx` | 글 한 편 = 파일 하나. 공개 주소는 `/posts/<slug>/` |
| `src/content/templates/` | 새 글 템플릿 |
| `src/content/pages/*.md` | 소개(`about`) 등 기본 페이지 |
| `src/data/categories.ts` | 카테고리 정의 |
| `astro-paper.config.ts` | 사이트 이름(`여행팁블로그`), 주소(`https://hub.tipspedia.kr/`), 설명, 기능 설정 |
| `public/admin/` | Decap CMS 관리자 화면 |
| `wrangler.jsonc` | Cloudflare Workers 배포 설정 (`hub.tipspedia.kr`) |
| `public/_headers` | 캐시 및 보안 헤더 |
| `public/_redirects` | 301 리다이렉트 설정 (`/sitemap.xml -> /sitemap-index.xml`) |

## 명령어

```bash
npm install          # 패키지 설치
npm run dev          # 로컬 개발 서버 실행 (http://localhost:4321)
npm run build        # 콘텐츠 검증 -> astro check -> astro build -> Pagefind 색인
npm run lint         # 코드 린트 검사
npm run format       # prettier 포맷팅
npm run preview      # 빌드 결과물(dist/) 로컬 미리보기
```

## 배포 — Cloudflare Workers

- Worker 이름: `hub-tipspedia`
- 도메인: `hub.tipspedia.kr` (Cloudflare Workers Custom Domain)
- `main` 브랜치에 push되면 `.github/workflows/deploy.yml`이 자동 빌드 및 배포를 실행합니다.
- 저장소 시크릿: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- 수동 배포: `npm run build && npx wrangler deploy`