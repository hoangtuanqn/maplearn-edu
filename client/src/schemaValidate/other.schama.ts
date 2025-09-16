import { z } from "zod";

export const provinceSchema = z.array(
    z.object({
        province_code: z.string(),
        name: z.string(),
    }),
);

export type ProvinceType = z.infer<typeof provinceSchema>;
