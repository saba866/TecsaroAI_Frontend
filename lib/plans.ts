import { api } from "@/lib/api";

export type Plan = {
  id: string;
  name: string;
  website_url: string;
};

export function getPlans(): Promise<Plan[]> {
  return api("/plans");
}
