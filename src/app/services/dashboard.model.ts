export class DashboardResponse {
  feedbacks: number = 0;
  comments: number = 0;
  feedbackMonthCounts!: FeedbackMonthCount[];
  commentMonthCounts!: CommentMonthCount[];
}

export interface FeedbackMonthCount {
  month: number;
  count: number;
}

export interface CommentMonthCount {
  month: number;
  count: number;
}

export enum Mes {
  January = 1,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

export function getMesPorNumero(monthNumber: number): string {
  return Mes[monthNumber] ?? "Invalid Month";
}

