export interface VideoDTO {
  _id: string;
  videourl: string;
  title: string;
  description: string;
  userId: string;
  controls?: boolean;
  transformation?: {
    width: number;
    height: number;
    quality?: number;
  };
  createdAt?: string;
}
