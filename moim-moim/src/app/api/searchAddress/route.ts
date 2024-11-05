import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query"); // 쿼리 매개변수 가져오기
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

  // 쿼리 또는 API 키가 없으면 400 상태 코드 반환
  if (!query || !apiKey) {
    return NextResponse.json({ error: "Query or API key is missing" }, { status: 400 });
  }

  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
      },
    });

    // 응답이 실패한 경우 에러 메시지 반환
    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("API 호출 실패:", errorDetails);
      return NextResponse.json({ error: "Failed to fetch data", details: errorDetails }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch 에러:", error);
    return NextResponse.json({ error: "Failed to fetch data", details: error }, { status: 500 });
  }
}
