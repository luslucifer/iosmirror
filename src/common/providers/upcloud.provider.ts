import { SourceResponse } from '@services/sources/dto/source.response.dto.js';
import RabbitStream from './rabbitstream.provider.js';
import { Provider } from '@common/types/provider.js';

export const UpCloud: Provider = {
  ALT_HOSTS: [],
  async stream(url: string): Promise<SourceResponse> {
    const id = url.split('/').at(-1)!.split('?').at(0);
    return (await RabbitStream.stream(id)) as SourceResponse;
  },
};
