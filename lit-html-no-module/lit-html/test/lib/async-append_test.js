/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
/// <reference path="../../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../../node_modules/@types/chai/index.d.ts" />
import { asyncAppend } from '../../lib/async-append.js';
import { html, render } from '../../lit-html.js';
const assert = chai.assert;
Object.defineProperty(Symbol, 'asyncIterator', {
    value: Symbol()
});
suite('asyncAppend', () => {
    test.only('renders an async iterable', async () => {
        const container = document.createElement('div');
        let resolve;
        let tick = new Promise((res, _) => resolve = res);
        const push = async (v) => {
            const currentTick = tick;
            const r = resolve;
            tick = new Promise((res, _) => resolve = res);
            r(v);
            await currentTick;
        };
        function iterable() {
            return __asyncGenerator(this, arguments, function* iterable_1() {
                while (true) {
                    yield yield __await(tick);
                }
            });
        }
        render(html `<div>${asyncAppend(iterable())}</div>`, container);
        assert.equal(container.innerHTML, '<div></div>');
        await push('foo');
        assert.equal(container.innerHTML, '<div>foo</div>');
        await push('bar');
        assert.equal(container.innerHTML, '<div>foobar</div>');
    });
});
//# sourceMappingURL=async-append_test.js.map