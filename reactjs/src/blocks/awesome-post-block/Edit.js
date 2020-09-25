//  Import CSS.
import './style.scss';

const { __ } = wp.i18n
const { apiFetch } = wp;
const { withSelect } = wp.data
const { withState } = wp.compose;
const { InspectorControls } = wp.editor
const { Component, Fragment } = wp.element;
const { dateI18n, format, __experimentalGetSettings } = wp.date;
const { PanelBody, Spinner, SelectControl, RangeControl, ColorPalette, TextControl } = wp.components;

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        const { posts } = this.props
        this.getFeaturedImages(posts)
        let postSelections = [];

        wp.apiFetch({ path: "/wp/v2/categories" }).then(posts => {
            postSelections.push({ label: "Select All Category", value: 'all' });
            $.each(posts, function (key, val) {
                postSelections.push({ label: val.name, value: val.id });
            });
            return postSelections;
        });
        this.setState({ categories: postSelections })
    }

    componentDidUpdate(prevProps, prevState) {
        const { posts } = this.props
        if (posts != prevProps.posts) {
            this.getFeaturedImages(posts)
        }
    }
    getFeaturedImages = (posts) => {
        if (posts) {
            posts.forEach(post => {
                post._links["wp:featuredmedia"] && apiFetch({
                    method: 'POST',
                    url: post._links["wp:featuredmedia"][0].href,
                    headers: { 'Content-Type': 'application/json' }
                }).then(response => {
                    this.setState({
                        ...this.state,
                        [post.id]: response.source_url
                    })
                }).catch(error => {
                    console.log('error : ', error)
                })
            })
        }
    }

    customFunction = () => {
        let postSelections = [];
        wp.apiFetch({ path: "/wp/v2/categories" }).then(posts => {
            postSelections.push({ label: "Select a Post", value: 0 });
            $.each(posts, function (key, val) {
                postSelections.push({ label: val.name, value: val.id });
            });
            return postSelections;
        });
        return postSelections
    }

    render() {
        const { posts } = this.props
        const { 
            attributes: { 
                columns, 
                numbers, 
                orderby, 
                fontSize,
                blogStyle,
                fontWeight, 
                lineheight, 
                colorpalette, 
                selectedCategory, 
                bgColorpalette, 
                padding,
            }, setAttributes 
        } = this.props

        // Style
        const StyleSelectControl = withState({
            blogStyle: blogStyle,
        })(({ blogStyle, setState }) => (
            <SelectControl
                label="Select Style"
                value={blogStyle}
                options={[
                    { label: 'Style One', value: 'style1' },
                    { label: 'Style Two', value: 'style2' },
                ]}
                onChange={(value) => { setAttributes({ blogStyle: value }) }}
            />
        ));

        // Number of column
        const ColumnSelectControl = withState({
            column: columns,
        })(({ column, setState }) => (
            <SelectControl
                label="Select Column"
                value={column}
                options={[
                    { label: 'One Column', value: '1' },
                    { label: 'Two Column', value: '2' },
                    { label: 'Three Column', value: '3' },
                    { label: 'Four Column', value: '4' },
                ]}
                onChange={(value) => { setAttributes({ columns: value }) }}
            />
        ));

        const PostOrder = withState({
            postorder: orderby,
        })(({ postorder, setState }) => (
            <SelectControl
                label="Post Order"
                value={postorder}
                options={[
                    { label: 'ASC', value: 'asc' },
                    { label: 'DESC', value: 'desc' },
                ]}
                onChange={(value) => { setAttributes({ orderby: value }) }}
            />
        ));

        // Number of post.
        const RangeControl = withState({
            numbers: numbers,
        })(({ numbers, setState }) => (
            <RangeControl
                label="Number Of Post"
                value={numbers}
                onChange={(value) => { setAttributes({ numbers: value }) }}
                min={1}
                max={40}
            />
        ));

        // Title Color Color 
        const ColorPalette = withState( {
            color: colorpalette,
        } )( ( { color, setState } ) => { 
            const colors = [ 
                { name: 'Gray', color: '#ccc' }, 
                { name: 'White', color: '#fff' }, 
                { name: 'Black', color: '#000' }, 
            ];
            return ( 
                <ColorPalette
                    label="Title Color" 
                    colors={ colors } 
                    value={ color }
                    onChange={(value) => { setAttributes({ colorpalette: value }) }}
                />
            ) 
        } );

        // Background Color 
        const BgColorPalette = withState( {
            bgcolor: bgColorpalette,
        } )( ( { bgcolor, setState } ) => { 
            const bgcolors = [ 
                { name: 'Gray', color: '#ccc' }, 
                { name: 'White', color: '#fff' }, 
                { name: 'Gray2', color: '#cdcdcd' }, 
            ];
            return ( 
                <ColorPalette 
                    label="Background Color"
                    colors={ bgcolors } 
                    value={ bgcolor }
                    onChange={(value) => { setAttributes({ bgColorpalette: value }) }}
                />
            ) 
        } );

        // Font size.
        const FontSizePicker = withState({
            fontSize: fontSize,
        })(({ fontSize, setState }) => (
            <RangeControl
                label="Font Size"
                value={fontSize}
                onChange={(value) => { setAttributes({ fontSize: value }) }}
                min={1}
                max={20}
            />
        ));
 
        // Font Width.
        const SelectFontWidthControl = withState({
            fontWeight: fontWeight,
        })(({ fontWeight, setState }) => (
            <SelectControl
                label="Line Height"
                value={fontWeight}
                options={[
                    { label: '100', value: '100' },
                    { label: '400', value: '400' },
                    { label: '500', value: '500' },
                    { label: '600', value: '600' },
                    { label: '700', value: '700' },
                    { label: '800', value: '800' },
                ]}
                onChange={(value) => { setAttributes({ fontWeight: value }) }}
            />
        ));

        // Line Height
        const LineheightControl = withState({
            lineheight: lineheight,
        })(({ lineheight, setState }) => (
            <RangeControl
                label="Line Height"
                value={lineheight}
                onChange={(value) => { setAttributes({ lineheight: value }) }}
                min={1}
                max={40}
            />
        ));

        // Content Padding 
        const TextContentControl = withState( {
            padding: padding,
        } )( ( { padding, setState } ) => ( 
            <TextControl
                label="Padding"
                value={ padding }
                onChange={(value) => { setAttributes({ padding: value }) }}
            />
        ) );

        let counts = 0;
        let output = '';

        return (
            <Fragment >
                <InspectorControls key="inspector">
                    <PanelBody title={__('Blog Post Style')} initialOpen={false}>
                        <StyleSelectControl />
                        <ColumnSelectControl />
                        <SelectControl
                            value={selectedCategory}
                            options={this.state.categories}
                            onChange={(value) => setAttributes({ selectedCategory: value })}
                        />
                        <PostOrder />
                        <RangeControl />
                    </PanelBody>
                    
                    <PanelBody title={__('CSS Style')} initialOpen={false}>
                        <FontSizePicker />
                        <SelectFontWidthControl />
                        <LineheightControl />
                        <ColorPalette />
                        <BgColorPalette />
                        <TextContentControl />
                    </PanelBody>
                </InspectorControls>

                {posts &&
                    <div className="postblock-wrapper">
                        <div className="row">
                            {posts.map(post => {
                                const style = {
                                    fontSize: fontSize,
                                    fontWeight: fontWeight,
                                    color: colorpalette,
                                }
                                const bgcolor = {
                                    background: bgColorpalette
                                }

                                const paddingStyle = {
                                    padding: padding
                                }
                                

                                if(blogStyle == 'style1') {
                                    return (
                                        <div className={`col-md-${columns} style1`}>
                                            <div className="post-content-wrapper" style={bgcolor}>
                                                {this.state[post.id] ? <img src={this.state[post.id]} alt="Featured Image" width="600" height="500" /> : <Spinner />}
                                                <div className="content" style={paddingStyle}>
                                                    { post.date_gmt &&
                                                    <time dateTime={ format( 'c', post.date_gmt ) } className="post-date">
                                                        { dateI18n( 'd M, Y', post.date_gmt ) }
                                                    </time> }
                                                    <h2 style={style}>{post.title.rendered}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                } else {
                                    output = (counts == 0) ? (
                                        <div className={`col-md-6 full-content style2-wrap`}>
                                            <div className="post-content-wrapper">
                                                {this.state[post.id] ? <img src={this.state[post.id]} alt="Image" width="50%" /> : <Spinner />}
                                                <h2 style={style}>{post.title.rendered}</h2>
                                                <p dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } }></p>
{
    
}
                                            </div>
                                        </div> 
                                    ) : (                   
                                        <div className={`col-md-6`}>
                                            <div className="post-content-wrapper right">
                                                {this.state[post.id] ? <img src={this.state[post.id]} alt="Image" width="50%" /> : <Spinner />}
                                                { post.date_gmt &&
                                                <time dateTime={ format( 'd M, Y', post.date_gmt ) } className="post-date">
                                                    { dateI18n( 'd M, Y', post.date_gmt ) }
                                                </time> }
                                                <h2 className="post-title">{post.title.rendered}</h2>
                                                { console.log('Jihad') }
                                            </div>
                                        </div> 
                                    ); 
                                    counts++;
                                    return output;
                                }    
                            }) } 
                        </div>
                    </div>
                }
                {!posts && <Spinner />}
            </Fragment>
        )
        
    }
}
export default withSelect((select, props) => {
    const { attributes: { numbers, orderby, selectedCategory } } = props
    const { getEntityRecords } = select('core')
    const output = (selectedCategory == 'all') ? 
    ({posts: getEntityRecords('postType', 'post', { per_page: numbers, order: orderby, status: 'publish', } )}) : 
    ({posts: getEntityRecords('postType', 'post', { per_page: numbers, order: orderby, categories: [selectedCategory], status: 'publish', })})
    return output; 
})

(Edit)