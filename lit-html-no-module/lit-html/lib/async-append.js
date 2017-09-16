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
var __asyncValues = (this && this.__asyncIterator) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
import { directive, NodePart } from '../lit-html.js';
/**
 * Display `defaultContent` until `promise` resolves.
 */
export const asyncAppend = (value) => directive((part) => {
    if (value === part._previousValue) {
        return;
    }
    part.clear();
    part._previousValue = value;
    (async () => {
        // We keep track of item parts across iterations, so that we can share
        // marker nodes between adjacent parts.
        let itemPart;
        try {
            for (var value_1 = __asyncValues(value), value_1_1; value_1_1 = await value_1.next(), !value_1_1.done;) {
                const v = await value_1_1.value;
                console.log('A', v, part._previousValue);
                // Check to make sure that value is the still the current value of
                // the part, and if not bail because a new value owns this part
                if (part._previousValue !== value) {
                    console.log('break');
                    break;
                }
                console.log('B');
                let itemStart = part.startNode;
                if (itemPart !== undefined) {
                    itemStart = new Text();
                    // Set up the previous item's endNode to the new part's startNode
                    itemPart.endNode = itemStart;
                    part.endNode.parentNode.insertBefore(itemStart, part.endNode);
                }
                itemPart = new NodePart(part.instance, itemStart, part.endNode);
                itemPart.setValue(v);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (value_1_1 && !value_1_1.done && (_a = value_1.return)) await _a.call(value_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    })();
});
//# sourceMappingURL=async-append.js.map