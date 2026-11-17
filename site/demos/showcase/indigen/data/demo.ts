export type WorkflowStep = { title: string; detail: string; color: string; time: string };

export const workflow = {
  title: "Order delay detected",
  order: "Order #34532",
  steps: [
    { title: "Issue detected", detail: "Customer reported shipment delay", color: "#e5261f", time: "09.42 AM" },
    { title: "Agent analysing", detail: "Checking order, inventory and logistics", color: "#7fb2e3", time: "09.42 AM" },
    { title: "Logistics updated", detail: "Rerouted from nearest fulfilment centre", color: "#17a05d", time: "09.43 AM" },
    { title: "Customer notified", detail: "Update sent via email and SMS", color: "#f39a12", time: "09.43 AM" },
    { title: "Finance synced", detail: "Refund timeline adjusted automatically", color: "#8b4de0", time: "09.44 AM" },
  ] satisfies WorkflowStep[],
  done: { title: "Resolution Completed", detail: "All systems synchronized" },
};

export type ChatMessage = { from: "user" | "agent"; text: string; time: string; afterStep: number };

/** Each message appears once the workflow has reached `afterStep`. */
export const conversation: ChatMessage[] = [
  { from: "user", text: "The customer's order is delayed", time: "09.42 AM", afterStep: 1 },
  { from: "agent", text: "I've identified the delay in the regional warehouse due to high demand.", time: "09.42 AM", afterStep: 2 },
  { from: "agent", text: "I've connected the order data and confirmed the updated delivery timeline.", time: "09.43 AM", afterStep: 3 },
  { from: "agent", text: "The customer has been notified and the new delivery date is updated.", time: "09.44 AM", afterStep: 5 },
];

export const suggestedCommands = ["Show the new delivery date", "Who approved the reroute?", "Summarise this order"];

/** Keyword-matched replies for the demo command box. */
export const replies: { match: RegExp; text: string }[] = [
  { match: /date|deliver|when|eta/i, text: "New delivery date is Thursday 14 March, one day later than first promised. The customer has confirmed by SMS." },
  { match: /approve|who|reroute|rule/i, text: "No approval was needed. Rerouting within the same region is inside the limits your operations team set for this workflow." },
  { match: /refund|credit|finance|cost/i, text: "A £4.50 delivery credit was applied under the late-parcel policy and posted to the ledger at 09.44 AM." },
  { match: /summar|order|status/i, text: "Order #34532: delayed at the regional warehouse, rerouted from the nearest fulfilment centre, customer notified, finance synced. Resolved in two minutes." },
];

export const fallbackReply =
  "This is a demo agent with a small script. Try asking about the delivery date, the reroute approval or the refund.";
