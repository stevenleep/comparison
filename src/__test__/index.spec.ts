import { compare, CompareStatusEnum } from "../index";

describe("happy path", () => {
  it("should: current version is greater than previous version", () => {
    const currentVersion = "1.0.1";
    const prevVersion = "1.0.0";
    const result = compare(currentVersion, prevVersion);

    expect(result.isGreater).toEqual(true);
    expect(result.status).toBe(CompareStatusEnum.Positive);
  });

  it("should: current version should be smaller than previous version", () => {
    const currentVersion = "1.0.0";
    const prevVersion = "1.0.1";
    const result = compare(currentVersion, prevVersion);

    expect(result.isGreater).toEqual(false);
    expect(result.status).toBe(CompareStatusEnum.Negative);
  });
});

describe("pre release version path", () => {
  const currentVersion = "1.0.0-alpha.1";
  const prevVersion = "1.0.0-alpha.0";

  it("should: current version is greater than previous version", () => {
    const result = compare(currentVersion, prevVersion);
    expect(result.isGreater).toEqual(true);
    expect(result.status).toBe(CompareStatusEnum.Positive);
  });

  it("should: current version should be smaller than previous version", () => {
    const result = compare(prevVersion, currentVersion);
    expect(result.isGreater).toEqual(false);
    expect(result.status).toBe(CompareStatusEnum.Negative);
  });
});

describe("pre release is preferred", () => {
  it("should pre release is preferred", () => {
    const beta = "1.0.0-beta";
    const alpha = "1.0.0-alpha";
    const result = compare(beta, alpha);
    expect(result.isGreater).toEqual(true);
    expect(result.status).toBe(CompareStatusEnum.Positive);

    const beta2 = "1.0.0-beta";
    const rc = "1.0.0-rc";
    const result2 = compare(rc, beta2);
    expect(result2.isGreater).toEqual(true);
    expect(result2.status).toBe(CompareStatusEnum.Positive);
  });
});

describe("mixed release", () => {
  it("should: allow mixed", () => {
    const current = "1.0.0-alpha";
    const prev = "1.0.0";

    const result = compare(current, prev);
    expect(result.isGreater).toEqual(true);
  });
});

describe("should compare with third params", () => {
  it("allow is empty object", () => {
    const result = compare("1.1.0", "1.0.0", {});
    expect(result.isGreater).toBe(true);
  });

  it("allow custom terminals", () => {
    const result = compare("1.1.0-beta", "1.0.0-alpha", {
      terminals: [".", "-"],
    });
    expect(result.isGreater).toBe(true);

    const result2 = compare("1.0.0=rc", "1.0.0=beta", {
      terminals: [".", "="],
    });
    expect(result2.isGreater).toBe(true);
  });

  it("allow custom pre release name", () => {
    const current = "1.0.0-b";
    const prev = "1.0.0-a";

    // a is name
    // number is weight
    const customPreReleaseNameMapping = {
      a: 1,
      b: 2,
    };
    const result = compare(current, prev, {
      prv: customPreReleaseNameMapping,
    });
    expect(result.isGreater).toBe(true);
  });
});

describe("Allow custom verification version weight", () => {
  it("allow custom verification version weight", () => {
    const current = "1.0.0-beta";
    const prev = "1.0.0-alpha";

    const result = compare(current, prev, {
      onDifferent(current, prev, currentVersionInstance, prevVersionInstance) {
        // do something ...
        // return any value
        return true;
      },
    });

    expect(result).toBe(true);
  });
});

describe("complex example", () => {
  it("complex example", () => {
    const current = "1.0.0-beta-c";
    const prev = "1.0.0-beta-a";

    const result = compare(current, prev, {
      prv: {
        a: 1,
        c: 3,
      },
      onDifferent(current, prev, currentVersionInstance, prevVersionInstance) {
        const prv = currentVersionInstance.prv;
        expect(prv).toBeDefined();
        expect(prv).toEqual({
            a: 1,
            c: 3,
        });
        expect(prv?.a).toEqual(1);

        const prv2 = prevVersionInstance.prv;
        expect(prv2).toBeDefined();
        expect(prv2).toEqual({
            a: 1,
            c: 3,
        });
        expect(prv2?.a).toEqual(1);
    
        expect(current).toEqual("c")
        expect(prev).toEqual("a");

        expect(prv?.[current]).toEqual(3);
        expect(prv?.[prev]).toEqual(1);

        // do something ...
        // return any value
        return true
      },
    });

    expect(result).toBe(true);
  });
});
