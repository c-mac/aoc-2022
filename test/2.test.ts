import Two from "../src/2";
describe('two', () => {
    test('one', () => {
        const two = new Two([
            ['A', 'Y'],
            ['B', 'X'],
            ['C', 'Z']
        ]
        );
        expect(two.one()).toBe(15);
    })
})