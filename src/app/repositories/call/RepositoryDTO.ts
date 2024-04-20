import { Call } from "~/app/entities";

interface SearchParams {
  offset: number;
  limit: number;
  channel_id: string;
}

interface CallRepositoryDTO {
  findAll(searchParams: SearchParams): Promise<Call[]>;
  findById(id: string): Promise<Call | undefined>;

  createCall(data: Call): Promise<void>;
  updateCall(data: Call): Promise<void>;
  deleteCall(id: string): Promise<void>;
  deleteAllCalls(id: string): Promise<void>;
}

export { SearchParams, CallRepositoryDTO };
