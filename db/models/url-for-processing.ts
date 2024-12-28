import type { Optional } from 'sequelize'

import { Model } from 'sequelize'

import { Platform } from '../../src/enum/platform'
import { UrlForProcessingStatus } from '../../src/enum/url-for-processing-status'

type UrlForProcessingAttributes = {
  id: number;
  url: string;
  platform: Platform;
  status: UrlForProcessingStatus;
  tries: number;
}

type UrlForProcessingCreationAttributes = Optional<UrlForProcessingAttributes, 'id'>

export class LinkForProcessing extends Model<UrlForProcessingAttributes, UrlForProcessingCreationAttributes> {
  declare id: number;
  declare url: string;
  declare platform: Platform;
  declare status: UrlForProcessingStatus;
  declare tries: number;
}
