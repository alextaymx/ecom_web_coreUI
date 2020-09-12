module.exports = {
  parser: "babel-eslint",
  plugins: ["import"],
  extends: ["airbnb", "plugin:jsx-a11y/recommended", "prettier", "prettier/react"],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    //You can override any rules you want
    no-console: "warn",
    no-eval: "error",
    import/first: "error",
    'linebreak-style': 0
};
