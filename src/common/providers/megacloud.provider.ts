import RabbitStream from './rabbitstream.provider';
import { Provider } from '@common/types/provider';
import { SourceResponse } from '@services/sources/dto/source.response.dto';

export const MegaCloud: Provider = {
  ALT_HOSTS: [],
  async stream(url: string): Promise<SourceResponse> {
    const id = url.split('/').at(-1)!.split('?').at(0);
    return (await RabbitStream.stream(id, 1)) as SourceResponse;
  },
};
