import { api } from "@/lib/api";
import { Competitor } from "@/types/competitor";

// GET competitors for a plan
export function getCompetitors(planId: string): Promise<Competitor[]> {
  return api(`/aeo/${planId}`);
}

// ADD seed competitors
export function addSeedCompetitors(
  planId: string,
  domains: string[]
) {
  return api("/aeo/seed", {
    method: "POST",
    body: { planId, domains },
  });
}

// APPROVE competitor
export function approveCompetitor(id: string) {
  return api(`/aeo/${id}/approve`, {
    method: "PATCH" as any,
  });
}


// DELETE competitor
export function deleteCompetitor(id: string) {
  return api(`/aeo/${id}`, {
    method: "DELETE",
  });
}
