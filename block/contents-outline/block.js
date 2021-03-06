'use strict';

const { remove, union, indexOf, compact } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, CheckboxControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/contents-outline', {
	title: __( 'Contents outline', 'snow-monkey-blocks' ),
	description: __( 'Display the table of contents above the first heading.', 'snow-monkey-blocks' ),
	icon: {
		foreground: '#cd162c',
		src: 'editor-ol',
	},
	category: 'smb',
	supports: {
		customClassName: false,
	},

	edit( { attributes, setAttributes } ) {
		const { headings } = attributes;

		const _generateNewHeadings = ( isChecked, heading ) => {
			let newHeadings = headings.split( ',' );

			if ( isChecked ) {
				newHeadings.push( heading );
			} else {
				newHeadings = remove( newHeadings, ( value ) => heading !== value );
			}

			return compact( union( newHeadings ) ).join( ',' );
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Contents Outline Settings', 'snow-monkey-blocks' ) }>
						<CheckboxControl
							name="headings[]"
							value="h2"
							label={ __( 'Show h2', 'snow-monkey-blocks' ) }
							checked={ -1 !== indexOf( headings.split( ',' ), 'h2' ) }
							onChange={ ( isChecked ) => setAttributes( { headings: _generateNewHeadings( isChecked, 'h2' ) } ) }
						/>
						<CheckboxControl
							name="headings[]"
							value="h3"
							label={ __( 'Show h3', 'snow-monkey-blocks' ) }
							checked={ -1 !== indexOf( headings.split( ',' ), 'h3' ) }
							onChange={ ( isChecked ) => setAttributes( { headings: _generateNewHeadings( isChecked, 'h3' ) } ) }
						/>
						<CheckboxControl
							name="headings[]"
							value="h4"
							label={ __( 'Show h4', 'snow-monkey-blocks' ) }
							checked={ -1 !== indexOf( headings.split( ',' ), 'h4' ) }
							onChange={ ( isChecked ) => setAttributes( { headings: _generateNewHeadings( isChecked, 'h4' ) } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="wpco-wrapper" aria-hidden="false">
					<div className="wpco">
						<h2 className="wpco__title">{ __( 'Contents outline', 'snow-monkey-blocks' ) }</h2>
						<div className="contents-outline">
							<ol>
								<li>{ __( 'In the actual screen, it is displayed when headings exists on the page.', 'snow-monkey-blocks' ) }</li>
							</ol>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save() {
		return null;
	},
} );
