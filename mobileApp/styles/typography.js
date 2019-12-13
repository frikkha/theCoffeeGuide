import * as Colors from "./colors";

// FONT FAMILY
const FONT_FAMILY_TEXT = "roboto";
// should actually be quando but cannot import it:(
const FONT_FAMILY_HEADINGS = "quando";
const FONT_FAMILY_TEXT_BOLD ="robotoBold";

// FONT WEIGHT
const FONT_WEIGHT_LIGHT = "300";
const FONT_WEIGHT_MEDIUM = "500";
const FONT_WEIGHT_BOLD = "800";

// FONT SIZE
const FONT_SIZE_32 = 32;
const FONT_SIZE_24 = 24;
const FONT_SIZE_18 = 18;
const FONT_SIZE_16 = 16;
const FONT_SIZE_14 = 14;
const FONT_SIZE_12 = 12;
const FONT_SIZE_10 = 10;

// FONT STYLE
export const FONT_H2_ORANGE = {
  fontFamily: FONT_FAMILY_HEADINGS,
  fontWeight: FONT_WEIGHT_MEDIUM,
  fontSize: FONT_SIZE_32,
  color: Colors.ORANGE_DARK
};
export const FONT_H2_BROWN = {
  fontFamily: FONT_FAMILY_HEADINGS,
  fontWeight: FONT_WEIGHT_MEDIUM,
  fontSize: FONT_SIZE_32,
  color: Colors.BROWN_DARK
};
export const FONT_H2_BROWN_LOADING = {
  fontWeight: FONT_WEIGHT_MEDIUM,
  fontSize: FONT_SIZE_32,
  color: Colors.BROWN_DARK
};
export const FONT_H4_PINK = {
  fontFamily: FONT_FAMILY_HEADINGS,
  fontWeight: FONT_WEIGHT_MEDIUM,
  fontSize: FONT_SIZE_18,
  color: Colors.PINK
};
export const FONT_H4_GREY = {
  fontFamily: FONT_FAMILY_HEADINGS,
  fontWeight: FONT_WEIGHT_MEDIUM,
  fontSize: FONT_SIZE_18,
  color: Colors.GREY
};
export const FONT_H4_BROWN_LIGHT = {
  fontFamily: FONT_FAMILY_HEADINGS,
  fontWeight: FONT_WEIGHT_MEDIUM,
  fontSize: FONT_SIZE_18,
  color: Colors.BROWN_LIGHT
};
export const FONT_H4_BROWN_DARK = {
  fontFamily: FONT_FAMILY_HEADINGS,
  fontWeight: FONT_WEIGHT_MEDIUM,
  fontSize: FONT_SIZE_18,
  color: Colors.BROWN_DARK
};

export const FONT_MED_BROWN_DARK_BOLD = {
  fontFamily: FONT_FAMILY_TEXT_BOLD,
  fontSize: FONT_SIZE_16,
  color: Colors.BROWN_DARK
};
export const FONT_MED_BROWN_DARK = {
  fontFamily: FONT_FAMILY_TEXT,
  fontSize: FONT_SIZE_16,
  color: Colors.BROWN_DARK
};
export const FONT_SMALL_BROWN_RED = {
  fontFamily: FONT_FAMILY_TEXT,
  fontWeight: FONT_WEIGHT_MEDIUM,
  fontSize: FONT_SIZE_12,
  color: Colors.BROWN_RED
};
