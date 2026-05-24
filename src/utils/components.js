/**
 * WordPress Dependencies
 */
import { BaseControl } from '@wordpress/components';

/**
 * Inline color picker + hex text input pair.
 *
 * @param {Object}   props
 * @param {string}   props.label     Visible label.
 * @param {string}   props.value     Current hex color value.
 * @param {Function} props.onChange  Called with the new hex string.
 * @param {string}   props.placeholder Placeholder text for the text input.
 * @return {JSX.Element}
 */
export function ColorControl( { label, value, onChange, placeholder } ) {
	return (
		<BaseControl label={ label }>
			<div className="theme-blocks-color-input-wrapper">
				<input
					type="color"
					value={ value }
					onChange={ ( event ) => onChange( event.target.value ) }
					className="theme-blocks-color-input"
				/>
				<input
					type="text"
					value={ value }
					onChange={ ( event ) => onChange( event.target.value ) }
					className="theme-blocks-color-text-input"
					placeholder={ placeholder }
				/>
			</div>
		</BaseControl>
	);
}
