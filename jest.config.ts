import type { Config } from '@jest/types';

export const config: Config.InitialOptions = {
  verbose: true,
  transform: { '^.+\\.tsx?$': 'ts-jest' }
};
