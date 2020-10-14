module.exports = function(config) {
  config.set({
    mutator: "typescript",
    packageManager: "npm",
    reporters: ["clear-text", "progress"],
    testRunner: "jasmine",
    transpilers: ["typescript"],
    testFramework: "jasmine",
    coverageAnalysis: "perTest",
    jasmineConfigFile: "spec/support/jasmine-stryker.json",
    tsconfigFile: "tsconfig.json",
    mutate: ["src/move-validation.ts"]
  });
};
