/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Button, PanelBody } = wp.components;
// const { MediaUpload, InspectorControls } = wp.editor;
// import { MediaUpload, InspectorControls } from '@wordpress/block-editor';


export default function save( {attributes} ) {
    //Destructuring the images array attribute
    const { images = [], columns, padding, gallery_style } = attributes;

    let counts = 0;
    let output = '';

    // Displays the images
    const displayImages = (images) => {
        return (
            images.map( (image,index) => {
                const paddingStyle = {
                    padding: padding
                }

                if(gallery_style == 'style1') {
                    return (
                        <div className={`col-${columns} gallery-item A`} style={paddingStyle}>
                            <a href={image.url} className="cloud-zoom">
                                <img
                                    className='gallery-item'
                                    key={images.id}
                                    src={image.url}
                                    data-slide-no={index}
                                    data-caption={image.caption[0]}
                                    alt={image.alt}
                                />
                            </a>
                        </div>
                    )
                }else {
                    output = (counts == 0) ? (
                        <div className={`col-md-6 full-content style2-wrap`} style={paddingStyle}>
                            <div className="gallery-item">
                            <a href={image.url} className="cloud-zoom">
                                <img className='gallery-item' src={image.url} key={ images.id } />
                            </a>
                            </div>
                        </div>
                    ) : (
                        <div className={`col-md-3 gallery-style2`} style={paddingStyle}>
                            <div className="gallery-item">
                            <a href={image.url} className="cloud-zoom">
                                <img className='gallery-item' src={image.url} key={ images.id } />
                            </a>
                            </div>
                        </div>
                    );

                    counts++;
                    return output;
                }
            })
        )
    }

    //JSX to return
    return (
        <div className="gallery-row"  data-total-slides={images.length}>{ displayImages(images) }</div>
    );
}
