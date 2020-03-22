import { titleize } from "./helpers";

export const buildNewRelicApplicationName = (
    applicationName: string,
    product: string,
    environment: string
  ): string =>
    `${titleize(applicationName)} - ${[product, environment]
      .join(' ')
      .toUpperCase()}`;