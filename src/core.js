
export default function createVirtualDOM(doc) {
    const allElements = Array.from(doc.querySelectorAll("*"));

    let byId = null;
    let byTag = null;
    let byAttr = null;
    let byAttrValue = null;

    function buildIndexes() {
        if (byId && byTag && byAttr && byAttrValue) return; // Already built

        byId = new Map();
        byTag = new Map();
        byAttr = new Map();
        byAttrValue = new Map();

        for (let el of allElements) {
            // ID
            const id = el.id;
            if (id) byId.set(id, el);

            // Tag
            const tag = el.tagName.toLowerCase();
            if (!byTag.has(tag)) byTag.set(tag, []);
            byTag.get(tag).push(el);

            // Attributes
            for (let attr of el.attributes) {
                const attrName = attr.name;
                const attrValue = attr.value;

                if (!byAttr.has(attrName)) byAttr.set(attrName, []);
                byAttr.get(attrName).push(el);

                if (!byAttrValue.has(attrName)) byAttrValue.set(attrName, new Map());
                const valueMap = byAttrValue.get(attrName);

                if (!valueMap.has(attrValue)) valueMap.set(attrValue, []);
                valueMap.get(attrValue).push(el);
            }
        }
    }

    return {
        getById: (id) => {
            buildIndexes();
            return byId.get(id) || null;
        },
        getByTag: (tag) => {
            buildIndexes();
            return byTag.get(tag.toLowerCase()) || [];
        },
        getByAttr: (attr) => {
            buildIndexes();
            return byAttr.get(attr) || [];
        },
        getByAttrValue: (attr, value) => {
            buildIndexes();
            const attrMap = byAttrValue.get(attr);
            return (attrMap && attrMap.get(value)) || [];
        },
        queryCustom: (fn) => allElements.filter(fn),
        all: allElements,
    };
}
