/*
 * This test passes:
 *
 * Notice that thingFour is missing from this property matcher object,
 * but it is present in the object being tested, and in the final
 * snapshot. I think this expected, as Jest treats property matcher
 * objects (even nested property matcher objects) as subsets to be
 * matched against.
 */

it("nested object", () => {
  expect({
    thingOne: "1",
    thingTwo: {
      thingThree: "3",
      thingFour: "4"
    }
  }).toMatchInlineSnapshot(
    {
      thingOne: "1",
      thingTwo: {
        thingThree: "3"
        // thingFour: "4"
      }
    },
    `
Object {
  "thingOne": "1",
  "thingTwo": Object {
    "thingFour": "4",
    "thingThree": "3",
  },
}
`
  );
});

/*
 * This test fails:
 *
 * Notice, once again, that thingFour is missing from the property matcher
 * object. This time, the nested object lives within an array. It seems like the
 * object in the array is expected an exact match, rather than a subset match.
 */

it("object in array", () => {
  expect({
    thingOne: "1",
    thingTwo: [
      {
        thingThree: "3",
        thingFour: "4"
      }
    ]
  }).toMatchInlineSnapshot(
    {
      thingOne: "1",
      thingTwo: [
        {
          thingThree: "3"
          // thingFour: "4"
        }
      ]
    },
    `
Object {
  "thingOne": "1",
  "thingTwo": Array [
    Object {
      "thingFour": "4",
      "thingThree": "3",
    },
  ],
}
`
  );
});
