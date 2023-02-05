import { z } from 'zod';
import { DeviceSchema, DeviceKeySchema, DeviceRecordSchema, ElementSchema, TextElementSchema, GridElementSchema, PageSchema, DocSchema } from '../lib';

export type DeviceSchema = z.infer<typeof DeviceSchema>;
export type DeviceKeySchema = z.infer<typeof DeviceKeySchema>;
export type DeviceRecordSchema = z.infer<typeof DeviceRecordSchema>;
export type ElementSchema = z.infer<typeof ElementSchema>;
export type TextElementSchema = z.infer<typeof TextElementSchema>;
export type GridElementSchema = z.infer<typeof GridElementSchema>;
export type PageSchema = z.infer<typeof PageSchema>;
export type DocSchema = z.infer<typeof DocSchema>;