import * as fs from "fs";

import { set_cptable, set_fs } from "xlsx";
import * as cptable from "xlsx/dist/cpexcel.full.mjs";

set_fs(fs);
// The ESM build of SheetJS ships without the codepage tables that its CJS build loaded on its own (#198)
set_cptable(cptable);
