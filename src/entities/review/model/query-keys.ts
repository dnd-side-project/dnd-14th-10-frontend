export const reviewKeys = {
  all: ['review'] as const,
  myReviews: () => [...reviewKeys.all, 'my'] as const,
  myReviewsList: (sort: string) => [...reviewKeys.myReviews(), sort] as const,
};
