/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import {
    PanelBody,
    TextControl,
    ToggleControl,
    SelectControl,
    RangeControl,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { GOOGLE_FONTS, FONT_WEIGHTS, loadGoogleFont } from '../utils/google-fonts';
import { ColorControl } from '../utils/components';

/**
 * Default attribute values.
 *
 * @type {Object}
 */
const DEFAULTS = {
    videoUrl:              '',
    posterUrl:             '',
    title:                 'A Beachfront Luxury Vacation Rental Awaits',
    description:           'Nestled along the resplendent beaches of Santa Teresa sits Casa Teresa and Casa Teresa Grande, both Costa Rica beachfront villas offering the ultimate luxury vacation rental experience.',
    buttonText:            'Learn More',
    buttonUrl:             '#',
    titleColor:            '#ffffff',
    titleFontSize:         48,
    titleFontWeight:       '700',
    titleFontFamily:       '',
    descriptionColor:      '#ffffff',
    descriptionFontSize:   18,
    descriptionFontWeight: '400',
    descriptionFontFamily: '',
    buttonBgColor:         '#ffffff',
    buttonTextColor:       '#333333',
    buttonHoverBgColor:    '#f0f0f0',
    buttonHoverTextColor:  '#333333',
    buttonFontSize:        16,
    buttonFontWeight:      '600',
    buttonFontFamily:      '',
    overlayColor:          '#000000',
    overlayOpacity:        40,
    videoHeight:           600,
    contentAlign:          'center',
    padding:               80,
    borderRadius:          0,
    muted:                 true,
    autoplay:              true,
    loop:                  true,
};

/**
 * Edit component for the Zepblock Hero Video block.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute updater.
 * @return {JSX.Element}
 */
export default function Edit( { attributes, setAttributes } ) {
    const {
        videoUrl              = DEFAULTS.videoUrl,
        posterUrl             = DEFAULTS.posterUrl,
        title                 = DEFAULTS.title,
        description           = DEFAULTS.description,
        buttonText            = DEFAULTS.buttonText,
        buttonUrl             = DEFAULTS.buttonUrl,
        titleColor            = DEFAULTS.titleColor,
        titleFontSize         = DEFAULTS.titleFontSize,
        titleFontWeight       = DEFAULTS.titleFontWeight,
        titleFontFamily       = DEFAULTS.titleFontFamily,
        descriptionColor      = DEFAULTS.descriptionColor,
        descriptionFontSize   = DEFAULTS.descriptionFontSize,
        descriptionFontWeight = DEFAULTS.descriptionFontWeight,
        descriptionFontFamily = DEFAULTS.descriptionFontFamily,
        buttonBgColor         = DEFAULTS.buttonBgColor,
        buttonTextColor       = DEFAULTS.buttonTextColor,
        buttonHoverBgColor    = DEFAULTS.buttonHoverBgColor,
        buttonHoverTextColor  = DEFAULTS.buttonHoverTextColor,
        buttonFontSize        = DEFAULTS.buttonFontSize,
        buttonFontWeight      = DEFAULTS.buttonFontWeight,
        buttonFontFamily      = DEFAULTS.buttonFontFamily,
        overlayColor          = DEFAULTS.overlayColor,
        overlayOpacity        = DEFAULTS.overlayOpacity,
        videoHeight           = DEFAULTS.videoHeight,
        contentAlign          = DEFAULTS.contentAlign,
        padding               = DEFAULTS.padding,
        borderRadius          = DEFAULTS.borderRadius,
        muted                 = DEFAULTS.muted,
        autoplay              = DEFAULTS.autoplay,
        loop                  = DEFAULTS.loop,
    } = attributes;

    const blockProps = useBlockProps();

    // ── Side effects ─────────────────────────────────────────────────────────

    useEffect( () => {
        loadGoogleFont( titleFontFamily );
    }, [ titleFontFamily ] );

    useEffect( () => {
        loadGoogleFont( descriptionFontFamily );
    }, [ descriptionFontFamily ] );

    useEffect( () => {
        loadGoogleFont( buttonFontFamily );
    }, [ buttonFontFamily ] );

    // ── Helper functions ───────────────────────────────────────────────────────

    /**
     * Convert hex color and opacity to rgba
     */
    const getOverlayColor = () => {
        const opacityValue = overlayOpacity / 100;

        // If overlayColor is already hex, convert to rgba
        if ( overlayColor.startsWith( '#' ) ) {
            const hex = overlayColor.replace( '#', '' );
            const r = parseInt( hex.substr( 0, 2 ), 16 );
            const g = parseInt( hex.substr( 2, 2 ), 16 );
            const b = parseInt( hex.substr( 4, 2 ), 16 );
            return `rgba(${ r }, ${ g }, ${ b }, ${ opacityValue })`;
        }

        // If it's already rgb/rgba, just replace opacity
        return overlayColor.replace( /[\d.]+\)$/g, `${ opacityValue })` );
    };

    // ── Render ───────────────────────────────────────────────────────────────

    return (
        <>
            <InspectorControls>

                { /* ── Content Settings ── */ }
                <PanelBody title={ __( 'Content Settings', 'zepblocks'  ) }>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={ ( media ) => setAttributes( { videoUrl: media.url } ) }
                            allowedTypes={ [ 'video' ] }
                            value={ videoUrl }
                            render={ ( { open } ) => (
                                <div>
                                    { ! videoUrl && (
                                        <button
                                            onClick={ open }
                                            className="components-button is-secondary"
                                        >
                                            { __( 'Select Video', 'zepblocks'  ) }
                                        </button>
                                    ) }
                                    { videoUrl && (
                                        <div>
                                            <video
                                                src={ videoUrl }
                                                style={ { width: '100%', maxHeight: '200px' } }
                                                controls
                                            />
                                            <button
                                                onClick={ () => setAttributes( { videoUrl: '' } ) }
                                                className="components-button is-secondary"
                                                style={ { marginTop: '10px' } }
                                            >
                                                { __( 'Remove Video', 'zepblocks'  ) }
                                            </button>
                                        </div>
                                    ) }
                                </div>
                            ) }
                        />
                    </MediaUploadCheck>

                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={ ( media ) => setAttributes( { posterUrl: media.url } ) }
                            allowedTypes={ [ 'image' ] }
                            value={ posterUrl }
                            render={ ( { open } ) => (
                                <div style={ { marginTop: '15px' } }>
                                    <label>{ __( 'Poster Image', 'zepblocks'  ) }</label>
                                    { ! posterUrl && (
                                        <button
                                            onClick={ open }
                                            className="components-button is-secondary"
                                        >
                                            { __( 'Select Poster Image', 'zepblocks'  ) }
                                        </button>
                                    ) }
                                    { posterUrl && (
                                        <div>
                                            <img
                                                src={ posterUrl }
                                                alt={ __( 'Poster', 'zepblocks'  ) }
                                                style={ { width: '100%', maxHeight: '200px', objectFit: 'cover' } }
                                            />
                                            <button
                                                onClick={ () => setAttributes( { posterUrl: '' } ) }
                                                className="components-button is-secondary"
                                                style={ { marginTop: '10px' } }
                                            >
                                                { __( 'Remove Poster', 'zepblocks'  ) }
                                            </button>
                                        </div>
                                    ) }
                                </div>
                            ) }
                        />
                    </MediaUploadCheck>

                    <TextControl
                        label={ __( 'Title', 'zepblocks'  ) }
                        value={ title }
                        onChange={ ( value ) => setAttributes( { title: value } ) }
                        placeholder={ __( 'Enter hero title', 'zepblocks'  ) }
                    />

                    <TextControl
                        label={ __( 'Description', 'zepblocks'  ) }
                        value={ description }
                        onChange={ ( value ) => setAttributes( { description: value } ) }
                        placeholder={ __( 'Enter hero description', 'zepblocks'  ) }
                    />

                    <TextControl
                        label={ __( 'Button Text', 'zepblocks'  ) }
                        value={ buttonText }
                        onChange={ ( value ) => setAttributes( { buttonText: value } ) }
                        placeholder={ __( 'Enter button text', 'zepblocks'  ) }
                    />

                    <TextControl
                        label={ __( 'Button URL', 'zepblocks'  ) }
                        value={ buttonUrl }
                        onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
                        placeholder={ __( 'https://example.com', 'zepblocks'  ) }
                    />

                    <SelectControl
                        label={ __( 'Content Alignment', 'zepblocks'  ) }
                        value={ contentAlign }
                        options={ [
                            { label: __( 'Left', 'zepblocks'  ), value: 'left' },
                            { label: __( 'Center', 'zepblocks'  ), value: 'center' },
                            { label: __( 'Right', 'zepblocks'  ), value: 'right' },
                        ] }
                        onChange={ ( value ) => setAttributes( { contentAlign: value } ) }
                    />
                </PanelBody>

                { /* ── Video Settings ── */ }
                <PanelBody title={ __( 'Video Settings', 'zepblocks'  ) } initialOpen={ false }>
                    <RangeControl
                        label={ __( 'Video Height (px)', 'zepblocks'  ) }
                        value={ videoHeight }
                        onChange={ ( value ) => setAttributes( { videoHeight: value } ) }
                        min={ 200 }
                        max={ 1200 }
                        help={ __( 'Set the height of the video section', 'zepblocks'  ) }
                    />
                    <ToggleControl
                        label={ __( 'Muted', 'zepblocks'  ) }
                        checked={ muted }
                        onChange={ ( value ) => setAttributes( { muted: value } ) }
                    />
                    <ToggleControl
                        label={ __( 'Autoplay', 'zepblocks'  ) }
                        checked={ autoplay }
                        onChange={ ( value ) => setAttributes( { autoplay: value } ) }
                    />
                    <ToggleControl
                        label={ __( 'Loop', 'zepblocks'  ) }
                        checked={ loop }
                        onChange={ ( value ) => setAttributes( { loop: value } ) }
                    />
                </PanelBody>

                { /* ── Style Settings ── */ }
                <PanelBody title={ __( 'Style Settings', 'zepblocks'  ) } initialOpen={ false }>

                    { /* Title */ }
                    <h3>{ __( 'Title Style', 'zepblocks'  ) }</h3>
                    <ColorControl
                        label={ __( 'Title Color', 'zepblocks'  ) }
                        value={ titleColor }
                        onChange={ ( value ) => setAttributes( { titleColor: value } ) }
                        placeholder="#ffffff"
                    />
                    <RangeControl
                        label={ __( 'Title Font Size', 'zepblocks'  ) }
                        value={ titleFontSize }
                        onChange={ ( value ) => setAttributes( { titleFontSize: value } ) }
                        min={ 12 }
                        max={ 100 }
                    />
                    <SelectControl
                        label={ __( 'Title Font Weight', 'zepblocks'  ) }
                        value={ titleFontWeight }
                        options={ FONT_WEIGHTS }
                        onChange={ ( value ) => setAttributes( { titleFontWeight: value } ) }
                    />
                    <SelectControl
                        label={ __( 'Title Font Family', 'zepblocks'  ) }
                        value={ titleFontFamily }
                        options={ GOOGLE_FONTS }
                        onChange={ ( value ) => setAttributes( { titleFontFamily: value } ) }
                        help={ __( 'Select a Google Font for the title', 'zepblocks'  ) }
                    />

                    { /* Description */ }
                    <h3>{ __( 'Description Style', 'zepblocks'  ) }</h3>
                    <ColorControl
                        label={ __( 'Description Color', 'zepblocks'  ) }
                        value={ descriptionColor }
                        onChange={ ( value ) => setAttributes( { descriptionColor: value } ) }
                        placeholder="#ffffff"
                    />
                    <RangeControl
                        label={ __( 'Description Font Size', 'zepblocks'  ) }
                        value={ descriptionFontSize }
                        onChange={ ( value ) => setAttributes( { descriptionFontSize: value } ) }
                        min={ 12 }
                        max={ 40 }
                    />
                    <SelectControl
                        label={ __( 'Description Font Weight', 'zepblocks'  ) }
                        value={ descriptionFontWeight }
                        options={ FONT_WEIGHTS }
                        onChange={ ( value ) => setAttributes( { descriptionFontWeight: value } ) }
                    />
                    <SelectControl
                        label={ __( 'Description Font Family', 'zepblocks'  ) }
                        value={ descriptionFontFamily }
                        options={ GOOGLE_FONTS }
                        onChange={ ( value ) => setAttributes( { descriptionFontFamily: value } ) }
                        help={ __( 'Select a Google Font for the description', 'zepblocks'  ) }
                    />

                    { /* Button */ }
                    <h3>{ __( 'Button Style', 'zepblocks'  ) }</h3>
                    <ColorControl
                        label={ __( 'Button Background Color', 'zepblocks'  ) }
                        value={ buttonBgColor }
                        onChange={ ( value ) => setAttributes( { buttonBgColor: value } ) }
                        placeholder="#ffffff"
                    />
                    <ColorControl
                        label={ __( 'Button Text Color', 'zepblocks'  ) }
                        value={ buttonTextColor }
                        onChange={ ( value ) => setAttributes( { buttonTextColor: value } ) }
                        placeholder="#333333"
                    />
                    <ColorControl
                        label={ __( 'Button Hover Background Color', 'zepblocks'  ) }
                        value={ buttonHoverBgColor }
                        onChange={ ( value ) => setAttributes( { buttonHoverBgColor: value } ) }
                        placeholder="#f0f0f0"
                    />
                    <ColorControl
                        label={ __( 'Button Hover Text Color', 'zepblocks'  ) }
                        value={ buttonHoverTextColor }
                        onChange={ ( value ) => setAttributes( { buttonHoverTextColor: value } ) }
                        placeholder="#333333"
                    />
                    <RangeControl
                        label={ __( 'Button Font Size', 'zepblocks'  ) }
                        value={ buttonFontSize }
                        onChange={ ( value ) => setAttributes( { buttonFontSize: value } ) }
                        min={ 10 }
                        max={ 30 }
                    />
                    <SelectControl
                        label={ __( 'Button Font Weight', 'zepblocks'  ) }
                        value={ buttonFontWeight }
                        options={ FONT_WEIGHTS }
                        onChange={ ( value ) => setAttributes( { buttonFontWeight: value } ) }
                    />
                    <SelectControl
                        label={ __( 'Button Font Family', 'zepblocks'  ) }
                        value={ buttonFontFamily }
                        options={ GOOGLE_FONTS }
                        onChange={ ( value ) => setAttributes( { buttonFontFamily: value } ) }
                        help={ __( 'Select a Google Font for the button', 'zepblocks'  ) }
                    />

                    { /* Layout */ }
                    <h3>{ __( 'Layout', 'zepblocks'  ) }</h3>
                    <ColorControl
                        label={ __( 'Overlay Color', 'zepblocks'  ) }
                        value={ overlayColor }
                        onChange={ ( value ) => setAttributes( { overlayColor: value } ) }
                        placeholder="#000000"
                    />
                    <RangeControl
                        label={ __( 'Overlay Opacity', 'zepblocks'  ) }
                        value={ overlayOpacity }
                        onChange={ ( value ) => setAttributes( { overlayOpacity: value } ) }
                        min={ 0 }
                        max={ 100 }
                        help={ __( 'Set overlay opacity (0 = transparent, 100 = solid)', 'zepblocks'  ) }
                    />
                    <RangeControl
                        label={ __( 'Padding', 'zepblocks'  ) }
                        value={ padding }
                        onChange={ ( value ) => setAttributes( { padding: value } ) }
                        min={ 0 }
                        max={ 200 }
                    />
                    <RangeControl
                        label={ __( 'Border Radius', 'zepblocks'  ) }
                        value={ borderRadius }
                        onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
                        min={ 0 }
                        max={ 50 }
                    />
                </PanelBody>

            </InspectorControls>

            <div { ...blockProps }>
                <style>
                    {`
                        .wp-block-zepblock-hero-video .villa-hero-video .hero-video-button {
                            background-color: ${ buttonBgColor || '#ffffff' };
                            color: ${ buttonTextColor || '#333333' };
                            font-size: ${ buttonFontSize || 16 }px;
                            font-weight: ${ buttonFontWeight || '600' };
                            font-family: ${ buttonFontFamily || 'inherit' };
                        }
                        .wp-block-zepblock-hero-video .villa-hero-video .hero-video-button:hover {
                            background-color: ${ buttonHoverBgColor || '#f0f0f0' };
                            color: ${ buttonHoverTextColor || '#333333' };
                        }
                    `}
                </style>

                <div
                    className="villa-hero-video"
                    style={ {
                        borderRadius: `${ borderRadius }px`,
                        overflow: 'hidden',
                    } }
                >
                    <div className="hero-video">
                        { videoUrl && (
                            <>
                                <video
                                    className="video-bg"
                                    poster={ posterUrl }
                                    muted={ muted }
                                    autoPlay={ autoplay }
                                    loop={ loop }
                                    playsInline
                                    style={ { width: '100%', height: '100%', objectFit: 'cover' } }
                                >
                                    <source src={ videoUrl } type="video/mp4" />
                                </video>
                                <div
                                    className="video-overlay"
                                    style={ {
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: getOverlayColor(),
                                        zIndex: 1,
                                    } }
                                ></div>
                            </>
                        ) }
                        { ! videoUrl && (
                            <div
                                style={ {
                                    width: '100%',
                                    height: '400px',
                                    backgroundColor: '#f0f0f0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#666',
                                    fontSize: '16px',
                                } }
                            >
                                { __( 'Please select a video from the sidebar settings', 'zepblocks'  ) }
                            </div>
                        ) }
                    </div>

                    <div
                        className="content-info"
                        style={ {
                            textAlign: contentAlign,
                            padding: `${ padding }px`,
                            minHeight: `${ videoHeight }px`,
                        } }
                    >
                        <h2
                            style={ {
                                color: titleColor,
                                fontSize: `${ titleFontSize }px`,
                                fontWeight: titleFontWeight,
                                fontFamily: titleFontFamily || 'inherit',
                                margin: '0 0 20px',
                                lineHeight: '1.2',
                            } }
                        >
                            { title }
                        </h2>

                        <p
                            style={ {
                                color: descriptionColor,
                                fontSize: `${ descriptionFontSize }px`,
                                fontWeight: descriptionFontWeight,
                                fontFamily: descriptionFontFamily || 'inherit',
                                margin: '0 0 30px',
                                lineHeight: '1.6',
                            } }
                        >
                            { description }
                        </p>

                        { buttonText && (
                            <a
                                href={ buttonUrl }
                                className="hero-video-button"
                                style={ {
                                    display: 'inline-block',
                                    padding: '12px 30px',
                                    textDecoration: 'none',
                                    borderRadius: '4px',
                                    transition: 'all 0.3s ease',
                                } }
                            >
                                { buttonText }
                            </a>
                        ) }
                    </div>
                </div>
            </div>
        </>
    );
}
