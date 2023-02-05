import { z } from 'zod';

export const DeviceSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  snapLeft: z.boolean().optional(),
  snapRight: z.boolean().optional(),
  paddingX: z.number().optional(),
  paddingY: z.number().optional(),
});

export const DeviceKeySchema = z.enum([
  'desktop',
  // 'tablet',
  'mobile'
])
export const DeviceRecordSchema = z.record(DeviceKeySchema, DeviceSchema);

export const ElementSchema = z.object({
  id: z.string(),
  type: z.enum(['TEXT', 'IMAGE', 'GRID']),
  desktop: DeviceSchema,
  tablet: DeviceSchema.optional(),
  mobile: DeviceSchema.optional(),
});

export const TextElementSchema = ElementSchema.extend({
  type: z.literal('TEXT'),
  html: z.string(),
});

export const GridElementSchema = ElementSchema.extend({
  type: z.literal('GRID'),
  children: z.array(ElementSchema),
});

export const PageSchema = z.object({
  id: z.string(),
  slug: z.string(),
  isHome: z.boolean().optional(),
  children: z.array(GridElementSchema),
});

export const DocSchema = z.object({
  pages: z.array(PageSchema),
});
