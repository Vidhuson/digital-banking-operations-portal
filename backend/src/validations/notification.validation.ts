import { z } from "zod";
import { notificationReferenceSchema } from "./common.validation";

export const notificationReferenceParamSchema = z.object({
    params: z.object({
        notificationReference: notificationReferenceSchema
    })
});
