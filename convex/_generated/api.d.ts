/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as board from "../board.js";
import type * as boards from "../boards.js";
import type * as hooks_use_api_mutation from "../hooks/use_api_mutation.js";
import type * as hooks_use_delete_layers from "../hooks/use_delete_layers.js";
import type * as hooks_use_selection_bounds from "../hooks/use_selection_bounds.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  board: typeof board;
  boards: typeof boards;
  "hooks/use_api_mutation": typeof hooks_use_api_mutation;
  "hooks/use_delete_layers": typeof hooks_use_delete_layers;
  "hooks/use_selection_bounds": typeof hooks_use_selection_bounds;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
