import { v4 as uuid } from "uuid";
import * as eventstore from "../";
import { EventData, Revision } from "../types";

describe("subscribe to stream", function () {
  it("should successfully subsscribe to stream", async function () {
    const connection = eventstore.EventStoreConnection.builder()
      .sslDevMode()
      .build("localhost:2113");

    const evt = EventData.json("typescript-type", {
      message: "baz",
    }).build();

    const streamName = `subscribe-${uuid()}`;
    const promise = new Promise<number>((resolve, reject) => {
      let count = 0;
      connection
        .streams()
        .subscribe(streamName)
        .execute({
          onError: reject,
          onEnd: () => {
            resolve(count);
          },
          onEvent: (event) => {
            expect(event).toBeDefined();
            ++count;
            if (count === 3) {
              resolve(count);
            }
          },
        });
    });

    await connection
      .streams()
      .writeEvents(streamName)
      .expectedVersion(Revision.Any)
      .send([evt, evt, evt]);

    const result = await promise;
    expect(result).toBe(3);
  });
});
