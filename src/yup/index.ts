import * as Yup from "yup";

Yup.setLocale({
  number: {
    min: ({ min }) => ({ key: "field_too_short", values: { min } }),
    max: ({ max }) => ({ key: "field_too_big", values: { max } }),
    positive: ({ more }) => ({ key: "must be a postive number", values: more }),
    negative: ({ less }) => ({ key: "must be a negative number", values: less }),
  },
  boolean: {
    isValue: "Field must be type boolean",
  },
  string: {
    length: ({ length }) => ({ key: "field_too_short", values: { length } }),
    matches: ({ regex }) => ({ key: "field_too_short", values: { regex } }),
    email: ({ regex }) => ({ key: "field_too_short", values: { regex } }),
    url: ({ regex }) => ({ key: "field_too_short", values: { regex } }),
  },
  mixed: {
    required: () => ({ key: "fieldIsRequired", values: null }),
  },
});

const fairytaleYup = { ...Yup };

export default fairytaleYup;
