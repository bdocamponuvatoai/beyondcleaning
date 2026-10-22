import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createQuoteNotes,
  emptyRequest,
  isHomeSpace,
  isServiceOption,
  isSpaceOption,
  summarizeRequest,
  validateRequest,
} from "./request.ts";

const sample = {
  ...emptyRequest,
  service: "Deep cleaning",
  space: "Brownstone or town house",
  size: "3 bedrooms",
  bathrooms: "2",
  frequency: "One time",
  zip: " 11215 ",
  details: "  Oven & inside the fridge.  ",
};

test("notes list every detail and keep extra requests verbatim", () => {
  const notes = createQuoteNotes(sample);
  assert.ok(notes.startsWith("Free quote request for Beyond Cleaning\n"));
  assert.ok(notes.includes("Service: Deep cleaning\n"));
  assert.ok(notes.includes("Space: Brownstone or town house\n"));
  assert.ok(notes.includes("Bathrooms: 2\n"));
  assert.ok(notes.includes("ZIP code: 11215\n"));
  assert.ok(notes.includes("Extra requests: Oven & inside the fridge.\n"));
});

test("notes never claim a booking, a price, or a confirmed visit", () => {
  const notes = createQuoteNotes(sample);
  assert.ok(notes.includes("price and your availability"));
  assert.ok(!/confirmed|booked|scheduled for|guarantee|\$\d/i.test(notes));
});

test("missing optional details read as not given", () => {
  const notes = createQuoteNotes({ ...emptyRequest, service: "Maid service", zip: "10001" });
  assert.ok(notes.includes("Size: Not given\n"));
  assert.ok(notes.includes("Bathrooms: Not given\n"));
  assert.ok(notes.includes("Extra requests: None yet\n"));
});

test("business spaces ask about restrooms, not bathrooms", () => {
  const rows = summarizeRequest({ ...sample, space: "Office", size: "4,000 sq ft" });
  assert.deepEqual(rows[3], ["Restrooms", "2"]);
  assert.ok(isHomeSpace("Co-op or condo"));
  assert.ok(!isHomeSpace("Medical office"));
});

test("validation requires a service and a five-digit ZIP", () => {
  assert.deepEqual(validateRequest({ service: "", zip: "1000" }), {
    service: "Choose a service to continue.",
    zip: "Enter a five-digit ZIP code.",
  });
  assert.deepEqual(validateRequest({ service: "Deep cleaning", zip: "10a01" }), {
    zip: "Enter a five-digit ZIP code.",
  });
  assert.deepEqual(validateRequest({ service: "Deep cleaning", zip: " 10001 " }), {});
});

test("presets are recognised strictly", () => {
  assert.ok(isServiceOption("Deep cleaning"));
  assert.ok(!isServiceOption("deep cleaning"));
  assert.ok(!isServiceOption(undefined));
  assert.ok(isSpaceOption("Office"));
  assert.ok(!isSpaceOption("Castle"));
});
