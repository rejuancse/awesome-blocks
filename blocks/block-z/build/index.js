(() => {
  'use strict';
  const e = window.wp.blocks,
    t = window.React,
    l = window.wp.i18n,
    i = window.wp.blockEditor,
    r = JSON.parse(
      '{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"title":"Block Z","name":"awesome-blocks/block-z","description":"Block Z","version":"1.0.0-beta","category":"awesome-blocks","icon":"slides","supports":{"html":true},"attributes":{"exampleAttribute":{"type":"string"}},"keywords":["basic","model"],"editorScript":"file:./build/index.js","editorStyle":"file:./src/style.css"}'
    );
  (0, e.registerBlockType)(r, {
    edit: function (e) {
      return (0, t.createElement)(
        'div',
        { ...(0, i.useBlockProps)() },
        (0, t.createElement)(
          'div',
          null,
          (0, t.createElement)('h4', null, 'Block Z'),
          (0, t.createElement)('p', null, 'Insert the attribute value below'),
          (0, t.createElement)('input', {
            type: 'text',
            value: e.attributes.exampleAttribute,
            onChange: function (t) {
              e.setAttributes({ exampleAttribute: t.target.value });
            },
            placeholder:
              'Attribute value that will be displayed in the frontend',
          })
        )
      );
    },
    save: function (e) {
      return (0, t.createElement)(
        'p',
        { ...i.useBlockProps.save() },
        (0, l.__)(
          (0, t.createElement)('div', null, e.attributes.exampleAttribute)
        )
      );
    },
  });
})();
