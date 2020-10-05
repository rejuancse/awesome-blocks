import Edit from './Edit';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType('awesome-blocks/awesomepostblock', {
	title: __('Awesome Post Block'),
	icon: 'analytics',
    category: 'awesome-blocks',
    keywords: [__('Latest Post'), __('Post Block')],
	
    attributes: { 
		numbers: { type: 'number', default: 6 }, 
		fontSize: { type: 'number', default: 16 }, 
		columns: { type: 'string', default: '3' }, 
		lineheight: { type: 'number', default: 24 },
		orderby: { type: 'string', default: 'asc' },
		fontWeight: { type: 'number', default: 400 },
		blogStyle: { type: 'string', default: 'style1' }, 
		colorpalette: { type: 'string', default: '#333' }, 
		bgColorpalette: { type: 'string', default: '#fff' }, 
		selectedCategory: { type: 'string', default: 'all' },
		padding: {type: 'string', default: '20px 20px'}
	},
	edit: Edit,
	save ( props ) {
		return null // See PHP side. This block is rendered on PHP.
	},
	
});  