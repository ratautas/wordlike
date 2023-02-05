import { z } from 'zod';
import { DeviceSchema, DeviceKeySchema, DeviceRecordSchema, ElementSchema, TextElementSchema, GridElementSchema, PageSchema, DocSchema } from '../lib';

export type DeviceType = z.infer<typeof DeviceSchema>;
export type DeviceKeyType = z.infer<typeof DeviceKeySchema>;
export type DeviceRecordType = z.infer<typeof DeviceRecordSchema>;
export type ElementType = z.infer<typeof ElementSchema>;
export type TextElementType = z.infer<typeof TextElementSchema>;
export type GridElementType = z.infer<typeof GridElementSchema>;
export type PageType = z.infer<typeof PageSchema>;
export type DocType = z.infer<typeof DocSchema>;