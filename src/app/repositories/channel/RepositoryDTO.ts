import { Channel } from "~/app/entities";

interface SearchParams {
  offset: number;
  limit: number;
  user_id: string;
}

interface ChannelRepositoryDTO {
  findAll(searchParams: SearchParams, user_id: string): Promise<Channel[]>;
  findById(id: string): Promise<Channel | undefined>;

  createChannel(data: Channel): Promise<void>;
  updateChannel(data: Channel): Promise<void>;
  deleteChannel(id: string): Promise<void>;
}

export { SearchParams, ChannelRepositoryDTO };
