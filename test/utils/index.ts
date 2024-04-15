import { readFileSync } from "fs";

export const readBufferFixture = (name: string) => readFileSync(`${__dirname}/../fixtures/${name}`);
export const readFixture = (name: string) => readBufferFixture(name).toString("utf8");
