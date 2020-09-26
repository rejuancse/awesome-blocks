const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { RichText, InspectorControls } = wp.editor
const { PanelBody, DateTimePicker, TextControl } = wp.components;


import Timer from './components';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            device: 'md',
            spacer: true
        }
    } 
    componentDidMount() {
        const { setAttributes, clientId, attributes: { uniqueId } } = this.props
        const _client = clientId.substr(0, 6)
        if (!uniqueId) {
            setAttributes({ uniqueId: _client });
        } else if (uniqueId && uniqueId != _client) {
            setAttributes({ uniqueId: _client });
        }
    }
     
    render() {
        const {
            setAttributes,
            attributes: {
                endDate,
               
            } 
        } = this.props

        const { device } = this.state
        
        return (
            <Fragment>
                <InspectorControls key="inspector">
                    <PanelBody title={__('Countdown Date Time')}>
                        <DateTimePicker
                            currentDate={endDate * 1000}
                            onChange={value => {
                                setAttributes({
                                    endDate: Math.floor(
                                        Date.parse(value) / 1000
                                    )
                                });
                            }}
                        />
                      </PanelBody> 
                </InspectorControls>


                
                <div className="awesome-blocks-countdown">
                    <Timer deadline={endDate} /> 
                </div>   
                     

            </Fragment>
        );
    }
}

export default Edit;