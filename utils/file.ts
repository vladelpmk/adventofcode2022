import { PathOrFileDescriptor, readFileSync } from "fs"

export const readFile = (fileName: String): String => readFileSync(fileName as PathOrFileDescriptor).toString("utf-8");