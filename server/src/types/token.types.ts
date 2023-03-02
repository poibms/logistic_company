import { ApiProperty } from '@nestjs/swagger';

export type TokensType = {
  access_token: string;
  refresh_token: string;
};

export class AccessTokenType {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpY',
    description: 'User access token',
  })
  access_token: string;
}
