const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
import './style.scss'
import Edit from './Edit'

registerBlockType('awesome-blocks/awesomecountdown', {
	title: __('Countdown'),
    category: 'awesome-blocks',
    description: __('Awesome countdown block'),
    icon: 'clock',
	keywords: [__('Countdown'), __('Timer'), __('Awesome Countdown')],

	edit: Edit,
	save: () => null,
});
