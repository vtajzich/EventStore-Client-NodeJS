import { Cluster } from "./Cluster";

export const createTestNode = (count = 1): Cluster => new Cluster(count);
export const createTestCluster = (count = 3): Cluster => new Cluster(count);
export const createInsecureTestNode = (): Cluster => new Cluster(1, true);
export const createInsecureTestCluster = (count = 3): Cluster =>
  new Cluster(count, true);

export * from "./Defer";
export * from "./delay";
export * from "./testEvents";
export * from "./optionalDescribe";
export * from "./postEventViaHttpApi";
