import { describe, expect, it } from "vitest";
import { hasVerification, needsCheck, openOpportunities, opportunityStatus, providerUrl, closingSoon } from "@/lib/data";

const now = Date.parse("2026-10-21T12:00:00Z");
const days = (n: number) => new Date(now + n * 86400000).toISOString();
describe("Case study opportunity rules", () => {
  it("marks deadlines within seven days as closing soon", () => {
    expect(opportunityStatus(days(7), now)).toBe("Closing soon");
    expect(opportunityStatus(days(7 + 1 / 86400), now)).toBe("Open");
  });
  it("closes a listing at its deadline", () => {
    expect(opportunityStatus(days(0), now)).toBe("Closed");
    expect(opportunityStatus(days(-1), now)).toBe("Closed");
  });
  it("excludes closed listings from discovery", () => {
    const items = [{ ...closingSoon, id: "closed", deadline: days(-1) }, { ...closingSoon, id: "open", deadline: days(2) }];
    expect(openOpportunities(items, now).map((o) => o.id)).toEqual(["open"]);
  });
  it("requires a check after thirty days", () => {
    expect(needsCheck(days(-30), now)).toBe(false);
    expect(needsCheck(days(-31), now)).toBe(true);
    expect(needsCheck(undefined, now)).toBe(true);
  });
  it("represents missing deadlines honestly", () => { expect(opportunityStatus("", now)).toBe("No deadline stated"); });
  it("does not verify a sample without source and review evidence", () => {
    expect(hasVerification({ ...closingSoon, verified: true, sourceUrl: "", lastChecked: "" })).toBe(false);
  });
  it("only hands off to secure external URLs", () => {
    expect(providerUrl("#")).toBeUndefined();
    expect(providerUrl("javascript:alert(1)")).toBeUndefined();
    expect(providerUrl("https://example.org/apply")).toBe("https://example.org/apply");
  });
});