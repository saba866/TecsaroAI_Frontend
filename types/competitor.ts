export type Competitor = {
  id: string;
  plan_id: string;
  domain: string;
  source: "user" | "ai" | "crawl" | "kg";
  classification: "direct" | "indirect";
  confidence_score: number;
  approved: boolean;
  detected_reason?: string;
  created_at: string;
};
